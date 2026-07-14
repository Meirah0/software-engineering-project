export type ActivityLevel = "low" | "medium" | "high";

export interface HorseSummaryPayload {
  name: string;
  age: number;
  weight: number;
  activity_level: ActivityLevel;
}

export interface FeedingPayload {
  weight: number;
  activity_level: ActivityLevel;
}

export interface TrainingPayload {
  age: number;
  activity_level: ActivityLevel;
}

export interface HealthPayload {
  temperature: number;
  appetite_normal: boolean;
}

export interface StablePayload {
  days_since_cleaning: number;
}

export interface HealthResponse {
  status: "normal" | "warning";
  message: string;
  veterinary_warning: boolean;
  warnings: string[];
}

export interface StableResponse {
  cleaning_due: boolean;
  message: string;
}

const DEFAULT_API_BASE_URL = "http://127.0.0.1:8000";
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/$/, "");
const REQUEST_TIMEOUT_MS = 7000;

export class ApiError extends Error {
  status?: number;
  fieldErrors: Record<string, string>;

  constructor(message: string, status?: number, fieldErrors: Record<string, string> = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

function validationDetails(detail: unknown): Record<string, string> {
  if (!Array.isArray(detail)) return {};
  const errors: Record<string, string> = {};
  for (const item of detail) {
    if (typeof item !== "object" || item === null) continue;
    const record = item as { loc?: unknown[]; msg?: string };
    const field = Array.isArray(record.loc) ? String(record.loc.at(-1) ?? "request") : "request";
    errors[field] = record.msg ?? "Invalid value";
  }
  return errors;
}

async function request<T>(path: string, options: RequestInit = {}, timeoutMs = REQUEST_TIMEOUT_MS): Promise<T> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...options.headers,
      },
      signal: controller.signal,
    });

    let data: unknown;
    try {
      data = await response.json();
    } catch {
      throw new ApiError("The backend returned an unexpected non-JSON response.", response.status);
    }

    if (!response.ok) {
      const payload = data as { detail?: unknown };
      const fieldErrors = validationDetails(payload.detail);
      const message =
        typeof payload.detail === "string"
          ? payload.detail
          : Object.values(fieldErrors)[0] ?? `Request failed with status ${response.status}.`;
      throw new ApiError(message, response.status, fieldErrors);
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError("The backend did not respond in time. Check that FastAPI is running.");
    }
    throw new ApiError(
      "Cannot connect to the HorseCare backend. Start the FastAPI server and try again.",
    );
  } finally {
    window.clearTimeout(timeout);
  }
}

export const horseCareApi = {
  health: () => request<{ status: string; service: string }>("/health", { method: "GET" }, 3500),
  validateAge: (age: number) =>
    request<{ valid: boolean; age: number; message: string }>("/horses/validate-age", {
      method: "POST",
      body: JSON.stringify({ age }),
    }),
  createSummary: (payload: HorseSummaryPayload) =>
    request<{ summary: string }>("/horses/summary", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  feedingRecommendation: (payload: FeedingPayload) =>
    request<{ recommendation: string }>("/recommendations/feeding", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  trainingRecommendation: (payload: TrainingPayload) =>
    request<{ recommendation: string }>("/recommendations/training", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  healthCheck: (payload: HealthPayload) =>
    request<HealthResponse>("/health/check", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  stableReminder: (payload: StablePayload) =>
    request<StableResponse>("/stable/reminder", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
