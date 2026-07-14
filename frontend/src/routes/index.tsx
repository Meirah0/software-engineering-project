import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import {
  Activity,
  Bell,
  Brush,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  Dumbbell,
  Heart,
  LayoutDashboard,
  LoaderCircle,
  Search,
  Settings as SettingsIcon,
  Sparkles,
  Stethoscope,
  Thermometer,
  User,
  Wheat,
} from "lucide-react";
import horseStable from "@/assets/horse-stable.jpg";
import {
  ApiError,
  horseCareApi,
  type ActivityLevel,
} from "@/lib/api/horsecare";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HorseCare Manager Pro — Stable Intelligence Dashboard" },
      {
        name: "description",
        content:
          "Professional distributed dashboard for horse care, feeding, training, stable routines, and health awareness.",
      },
      { property: "og:title", content: "HorseCare Manager Pro" },
      {
        property: "og:description",
        content: "Premium stable management dashboard connected to a FastAPI backend.",
      },
    ],
  }),
  component: Dashboard,
});

type RecKey = "summary" | "feeding" | "training" | "health" | "stable";
type BackendStatus = "connecting" | "online" | "offline";

interface HorseInput {
  name: string;
  age: string;
  weight: string;
  activity: ActivityLevel;
  temperature: string;
  appetiteNormal: boolean;
  daysSinceCleaning: string;
}

interface ResultView {
  title: string;
  lead: string;
  rows: Array<{ label: string; value: string }>;
  warning?: boolean;
}

type NavKey = "dashboard" | "profile" | RecKey | "overview" | "settings";

const navItems: Array<{ key: NavKey; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "profile", label: "Horse Profile", icon: User },
  { key: "feeding", label: "Feeding Plan", icon: Wheat },
  { key: "training", label: "Training Plan", icon: Dumbbell },
  { key: "health", label: "Health Check", icon: Stethoscope },
  { key: "stable", label: "Stable Care", icon: Sparkles },
  { key: "overview", label: "Daily Overview", icon: CalendarDays },
  { key: "settings", label: "Settings", icon: SettingsIcon },
];

const initialResult: ResultView = {
  title: "Your care plan is ready",
  lead: "Choose a service to create personalized guidance for the current horse profile.",
  rows: [
    { label: "Selected Horse", value: "Luna" },
    { label: "Available Plans", value: "Profile, feeding, training, health, and stable care" },
  ],
};

