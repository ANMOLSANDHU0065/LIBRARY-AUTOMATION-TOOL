from data import load_data, save_data

from validation import (
    validate_required,
    validate_email,
    validate_phone
)

from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)


MEMBERS_FILE = "members.json"


def get_members():
    return load_data(MEMBERS_FILE)


def add_member(name, email, phone, password=None):

    name = validate_required(name, "Member name")

    email = validate_email(email)

    phone = validate_phone(phone)

    members = get_members()


    for member in members:

        if member["email"].lower() == email.lower():

            raise ValueError(
                "A member with this email already exists."
            )


        if member["phone"] == phone:

            raise ValueError(
                "A member with this phone number already exists."
            )


    member_id = max(
        [member["id"] for member in members],
        default=0
    ) + 1


    new_member = {

        "id": member_id,

        "name": name,

        "email": email,

        "phone": phone

    }


    if password:

        new_member["password"] = generate_password_hash(
            password
        )


    members.append(new_member)

    save_data(
        MEMBERS_FILE,
        members
    )


    return new_member


def authenticate_member(email, password):

    members = get_members()

    email = email.strip().lower()


    member = next(
        (
            member
            for member in members
            if member.get("email", "").lower() == email
        ),
        None
    )

# SANDHU
    if not member:

        return None


    stored_password = member.get("password")


    if not stored_password:

        return None


    if check_password_hash(
        stored_password,
        password
    ):

        return member


    return None

# SANDHU