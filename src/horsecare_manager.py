"""
HorseCare Manager

A small console-based pet project for the Software Engineering final submission.
The program supports basic stable and horse-care decisions, such as feeding,
training, health checks, and stable-care reminders.
"""

MIN_HORSE_AGE = 1
MAX_HORSE_AGE = 35
FEVER_TEMPERATURE = 38.5


def validate_horse_age(age):
    """Validate horse age and return it as an integer."""
    if not isinstance(age, int):
        raise TypeError("Horse age must be a number.")

    if age < MIN_HORSE_AGE or age > MAX_HORSE_AGE:
        raise ValueError("Horse age must be between 1 and 35 years.")

    return age


def validate_weight(weight):
    """Validate horse weight and return it."""
    if not isinstance(weight, (int, float)):
        raise TypeError("Horse weight must be a number.")

    if weight <= 0:
        raise ValueError("Horse weight must be greater than zero.")

    return weight


def get_feeding_recommendation(weight, activity_level):
    """Return a basic feeding recommendation based on weight and activity."""
    validate_weight(weight)
    activity = activity_level.strip().lower()

    if activity == "low":
        return "Light feeding plan: hay, water, and small concentrate portion."

    if activity == "medium":
        return "Balanced feeding plan: hay, water, minerals, and moderate concentrate."

    if activity == "high":
        return "Performance feeding plan: hay, water, minerals, and higher energy feed."

    return "Unknown activity level. Please choose low, medium, or high."


def get_training_recommendation(age, activity_level):
    """Return a training recommendation based on horse age and activity."""
    validate_horse_age(age)
    activity = activity_level.strip().lower()

    if age <= 3:
        return "Young horse: focus on light groundwork and short sessions."

    if age >= 22:
        return "Senior horse: focus on gentle movement and recovery."

    if activity == "high":
        return "Adult active horse: structured training with warm-up and cool-down."

    if activity == "medium":
        return "Adult horse: balanced riding or groundwork schedule."

    return "Adult horse: light movement and basic stable routine."


def check_health_status(temperature, appetite_normal):
    """Return a simple health status message."""
    if not isinstance(temperature, (int, float)):
        raise TypeError("Temperature must be a number.")

    if temperature >= FEVER_TEMPERATURE:
        return "Health warning: temperature is high. Contact a veterinarian."

    if not appetite_normal:
        return "Health warning: appetite is not normal. Monitor the horse closely."

    return "Health status looks normal based on the provided information."


def get_stable_care_reminder(days_since_cleaning):
    """Return a stable cleaning reminder."""
    if not isinstance(days_since_cleaning, int):
        raise TypeError("Days since cleaning must be a number.")

    if days_since_cleaning < 0:
        raise ValueError("Days since cleaning cannot be negative.")

    if days_since_cleaning >= 2:
        return "Stable care reminder: clean the stable today."

    return "Stable care status: cleaning is still up to date."


def create_horse_summary(name, age, weight, activity_level):
    """Create a short horse profile summary."""
    if name is None or name.strip() == "":
        raise ValueError("Horse name cannot be empty.")

    validate_horse_age(age)
    validate_weight(weight)

    return (
        f"Horse profile: {name.strip().title()}, {age} years old, "
        f"{weight} kg, activity level: {activity_level.strip().lower()}."
    )


def run_console_app():
    """Run the console version of HorseCare Manager."""
    print("Welcome to HorseCare Manager")
    print("1. Create horse profile summary")
    print("2. Get feeding recommendation")
    print("3. Get training recommendation")
    print("4. Check health status")
    print("5. Get stable care reminder")

    choice = input("Choose an option from 1 to 5: ").strip()

    try:
        if choice == "1":
            name = input("Horse name: ")
            age = int(input("Horse age: "))
            weight = float(input("Horse weight in kg: "))
            activity = input("Activity level: low, medium, or high: ")
            print(create_horse_summary(name, age, weight, activity))

        elif choice == "2":
            weight = float(input("Horse weight in kg: "))
            activity = input("Activity level: low, medium, or high: ")
            print(get_feeding_recommendation(weight, activity))

        elif choice == "3":
            age = int(input("Horse age: "))
            activity = input("Activity level: low, medium, or high: ")
            print(get_training_recommendation(age, activity))

        elif choice == "4":
            temperature = float(input("Horse temperature: "))
            appetite = input("Is appetite normal? yes/no: ").strip().lower() == "yes"
            print(check_health_status(temperature, appetite))

        elif choice == "5":
            days = int(input("Days since last stable cleaning: "))
            print(get_stable_care_reminder(days))

        else:
            print("Invalid option. Please choose a number from 1 to 5.")

    except (ValueError, TypeError) as error:
        print(f"Error: {error}")


if __name__ == "__main__":
    run_console_app()
