from flask import Flask, render_template, request, jsonify, redirect, url_for, session
from werkzeug.security import generate_password_hash, check_password_hash
import secrets
# SANDHU
from books import (
    get_books,
    add_book,
    search_books,
    delete_book
)

from members import (
    get_members,
    add_member,
    authenticate_member
)

from library import (
    issue_book,
    return_book,
    get_transactions
)

# SANDHU
app = Flask(__name__)
app.secret_key = "LIBRARY DESK-sandhu-secret-key-2026"

app.config["LOGIN_SESSION_TOKEN"] = secrets.token_hex(32)
# =========================================
# PAGE ROUTES
# =========================================

@app.route("/")
def home():
# SANDHU
    if (
        "member_id" not in session
        or session.get("login_token") != app.config["LOGIN_SESSION_TOKEN"]
    ):
        session.clear()
        return redirect(url_for("login_page"))

    return render_template("index.html")


@app.route("/login")
def login_page():

    if (
        "member_id" in session
        and session.get("login_token") == app.config["LOGIN_SESSION_TOKEN"]
    ):
        return redirect(url_for("home"))

    return render_template("login.html")


@app.route("/register")
def register_page():

    if (
        "member_id" in session
        and session.get("login_token") == app.config["LOGIN_SESSION_TOKEN"]
    ):
        return redirect(url_for("home"))

    return render_template("register.html")


@app.route("/logout")
def logout():

    session.clear()

    return redirect(url_for("login_page"))
# =========================================
# LOGIN API
# =========================================

@app.route("/api/login", methods=["POST"])
def login_api():

    try:

        data = request.get_json() or {}

        email = data.get("email", "").strip()
        password = data.get("password", "")

        # Email required
        if not email:

            return jsonify({
                "success": False,
                "message": "Please enter your email address."
            }), 400

        # Simple email validation
        if "@" not in email or "." not in email:

            return jsonify({
                "success": False,
                "message": "Please enter a valid email address."
            }), 400

        # Password required
        if not password:

            return jsonify({
                "success": False,
                "message": "Please enter your password."
            }), 400
# SANDHU
        # ---------------------------------
        # SIMPLE LOGIN
        # Any valid email can login
        # ---------------------------------

        session["member_id"] = email.lower()
        session["member_name"] = email.split("@")[0].title()
        session["member_email"] = email.lower()
        session["login_token"] = app.config["LOGIN_SESSION_TOKEN"]


        

        return jsonify({

            "success": True,

            "message": "Login successful.",

            "member": {
                "id": email.lower(),
                "name": email.split("@")[0].title(),
                "email": email.lower()
            }

        })

    except Exception as error:

        print("LOGIN ERROR:", error)

        return jsonify({

            "success": False,

            "message": "Unable to login. Please try again."

        }), 500

# SANDHU
# =========================================
# REGISTER API
# =========================================

@app.route("/api/register", methods=["POST"])
def register_api():

    try:

        data = request.get_json() or {}

        name = data.get("name", "").strip()
        email = data.get("email", "").strip()
        password = data.get("password", "")
        confirm_password = data.get(
            "confirm_password",
            ""
        )
# SANDHU
        # Name validation
        if not name:

            return jsonify({

                "success": False,

                "message": "Please enter your name."

            }), 400

        # Email validation
        if not email:

            return jsonify({

                "success": False,

                "message": "Please enter your email."

            }), 400

        if "@" not in email or "." not in email:

            return jsonify({

                "success": False,

                "message": "Please enter a valid email address."

            }), 400

        # Password validation
        if not password:

            return jsonify({

                "success": False,

                "message": "Please enter a password."

            }), 400

        # Confirm password
        if password != confirm_password:

            return jsonify({

                "success": False,

                "message": "Passwords do not match."

            }), 400
# SANDHU
        # ---------------------------------
        # SIMPLE REGISTER
        # No database complication
        # ---------------------------------

        session["member_id"] = email.lower()
        session["member_name"] = name
        session["member_email"] = email.lower()

        return jsonify({

            "success": True,

            "message": "Account created successfully.",

            "member": {

                "id": email.lower(),

                "name": name,

                "email": email.lower()

            }

        }), 201

    except Exception as error:

        print("REGISTER ERROR:", error)

        return jsonify({

            "success": False,

            "message":
                "Unable to create account. Please try again."

        }), 500
    
# SANDHU


        # -------------------------
        # CREATE SESSION
        # -------------------------

        session.clear()

        session["member_id"] = (
            member["id"]
        )

        session["member_name"] = (
            member["name"]
        )

        session["member_email"] = (
            member["email"]
        )

# SANDHU
    
        # -------------------------
        # SUCCESS RESPONSE
        # -------------------------

        return jsonify({

            "success": True,

            "message":
                "Login successful.",

            "redirect":
                url_for("home"),

            "member": {

                "id":
                    member["id"],

                "name":
                    member["name"],

                "email":
                    member["email"]

            }

        }), 200

