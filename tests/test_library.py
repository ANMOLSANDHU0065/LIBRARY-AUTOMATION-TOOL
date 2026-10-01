import pytest

from validation import (
    validate_required,
    validate_email,
    validate_phone,
    validate_positive_integer
)

# SANDHU
# =========================================
# VALIDATION TESTS
# =========================================

def test_validate_required():
    assert validate_required("Python", "Book title") == "Python"


def test_validate_required_empty():
    with pytest.raises(ValueError):
        validate_required("", "Book title")


def test_validate_email():
    assert validate_email("test@example.com") == "test@example.com"


def test_validate_invalid_email():
    with pytest.raises(ValueError):
        validate_email("invalid-email")


def test_validate_phone():
    assert validate_phone("9876543210") == "9876543210"


def test_validate_invalid_phone():
    with pytest.raises(ValueError):
        validate_phone("12345")
# SANDHU

def test_validate_positive_integer():
    assert validate_positive_integer("10", "Quantity") == 10


def test_validate_invalid_integer():
    with pytest.raises(ValueError):
        validate_positive_integer("0", "Quantity")


# =========================================
# BOOK TESTS
# =========================================

def test_add_book():
    from books import add_book

    book = add_book(
        "Test Python Book",
        "Test Author",
        "Programming",
        "TEST-ISBN-001"
    )

    assert book["title"] == "Test Python Book"
    assert book["author"] == "Test Author"
    assert book["status"] == "Available"

# SANDHU
# =========================================
# MEMBER TESTS
# =========================================

def test_add_member():
    from members import add_member

    member = add_member(
        "Test Member",
        "testmember001@example.com",
        "9876543001"
    )

    assert member["name"] == "Test Member"
    assert member["email"] == "testmember001@example.com"
    assert member["phone"] == "9876543001"


    # SANDHU