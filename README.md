# 📚 LIBRARY DESK — Library Automation Tool

A responsive web-based Library Automation Tool built using Python and Flask.

The project helps manage books, library members, and book transactions through a simple and user-friendly dashboard.

---

## 🚀 Live Demo
[Visit Library Desk – Live Demo](https://library-desk.onrender.com)



## 🎯 Project Overview

LIBRARY DESK is a practical Python development project created as part of a virtual internship.

The application provides a centralized system for managing:

- 📚 Books
- 👥 Members
- 🔄 Book Transactions
- 📖 Issue and Return Operations
- 🔎 Book Search
- 🔐 Member Login and Registration
- 🌙 Light and Dark Mode

The project focuses on Python modules, input validation, data processing, error handling, and testing.

---

## ✨ Key Features

### 📚 Book Management

- Add new books
- Search books
- View available books
- View issued books
- Delete books
- Store book information using JSON

### 👥 Member Management

- Register library members
- Store member details
- Validate email addresses
- Validate phone numbers
- Prevent duplicate member information

### 🔄 Transaction Management

- Issue books to members
- Return books
- Generate transaction records
- Track issue and return dates
- Track transaction status

### 🔐 Authentication

- Member login
- Member registration
- Logout functionality
- Session-based authentication
- Simple email-based login flow

### 🎨 User Interface

- Responsive dashboard
- Navigation sidebar
- Header and footer
- Light/Dark mode
- Search functionality
- Interactive buttons
- Hover effects
- Smooth transitions
- Responsive design for different screen sizes

---

## 🛠️ Technologies Used

### Backend
- Python
- Flask

### Frontend
- HTML5
- CSS3
- JavaScript

### Data Storage
- JSON

### Testing
- Pytest

---

## 📂 Project Structure

```text
LIBRARY-AUTOMATION-TOOL/
│
├── data/
│   ├── books.json
│   ├── members.json
│   ├── transactions.json
│   └── users.json
│
├── static/
│   ├── css/
│   │   ├── style.css
│   │   └── auth.css
│   │
│   └── js/
│       ├── app.js
│       └── auth.js
│
├── templates/
│   ├── index.html
│   ├── login.html
│   └── register.html
│
├── tests/
│   └── test_library.py
│
├── books.py
├── members.py
├── library.py
├── validation.py
├── data.py
├── main.py
├── requirements.txt
└── README.md