function Dashboard() {
  const [horse, setHorse] = useState<HorseInput>({
    name: "Luna",
    age: "7",
    weight: "480",
    activity: "medium",
    temperature: "38.2",
    appetiteNormal: true,
    daysSinceCleaning: "2",
  });
  const [active, setActive] = useState<RecKey>("summary");
  const [activeNav, setActiveNav] = useState<NavKey>("dashboard");
  const [result, setResult] = useState<ResultView>(initialResult);
  const [backendStatus, setBackendStatus] = useState<BackendStatus>("connecting");
  const [loading, setLoading] = useState<RecKey | null>(null);
  const [notice, setNotice] = useState<{ kind: "success" | "error"; text: string } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const checkBackend = useCallback(async () => {
    setBackendStatus("connecting");
    try {
      await horseCareApi.health();
      setBackendStatus("online");
    } catch {
      setBackendStatus("offline");
    }
  }, []);

  useEffect(() => {
    void checkBackend();
    const interval = window.setInterval(() => void checkBackend(), 15000);
    return () => window.clearInterval(interval);
  }, [checkBackend]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 4500);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const set =
    (key: keyof HorseInput) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = event.target instanceof HTMLInputElement && event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
      setHorse((previous) => ({ ...previous, [key]: value }));
      setFieldErrors((previous) => ({ ...previous, [key]: "" }));
    };

  function validateClient(key: RecKey): boolean {
    const errors: Record<string, string> = {};
    const age = Number(horse.age);
    const weight = Number(horse.weight);
    const temperature = Number(horse.temperature);
    const days = Number(horse.daysSinceCleaning);

    if (key === "summary" && !horse.name.trim()) errors.name = "Enter the horse name.";
    if ((key === "summary" || key === "training") && (!Number.isInteger(age) || age < 1 || age > 35)) {
      errors.age = "Age must be a whole number from 1 to 35.";
    }
    if ((key === "summary" || key === "feeding") && (!Number.isFinite(weight) || weight <= 0 || weight > 1500)) {
      errors.weight = "Weight must be greater than 0 and no more than 1500 kg.";
    }
    if (key === "health" && (!Number.isFinite(temperature) || temperature < 30 || temperature > 45)) {
      errors.temperature = "Temperature must be between 30 and 45 °C.";
    }
    if (key === "stable" && (!Number.isInteger(days) || days < 0 || days > 365)) {
      errors.days_since_cleaning = "Enter a whole number from 0 to 365.";
    }

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setNotice({ kind: "error", text: "Please correct the highlighted fields." });
      return false;
    }
    return true;
  }

  function scrollToSection(id: string) {
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  async function handleNavigation(key: NavKey) {
    setActiveNav(key);

    if (key === "dashboard") {
      scrollToSection("dashboard-top");
      return;
    }
    if (key === "profile") {
      scrollToSection("horse-profile");
      return;
    }
    if (key === "overview") {
      scrollToSection("daily-overview");
      return;
    }
    if (key === "settings") {
      scrollToSection("settings-panel");
      return;
    }

    scrollToSection("horse-profile");
    await runAction(key);
    scrollToSection("recommendation-output");
  }

  async function runAction(key: RecKey) {
    setActive(key);
    setActiveNav(key === "summary" ? "profile" : key);
    if (!validateClient(key)) return;
    setLoading(key);
    setNotice(null);
    setFieldErrors({});

    try {
      if (key === "summary") {
        const response = await horseCareApi.createSummary({
          name: horse.name.trim(),
          age: Number(horse.age),
          weight: Number(horse.weight),
          activity_level: horse.activity,
        });
        setResult({
          title: "Horse Profile Summary",
          lead: response.summary,
          rows: [
            { label: "Horse", value: horse.name.trim() },
            { label: "Age", value: `${horse.age} years` },
            { label: "Weight", value: `${horse.weight} kg` },
            { label: "Activity", value: horse.activity },
          ],
        });
      } else if (key === "feeding") {
        const response = await horseCareApi.feedingRecommendation({
          weight: Number(horse.weight),
          activity_level: horse.activity,
        });
        setResult({
          title: "Feeding Plan",
          lead: response.recommendation,
          rows: [
            { label: "Profile Weight", value: `${horse.weight} kg` },
            { label: "Activity", value: horse.activity },
            { label: "Water", value: "Fresh water must remain available" },
            { label: "Review", value: "Adjust with a qualified equine professional" },
          ],
        });
      } else if (key === "training") {
        const response = await horseCareApi.trainingRecommendation({
          age: Number(horse.age),
          activity_level: horse.activity,
        });
        setResult({
          title: "Training Plan",
          lead: response.recommendation,
          rows: [
            { label: "Age", value: `${horse.age} years` },
            { label: "Activity", value: horse.activity },
            { label: "Warm-up", value: "Include a gradual warm-up" },
            { label: "Recovery", value: "Schedule rest and cool-down" },
          ],
        });
      } else if (key === "health") {
        const response = await horseCareApi.healthCheck({
          temperature: Number(horse.temperature),
          appetite_normal: horse.appetiteNormal,
        });
        setResult({
          title: response.status === "normal" ? "Health Check — Normal" : "Health Check — Attention Required",
          lead: response.message,
          warning: response.veterinary_warning,
          rows: [
            { label: "Temperature", value: `${horse.temperature} °C` },
            { label: "Appetite", value: horse.appetiteNormal ? "Normal" : "Reduced / abnormal" },
            { label: "Status", value: response.status },
            { label: "Vet Warning", value: response.veterinary_warning ? "Yes" : "No" },
          ],
        });
      } else {
        const response = await horseCareApi.stableReminder({
          days_since_cleaning: Number(horse.daysSinceCleaning),
        });
        setResult({
          title: "Stable Care Reminder",
          lead: response.message,
          warning: response.cleaning_due,
          rows: [
            { label: "Days Since Cleaning", value: horse.daysSinceCleaning },
            { label: "Cleaning Due", value: response.cleaning_due ? "Yes" : "No" },
            { label: "Bedding", value: response.cleaning_due ? "Refresh today" : "Current" },
            { label: "Water Buckets", value: "Scrub and refill regularly" },
          ],
        });
      }
      setBackendStatus("online");
      setNotice({ kind: "success", text: "Your personalized care result is ready." });
    } catch (error) {
      const apiError = error instanceof ApiError ? error : new ApiError("Unexpected frontend error.");
      setFieldErrors(apiError.fieldErrors);
      if (!apiError.status) setBackendStatus("offline");
      setNotice({ kind: "error", text: apiError.message });
    } finally {
      setLoading(null);
    }
  }

  return (
    <div id="dashboard-top" className="flex min-h-screen w-full bg-background text-foreground">
      <aside className="hidden lg:flex w-64 flex-col bg-sidebar text-sidebar-foreground">
        <div className="px-6 py-7 border-b border-sidebar-border/60">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}>
              <Heart className="h-5 w-5 text-sidebar-primary-foreground" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-[15px] font-semibold tracking-tight text-sidebar-foreground">HorseCare</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-sidebar-primary">Manager Pro</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-5 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => void handleNavigation(item.key)}
                aria-current={isActive ? "page" : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${isActive ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm border-l-2 border-sidebar-primary" : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"}`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="m-4 p-4 rounded-xl bg-sidebar-accent/50 border border-sidebar-border/40">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-sidebar-primary/90 flex items-center justify-center text-sidebar-primary-foreground text-sm font-semibold">SM</div>
            <div>
              <div className="text-sm font-medium text-sidebar-foreground">Stable Manager</div>
              <div className="text-[11px] text-sidebar-foreground/60">Greenfield Equestrian</div>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="px-6 lg:px-10 pt-8 pb-6 border-b border-border/60 bg-background/80 backdrop-blur">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl lg:text-[34px] font-semibold tracking-tight text-foreground">Stable Intelligence Dashboard</h1>
                <BackendBadge status={backendStatus} onRetry={() => void checkBackend()} />
              </div>
              <p className="mt-2 text-sm text-muted-foreground max-w-2xl">Professional dashboard for horse care recommendations, stable routines, training support, and health awareness.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input placeholder="Search horses, plans…" className="pl-9 pr-4 py-2 w-64 rounded-lg bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" />
              </div>
              <button className="relative h-10 w-10 rounded-lg bg-card border border-border flex items-center justify-center hover:bg-muted transition">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full" style={{ background: "var(--gold-deep)" }} />
              </button>
            </div>
          </div>

          <div id="daily-overview" className="scroll-mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-7">
            <SummaryCard icon={User} label="Horse Profile" value={horse.name || "Not set"} sub="Selected profile" />
            <SummaryCard icon={Activity} label="Activity Level" value={horse.activity} sub="Current training load" />
            <SummaryCard icon={Brush} label="Stable Status" value={Number(horse.daysSinceCleaning) >= 2 ? "Due" : "Current"} sub={`Last cleaned ${horse.daysSinceCleaning || "0"} day(s) ago`} />
            <SummaryCard icon={Thermometer} label="Health Mode" value={horse.appetiteNormal ? "Monitor" : "Review"} sub={`${horse.temperature || "—"} °C · appetite ${horse.appetiteNormal ? "normal" : "reduced"}`} />
          </div>
        </header>

        {notice && (
          <div className={`mx-6 lg:mx-10 mt-5 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm shadow-sm ${notice.kind === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-red-200 bg-red-50 text-red-900"}`}>
            {notice.kind === "success" ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <CircleAlert className="h-5 w-5 shrink-0" />}
            <span>{notice.text}</span>
          </div>
        )}

        <main className="flex-1 px-6 lg:px-10 py-8 grid grid-cols-1 xl:grid-cols-12 gap-6">
          <section id="horse-profile" className="scroll-mt-6 xl:col-span-5 rounded-2xl bg-card border border-border/70 p-6" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">Horse Care Input</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Update the profile and request a live backend result.</p>
              </div>
              <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ background: "color-mix(in oklab, var(--forest) 8%, transparent)" }}>
                <User className="h-4 w-4" style={{ color: "var(--forest)" }} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Horse Name" error={fieldErrors.name}>
                <input value={horse.name} onChange={set("name")} className={inputClass(fieldErrors.name)} />
              </Field>
              <Field label="Horse Age" error={fieldErrors.age}>
                <input type="number" min="1" max="35" value={horse.age} onChange={set("age")} className={inputClass(fieldErrors.age)} />
              </Field>
              <Field label="Weight (kg)" error={fieldErrors.weight}>
                <input type="number" min="1" max="1500" step="0.1" value={horse.weight} onChange={set("weight")} className={inputClass(fieldErrors.weight)} />
              </Field>
              <Field label="Activity Level" error={fieldErrors.activity_level}>
                <select value={horse.activity} onChange={set("activity")} className={inputClass(fieldErrors.activity_level)}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </Field>
              <Field label="Temperature (°C)" error={fieldErrors.temperature}>
                <input type="number" min="30" max="45" step="0.1" value={horse.temperature} onChange={set("temperature")} className={inputClass(fieldErrors.temperature)} />
              </Field>
              <Field label="Days Since Cleaning" error={fieldErrors.days_since_cleaning}>
                <input type="number" min="0" max="365" value={horse.daysSinceCleaning} onChange={set("daysSinceCleaning")} className={inputClass(fieldErrors.days_since_cleaning)} />
              </Field>
            </div>

            <label className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-border/70 bg-background/60 px-4 py-3">
              <div>
                <div className="text-sm font-medium">Appetite normal</div>
                <div className="text-xs text-muted-foreground">Used by the backend health service.</div>
              </div>
              <input type="checkbox" checked={horse.appetiteNormal} onChange={set("appetiteNormal")} className="h-5 w-5 accent-[var(--forest)]" />
            </label>

            <div className="mt-6 space-y-2.5">
              <ActionButton primary active={active === "summary"} loading={loading === "summary"} disabled={loading !== null} onClick={() => void runAction("summary")}>Create Summary</ActionButton>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <ActionButton active={active === "feeding"} loading={loading === "feeding"} disabled={loading !== null} onClick={() => void runAction("feeding")}>Feeding Plan</ActionButton>
                <ActionButton active={active === "training"} loading={loading === "training"} disabled={loading !== null} onClick={() => void runAction("training")}>Training Plan</ActionButton>
                <ActionButton active={active === "health"} loading={loading === "health"} disabled={loading !== null} onClick={() => void runAction("health")}>Health Check</ActionButton>
                <ActionButton active={active === "stable"} loading={loading === "stable"} disabled={loading !== null} onClick={() => void runAction("stable")}>Stable Care Reminder</ActionButton>
              </div>
            </div>
          </section>

          <section className="xl:col-span-7 space-y-6">
            <div className="rounded-2xl overflow-hidden bg-card border border-border/70" style={{ boxShadow: "var(--shadow-elegant)" }}>
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/70">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight">Stable View</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Live profile · Box 04 · West Wing</p>
                </div>
                <span className="text-[11px] uppercase tracking-widest font-medium px-2.5 py-1 rounded-md" style={{ background: "color-mix(in oklab, var(--forest) 8%, transparent)", color: "var(--forest)" }}>Live</span>
              </div>
              <div className="relative">
                <img src={horseStable} alt="Horse in a premium stable" width={1280} height={896} className="w-full h-[340px] object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 45%, oklch(0.18 0.04 155 / 0.75) 100%)" }} />
                <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-end justify-between gap-3 text-white">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.18em] opacity-80">Current Resident</div>
                    <div className="text-lg font-semibold tracking-tight mt-0.5">{horse.name || "Unnamed"} · {horse.age || "—"} years · {horse.weight || "—"} kg · {horse.activity} activity</div>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg text-[11px] font-medium backdrop-blur-md" style={{ background: "color-mix(in oklab, var(--gold) 70%, transparent)", color: "oklch(0.22 0.05 155)" }}>Connected care profile</div>
                </div>
              </div>
            </div>

            <div id="recommendation-output" className="scroll-mt-6 rounded-2xl bg-card border border-border/70 p-6" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight">Care Recommendation</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Personalized guidance for the selected horse profile.</p>
                </div>
                <span className="text-[11px] uppercase tracking-widest font-medium px-2.5 py-1 rounded-md" style={{ background: "var(--secondary)", color: "var(--forest)" }}>{loading ? "loading" : active}</span>
              </div>

              <div className={`rounded-xl p-5 border ${result.warning ? "border-amber-300 bg-amber-50" : ""}`} style={result.warning ? undefined : { background: "color-mix(in oklab, var(--forest) 4%, var(--card))", borderColor: "color-mix(in oklab, var(--forest) 12%, transparent)" }}>
                <div className="flex items-start gap-3">
                  {loading ? <LoaderCircle className="h-5 w-5 animate-spin" style={{ color: "var(--forest)" }} /> : result.warning ? <CircleAlert className="h-5 w-5 text-amber-700" /> : <CheckCircle2 className="h-5 w-5" style={{ color: "var(--forest)" }} />}
                  <div>
                    <h3 className="text-base font-semibold tracking-tight" style={{ color: "var(--forest-deep)" }}>{loading ? "Requesting backend guidance…" : result.title}</h3>
                    <p className="text-sm text-foreground/80 mt-2 leading-relaxed">{loading ? "Preparing personalized guidance…" : result.lead}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {result.rows.map((row) => (
                  <div key={row.label} className="flex items-start gap-3 p-3.5 rounded-lg border border-border/70 bg-background/60">
                    <div className="mt-1 h-2 w-2 rounded-full flex-shrink-0" style={{ background: "var(--gold-deep)" }} />
                    <div className="min-w-0">
                      <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">{row.label}</div>
                      <div className="text-sm text-foreground mt-0.5">{row.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </section>
        </main>

        <section id="settings-panel" className="scroll-mt-6 mx-6 lg:mx-10 mb-10 rounded-2xl bg-card border border-border/70 p-6" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Preferences</h2>
              <p className="mt-1 text-sm text-muted-foreground">Metric units are active for weight and temperature. Connection status refreshes automatically.</p>
            </div>
            <button
              type="button"
              onClick={() => void checkBackend()}
              className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition hover:bg-muted"
            >
              Refresh connection
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function BackendBadge({ status, onRetry }: { status: BackendStatus; onRetry: () => void }) {
  const styles = status === "online"
    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
    : status === "offline"
      ? "border-red-200 bg-red-50 text-red-800"
      : "border-amber-200 bg-amber-50 text-amber-800";
  return (
    <button onClick={onRetry} className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition hover:shadow-sm ${styles}`} title="Click to retry backend connection">
      {status === "connecting" ? <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> : <span className={`h-2 w-2 rounded-full ${status === "online" ? "bg-emerald-500" : "bg-red-500"}`} />}
      Backend {status}
    </button>
  );
}

const baseInputClass = "w-full px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30 transition";
function inputClass(error?: string) {
  return `${baseInputClass} ${error ? "border-red-400 focus:border-red-500" : "border-input focus:border-ring/50"}`;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-wider font-medium text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="mt-1 block text-[11px] text-red-600">{error}</span>}
    </label>
  );
}

function ActionButton({ children, onClick, primary, active, loading, disabled }: { children: React.ReactNode; onClick: () => void; primary?: boolean; active?: boolean; loading?: boolean; disabled?: boolean }) {
  const common = "flex w-full items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium tracking-tight transition-all disabled:cursor-not-allowed disabled:opacity-60";
  if (primary) {
    return (
      <button disabled={disabled} onClick={onClick} className={`${common} text-primary-foreground hover:opacity-95`} style={{ background: "var(--gradient-forest)", boxShadow: active ? "var(--shadow-gold)" : "var(--shadow-card)", border: "1px solid color-mix(in oklab, var(--gold) 40%, transparent)" }}>
        {loading && <LoaderCircle className="h-4 w-4 animate-spin" />}{children}
      </button>
    );
  }
  return (
    <button disabled={disabled} onClick={onClick} className={`${common} px-3 border`} style={active ? { background: "color-mix(in oklab, var(--forest) 10%, transparent)", color: "var(--forest-deep)", borderColor: "color-mix(in oklab, var(--gold) 55%, transparent)", boxShadow: "0 0 0 1px color-mix(in oklab, var(--gold) 35%, transparent) inset" } : { background: "var(--card)", color: "var(--forest)", borderColor: "var(--border)" }}>
      {loading && <LoaderCircle className="h-4 w-4 animate-spin" />}{children}
    </button>
  );
}

function SummaryCard({ icon: Icon, label, value, sub }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl bg-card border border-border/70 p-5" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-wider font-medium text-muted-foreground">{label}</span>
        <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: "color-mix(in oklab, var(--forest) 8%, transparent)" }}><Icon className="h-4 w-4" /></div>
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-tight capitalize" style={{ color: "var(--forest-deep)" }}>{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{sub}</div>
    </div>
  );
}
