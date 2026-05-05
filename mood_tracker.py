moods = []

def add_mood():
    mood = input("Enter your mood: ")
    moods.append(mood)
    print("Mood added!")

def view_moods():
    for mood in moods:
        print(mood)

while True:
    print("1. Add Mood")
    print("2. View Moods")
    print("3. Exit")

    choice = input("Choose: ")

    if choice == "1":
        add_mood()
    elif choice == "2":
        view_moods()
    elif choice == "3":
        break
