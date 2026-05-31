"""
HorseCare Manager GUI

A simple Tkinter graphical interface for the HorseCare Manager project.
This GUI was created for the Assisted Coding / Vibe Coding task to show
that the console-based pet project was extended into a basic user interface.
"""

import tkinter as tk
from tkinter import messagebox

from horsecare_manager import (
    check_health_status,
    create_horse_summary,
    get_feeding_recommendation,
    get_stable_care_reminder,
    get_training_recommendation,
)


class HorseCareGUI:
    """Graphical user interface for HorseCare Manager."""

    def __init__(self, root):
        self.root = root
        self.root.title("HorseCare Manager")
        self.root.geometry("620x620")

        self.create_widgets()

    def create_widgets(self):
        """Create all GUI labels, inputs, buttons, and result area."""
        title_label = tk.Label(
            self.root,
            text="HorseCare Manager",
            font=("Arial", 20, "bold")
        )
        title_label.pack(pady=12)

        subtitle_label = tk.Label(
            self.root,
            text="Simple horse and stable care support tool",
            font=("Arial", 11)
        )
        subtitle_label.pack(pady=4)

        form_frame = tk.Frame(self.root)
        form_frame.pack(pady=15)

        self.name_entry = self.create_labeled_entry(form_frame, "Horse Name:", 0)
        self.age_entry = self.create_labeled_entry(form_frame, "Horse Age:", 1)
        self.weight_entry = self.create_labeled_entry(form_frame, "Weight in kg:", 2)
        self.activity_entry = self.create_labeled_entry(
            form_frame,
            "Activity Level (low / medium / high):",
            3
        )
        self.temperature_entry = self.create_labeled_entry(
            form_frame,
            "Temperature:",
            4
        )
        self.cleaning_entry = self.create_labeled_entry(
            form_frame,
            "Days Since Stable Cleaning:",
            5
        )

        button_frame = tk.Frame(self.root)
        button_frame.pack(pady=10)

        tk.Button(
            button_frame,
            text="Create Horse Summary",
            width=25,
            command=self.show_horse_summary
        ).grid(row=0, column=0, padx=5, pady=5)

        tk.Button(
            button_frame,
            text="Feeding Recommendation",
            width=25,
            command=self.show_feeding_recommendation
        ).grid(row=0, column=1, padx=5, pady=5)

        tk.Button(
            button_frame,
            text="Training Recommendation",
            width=25,
            command=self.show_training_recommendation
        ).grid(row=1, column=0, padx=5, pady=5)

        tk.Button(
            button_frame,
            text="Health Check",
            width=25,
            command=self.show_health_status
        ).grid(row=1, column=1, padx=5, pady=5)

        tk.Button(
            button_frame,
            text="Stable Care Reminder",
            width=25,
            command=self.show_stable_care_reminder
        ).grid(row=2, column=0, columnspan=2, padx=5, pady=5)

        result_label = tk.Label(
            self.root,
            text="Result:",
            font=("Arial", 12, "bold")
        )
        result_label.pack(pady=8)

        self.result_text = tk.Text(self.root, height=8, width=70, wrap="word")
        self.result_text.pack(pady=5)

    def create_labeled_entry(self, parent, label_text, row):
        """Create a label and entry field in the form."""
        label = tk.Label(parent, text=label_text, anchor="w", width=30)
        label.grid(row=row, column=0, padx=8, pady=5, sticky="w")

        entry = tk.Entry(parent, width=32)
        entry.grid(row=row, column=1, padx=8, pady=5)

        return entry

    def display_result(self, message):
        """Display result text in the result box."""
        self.result_text.delete("1.0", tk.END)
        self.result_text.insert(tk.END, message)

    def show_horse_summary(self):
        """Show horse profile summary."""
        try:
            name = self.name_entry.get()
            age = int(self.age_entry.get())
            weight = float(self.weight_entry.get())
            activity = self.activity_entry.get()

            result = create_horse_summary(name, age, weight, activity)
            self.display_result(result)

        except (ValueError, TypeError) as error:
            messagebox.showerror("Input Error", str(error))

    def show_feeding_recommendation(self):
        """Show feeding recommendation."""
        try:
            weight = float(self.weight_entry.get())
            activity = self.activity_entry.get()

            result = get_feeding_recommendation(weight, activity)
            self.display_result(result)

        except (ValueError, TypeError) as error:
            messagebox.showerror("Input Error", str(error))

    def show_training_recommendation(self):
        """Show training recommendation."""
        try:
            age = int(self.age_entry.get())
            activity = self.activity_entry.get()

            result = get_training_recommendation(age, activity)
            self.display_result(result)

        except (ValueError, TypeError) as error:
            messagebox.showerror("Input Error", str(error))

    def show_health_status(self):
        """Show basic health status."""
        try:
            temperature = float(self.temperature_entry.get())

            result = check_health_status(
                temperature=temperature,
                appetite_normal=True
            )
            self.display_result(result)

        except (ValueError, TypeError) as error:
            messagebox.showerror("Input Error", str(error))

    def show_stable_care_reminder(self):
        """Show stable cleaning reminder."""
        try:
            days_since_cleaning = int(self.cleaning_entry.get())

            result = get_stable_care_reminder(days_since_cleaning)
            self.display_result(result)

        except (ValueError, TypeError) as error:
            messagebox.showerror("Input Error", str(error))


if __name__ == "__main__":
    app_root = tk.Tk()
    app = HorseCareGUI(app_root)
    app_root.mainloop()
