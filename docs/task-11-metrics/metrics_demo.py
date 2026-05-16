def login(username, password):
    if username == "admin":
        if password == "1234":
            print("Login successful")
        else:
            print("Wrong password")
    else:
        print("User not found")


def calculate_score(mood):
    if mood > 8:
        return "Very Happy"
    elif mood > 5:
        return "Happy"
    elif mood > 3:
        return "Neutral"
    else:
        return "Sad"


def send_reminder(user):
    print(f"Reminder sent to {user}")


login("admin", "1234")
print(calculate_score(7))
send_reminder("Meirah")
