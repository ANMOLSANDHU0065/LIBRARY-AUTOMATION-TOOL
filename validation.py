import re


def validate_required(value, field_name):
    """Validate that a required field is not empty."""

    if value is None or not str(value).strip():
        raise ValueError(f"{field_name} is required.")

    return str(value).strip()
# SANDHU

def validate_email(email):
    """Validate email format."""

    email = validate_required(email, "Email")

    pattern = r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"

    if not re.fullmatch(pattern, email):
        raise ValueError("Please enter a valid email address.")

    return email.lower()


def validate_phone(phone):
    """Validate Indian 10-digit phone number."""

    phone = validate_required(phone, "Phone")

    if not phone.isdigit():
        raise ValueError("Phone number must contain only digits.")

    if len(phone) != 10:
        raise ValueError("Phone number must contain exactly 10 digits.")

    if phone[0] not in "6789":
        raise ValueError("Phone number must start with 6, 7, 8 or 9.")

    return phone
# SANDHU

def validate_positive_integer(value, field_name):
    """Validate positive integer."""

    try:
        number = int(value)

        if number <= 0:
            raise ValueError

        return number

    except (ValueError, TypeError):
        raise ValueError(f"{field_name} must be a positive number.")


def validate_price(value):
    """Validate book price."""

    if value is None or str(value).strip() == "":
        raise ValueError("Book price is required.")

    try:
        amount = float(value)

        if amount < 0:
            raise ValueError

        return round(amount, 2)

    except (ValueError, TypeError):
        raise ValueError("Price must be a valid positive number.")


def price(value):
    """
    Backward-compatible price validator.

    This is kept because older books.py code
    may import 'price' directly.
    """

    return validate_price(value)


# SANDHU