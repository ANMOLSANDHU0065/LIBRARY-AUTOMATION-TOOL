from data import load_data, save_data
from validation import validate_required, validate_price

# SANDHU
BOOKS_FILE = "books.json"


def get_books():
    """Return all books."""

    return load_data(BOOKS_FILE)


def add_book(title, author, category, isbn, book_price=0):
    """Add a new book to the library."""

    title = validate_required(title, "Book title")
    author = validate_required(author, "Author")
    category = validate_required(category, "Category")
    isbn = validate_required(isbn, "ISBN")
    book_price = validate_price(book_price)

    books = get_books()

    # Check duplicate ISBN
    for book in books:

        if str(book.get("isbn", "")).lower() == isbn.lower():
            raise ValueError("A book with this ISBN already exists.")

    # Generate new ID
    book_id = max(
        [book.get("id", 0) for book in books],
        default=0
    ) + 1
# SANDHU
    new_book = {
        "id": book_id,
        "title": title,
        "author": author,
        "category": category,
        "isbn": isbn,
        "price": book_price,
        "status": "Available"
    }

    books.append(new_book)

    if not save_data(BOOKS_FILE, books):
        raise ValueError("Unable to save book data.")

    return new_book


def search_books(query):
    """Search books by title, author, category or ISBN."""

    books = get_books()

    query = str(query or "").lower().strip()

    if not query:
        return books

    results = []

    for book in books:

        title = str(book.get("title", "")).lower()
        author = str(book.get("author", "")).lower()
        category = str(book.get("category", "")).lower()
        isbn = str(book.get("isbn", "")).lower()

        if (
            query in title
            or query in author
            or query in category
            or query in isbn
        ):
            results.append(book)

    return results

# SANDHU
def get_book_by_id(book_id):
    """Find a book by ID."""

    try:
        book_id = int(book_id)
    except (ValueError, TypeError):
        raise ValueError("Invalid book ID.")

    books = get_books()

    return next(
        (
            book
            for book in books
            if book.get("id") == book_id
        ),
        None
    )
# SANDHU

def delete_book(book_id):
    """Delete a book by ID."""

    try:
        book_id = int(book_id)
    except (ValueError, TypeError):
        raise ValueError("Invalid book ID.")

    books = get_books()

    updated_books = [
        book
        for book in books
        if book.get("id") != book_id
    ]

    if len(updated_books) == len(books):
        raise ValueError("Book not found.")

    if not save_data(BOOKS_FILE, updated_books):
        raise ValueError("Unable to save book data.")

    return True


def update_book_status(book_id, status):
    """Update book availability status."""

    allowed_statuses = [
        "Available",
        "Issued",
        "Reserved"
    ]
# SANDHU
    if status not in allowed_statuses:
        raise ValueError("Invalid book status.")

    book = get_book_by_id(book_id)

    if not book:
        raise ValueError("Book not found.")

    books = get_books()

    for item in books:

        if item.get("id") == int(book_id):
            item["status"] = status
            break

    if not save_data(BOOKS_FILE, books):
        raise ValueError("Unable to update book.")

    return True


# SANDHU