# SANDHU
    except Exception as error:

        print(
            "LOGIN ERROR:",
            error
        )

        return jsonify({

            "success": False,

            "message":
                "Something went wrong during login."

        }), 500


# =========================================
# CURRENT USER API
# =========================================

@app.route(
    "/api/me",
    methods=["GET"]
)
def current_member():

    if "member_id" not in session:

        return jsonify({

            "success": False,

            "message":
                "User is not logged in."

        }), 401


    return jsonify({

        "success": True,

        "member": {
# SANDHU
            "id":
                session.get(
                    "member_id"
                ),

            "name":
                session.get(
                    "member_name"
                ),

            "email":
                session.get(
                    "member_email"
                )

        }

    }), 200


# =========================================
# API LOGOUT
# =========================================

@app.route(
    "/api/logout",
    methods=["POST"]
)
def logout_api():

    session.clear()

    return jsonify({

        "success": True,

        "message":
            "Logged out successfully.",

        "redirect":
            url_for("login_page")

    }), 200


# =========================================
# DASHBOARD
# =========================================

@app.route("/api/dashboard")
def dashboard():

    books = get_books()

    members = get_members()

    transactions = get_transactions()


    total_books = len(books)


    available_books = len(
        [
            book
            for book in books
            if book["status"] == "Available"
        ]
    )

# SANDHU
    issued_books = len(
        [
            book
            for book in books
            if book["status"] == "Issued"
        ]
    )


    total_members = len(members)


    return jsonify({

        "total_books": total_books,

        "available_books":
            available_books,

        "issued_books":
            issued_books,

        "total_members":
            total_members

    })


# =========================================
# BOOKS
# =========================================

@app.route(
    "/api/books",
    methods=["GET"]
)
def books():

    query = request.args.get(
        "search",
        ""
    ).strip()


    if query:

        return jsonify(
            search_books(query)
        )


    return jsonify(
        get_books()
    )

# SANDHU
@app.route(
    "/api/books",
    methods=["POST"]
)
def create_book():

    try:

        data = request.get_json() or {}

        book = add_book(
    data.get("title"),
    data.get("author"),
    data.get("category"),
    data.get("isbn"),
    data.get("price", 0)
)



        return jsonify({

            "success": True,

            "message":
                "Book added successfully.",

            "book": book

        }), 201


    except ValueError as error:

        return jsonify({

            "success": False,

            "message": str(error)

        }), 400

# SANDHU
    except Exception:

        return jsonify({

            "success": False,

            "message":
                "Something went wrong."

        }), 500


@app.route(
    "/api/books/<int:book_id>",
    methods=["DELETE"]
)
def remove_book(book_id):

    try:

        delete_book(book_id)


        return jsonify({

            "success": True,

            "message":
                "Book deleted successfully."

        })


    except ValueError as error:

        return jsonify({

            "success": False,

            "message": str(error)

        }), 400


# =========================================
# MEMBERS
# =========================================

@app.route(
    "/api/members",
    methods=["GET"]
)
def members():

    members_data = get_members()


    # Never send password hashes to frontend.

    safe_members = [

        {

            "id": member["id"],

            "name": member["name"],

            "email": member["email"],

            "phone": member["phone"]

        }

        for member in members_data

    ]

# SANDHU
    return jsonify(
        safe_members
    )


@app.route(
    "/api/members",
    methods=["POST"]
)
def create_member():

    try:

        data = request.get_json() or {}


        member = add_member(

            data.get("name"),

            data.get("email"),

            data.get("phone")

        )


        return jsonify({

            "success": True,

            "message":
                "Member added successfully.",

            "member": member

        }), 201


    except ValueError as error:

        return jsonify({

            "success": False,

            "message": str(error)

        }), 400


    except Exception:

        return jsonify({

            "success": False,

            "message":
                "Something went wrong."

        }), 500
# SANDHU

# =========================================
# TRANSACTIONS
# =========================================

@app.route("/api/transactions")
def transactions():

    return jsonify(
        get_transactions()
    )


@app.route(
    "/api/issue",
    methods=["POST"]
)
def issue():

    try:

        data = request.get_json() or {}


        transaction = issue_book(

            data.get("book_id"),

            data.get("member_id")

        )


        return jsonify({

            "success": True,

            "message":
                "Book issued successfully.",

            "transaction":
                transaction

        })


    except ValueError as error:

        return jsonify({

            "success": False,

            "message": str(error)

        }), 400


@app.route(
    "/api/return",
    methods=["POST"]
)
def return_book_api():

    try:

        data = request.get_json() or {}


        transaction = return_book(

            data.get("book_id")

        )
# SANDHU

        return jsonify({

            "success": True,

            "message":
                "Book returned successfully.",

            "transaction":
                transaction

        })


    except ValueError as error:

        return jsonify({

            "success": False,

            "message": str(error)

        }), 400


# =========================================
# RUN
# =========================================

if __name__ == "__main__":

    app.run(

        debug=True,

        host="127.0.0.1",

        port=5000

    )


    # SANDHU