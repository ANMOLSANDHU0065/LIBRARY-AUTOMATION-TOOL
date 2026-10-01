/* =========================================
   LIBRARY DESK APP
========================================= */
// SANDHU
"use strict";


/* =========================================
   GLOBAL STATE
========================================= */

let books = [];
let members = [];
let transactions = [];

let toastTimer = null;


/* =========================================
   DEMO BOOK DATA
========================================= */

const demoBooks = [

    {
        title: "Python Crash Course",
        author: "Eric Matthes",
        category: "Programming",
        isbn: "9781593279288"
    },
// SANDHU
    {
        title: "Clean Code",
        author: "Robert C. Martin",
        category: "Software Development",
        isbn: "9780132350884"
    },

    {
        title: "The Pragmatic Programmer",
        author: "David Thomas",
        category: "Programming",
        isbn: "9780135957059"
    },

    {
        title: "Artificial Intelligence",
        author: "Stuart Russell",
        category: "Artificial Intelligence",
        isbn: "9780136042594"
    },
// SANDHU
    {
        title: "Hands-On Machine Learning",
        author: "Aurélien Géron",
        category: "Data Science",
        isbn: "9781098125974"
    },

    {
        title: "Learning SQL",
        author: "Alan Beaulieu",
        category: "Database",
        isbn: "9781492057611"
    },

    {
        title: "HTML and CSS",
        author: "Jon Duckett",
        category: "Web Development",
        isbn: "9781118008188"
    },

    {
        title: "JavaScript and JQuery",
        author: "Jon Duckett",
        category: "Web Development",
        isbn: "9781118531648"
    },
// SANDHU
    {
        title: "Computer Networks",
        author: "Andrew Tanenbaum",
        category: "Networking",
        isbn: "9780132126953"
    },

    {
        title: "Cloud Computing",
        author: "Rajkumar Buyya",
        category: "Cloud Computing",
        isbn: "9780470887998"
    },

    {
        title: "Cyber Security Essentials",
        author: "William Stallings",
        category: "Cyber Security",
        isbn: "9780134085043"
    },

    {
        title: "Data Science from Scratch",
        author: "Joel Grus",
        category: "Data Science",
        isbn: "9781492041139"
    },

    {
        title: "Deep Learning",
        author: "Ian Goodfellow",
        category: "Artificial Intelligence",
        isbn: "9780262035613"
    },
// SANDHU
    {
        title: "Design Patterns",
        author: "Erich Gamma",
        category: "Software Development",
        isbn: "9780201633610"
    },

    {
        title: "Database System Concepts",
        author: "Abraham Silberschatz",
        category: "Database",
        isbn: "9780078022159"
    },

    {
        title: "Operating System Concepts",
        author: "Abraham Silberschatz",
        category: "Programming",
        isbn: "9781119456339"
    },

    {
        title: "The Web Developer Bootcamp",
        author: "Colt Steele",
        category: "Web Development",
        isbn: "9781718501689"
    },
// SANDHU
    {
        title: "Python for Data Analysis",
        author: "Wes McKinney",
        category: "Data Science",
        isbn: "9781098104030"
    },

    {
        title: "Learning Git",
        author: "Anna Skoulikari",
        category: "Programming",
        isbn: "9781098133917"
    },

    {
        title: "Modern Software Engineering",
        author: "David Farley",
        category: "Software Development",
        isbn: "9780137314911"
    }

];


/* =========================================
   DEMO MEMBERS
========================================= */

const demoMembers = [

    {
        name: "Anmol Sandhu",
        email: "anmol@example.com",
        phone: "9876543210"
    },
// SANDHU
    {
        name: "Rahul Sharma",
        email: "rahul@example.com",
        phone: "9876543211"
    },

    {
        name: "Priya Verma",
        email: "priya@example.com",
        phone: "9876543212"
    },

    {
        name: "Arjun Singh",
        email: "arjun@example.com",
        phone: "9876543213"
    },

    {
        name: "Simran Kaur",
        email: "simran@example.com",
        phone: "9876543214"
    },

    {
        name: "Neha Gupta",
        email: "neha@example.com",
        phone: "9876543215"
    }

];

// SANDHU
/* =========================================
   DOM READY
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    init
);


async function init() {

    setupNavigation();

    setupModals();

    setupForms();

    setupTheme();

    setupSearch();

    setupMobileMenu();

    setupLogout();

    await loadApplication();

}

// SANDHU
/* =========================================
   APPLICATION LOADING
========================================= */

async function loadApplication() {

    try {

        await loadAllData();

        /*
         * If database is completely empty,
         * automatically create demo books and members.
         */

        if (books.length === 0) {

            await seedBooks();

        }


        if (members.length === 0) {

            await seedMembers();

        }

// SANDHU
        await loadAllData();

        renderEverything();

    }

    catch (error) {

        console.error(error);

        showToast(
            "Error",
            "Could not load library data.",
            "error"
        );

    }

}
// SANDHU

/* =========================================
   LOAD DATA
========================================= */

async function loadAllData() {

    const [
        booksResponse,
        membersResponse,
        transactionsResponse
    ] = await Promise.all([

        fetch("/api/books"),

        fetch("/api/members"),

        fetch("/api/transactions")

    ]);

// SANDHU
    if (!booksResponse.ok) {

        throw new Error("Books API failed.");

    }


    books = await booksResponse.json();

    members = await membersResponse.json();

    transactions = await transactionsResponse.json();

}

// SANDHU
/* =========================================
   SEED BOOKS
========================================= */

async function seedBooks() {

    for (const book of demoBooks) {

        try {

            await fetch("/api/books", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(book)

            });

        }

        catch (error) {

            console.error(
                "Book seed failed:",
                book.title,
                error
            );

        }

    }

}
// SANDHU

/* =========================================
   SEED MEMBERS
========================================= */

async function seedMembers() {

    for (const member of demoMembers) {

        try {

            await fetch("/api/members", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(member)

            });

        }
// SANDHU
        catch (error) {

            console.error(
                "Member seed failed:",
                member.name,
                error
            );

        }

    }

}


/* =========================================
   NAVIGATION
========================================= */

function setupNavigation() {

    document
        .querySelectorAll(".nav-item")
        .forEach(button => {
// SANDHU
            button.addEventListener(
                "click",
                () => {

                    const section =
                        button.dataset.section;

                    showSection(section);

                    closeMobileSidebar();

                }

            );

        });


    document
        .querySelectorAll("[data-section-target]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    showSection(
                        button.dataset.sectionTarget
                    );

                }

            );

        });

}
// SANDHU

function showSection(sectionName) {

    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.toggle(
                "active",
                item.dataset.section === sectionName
            );

        });
// SANDHU

    document
        .querySelectorAll(".page-section")
        .forEach(section => {

            section.classList.remove("active");

        });
// SANDHU
    const target =
        document.getElementById(
            `${sectionName}Section`
        );


    if (target) {

        target.classList.add("active");

    }


    const titles = {

        dashboard: "Dashboard",

        books: "Books Library",

        members: "Library Members",

        transactions: "Transactions"

    };

// SANDHU
    document.getElementById(
        "pageTitle"
    ).textContent =
        titles[sectionName] || "Dashboard";

}


/* =========================================
   RENDER EVERYTHING
========================================= */

function renderEverything() {

    renderStats();

    renderBooks();

    renderMembers();

    renderTransactions();

    renderRecentTransactions();

    populateIssueBooks();

    populateMembers();

    populateReturnBooks();

}
// SANDHU

/* =========================================
   DASHBOARD STATS
========================================= */

function renderStats() {

    const total =
        books.length;

    const available =
        books.filter(
            book => book.status === "Available"
        ).length;

    const issued =
        books.filter(
            book => book.status === "Issued"
        ).length;


    document.getElementById(
        "totalBooks"
    ).textContent = total;
// SANDHU

    document.getElementById(
        "availableBooks"
    ).textContent = available;


    document.getElementById(
        "issuedBooks"
    ).textContent = issued;


    document.getElementById(
        "totalMembers"
    ).textContent = members.length;


    document.getElementById(
        "transactionCount"
    ).textContent =
        transactions.length;
// SANDHU

    document.getElementById(
        "activeTransactions"
    ).textContent =
        transactions.filter(
            transaction =>
                transaction.status === "Issued"
        ).length;


    document.getElementById(
        "returnedTransactions"
    ).textContent =
        transactions.filter(
            transaction =>
                transaction.status === "Returned"
        ).length;

}

// SANDHU
/* =========================================
   BOOKS
========================================= */

function renderBooks(list = books) {

    const tbody =
        document.getElementById(
            "booksTable"
        );


    if (!list.length) {

        tbody.innerHTML = `

            <tr>

                <td colspan="8"
                    class="empty-cell">

                    No books found.

                </td>

            </tr>

        `;

        return;

    }


    tbody.innerHTML =
        list.map(book => `

            <tr>

                <td>
                    #${book.id}
                </td>

                <td>
                    <span class="book-name">
                        ${escapeHTML(book.title)}
                    </span>
                </td>

                <td>
                    <span class="book-author">
                        ${escapeHTML(book.author)}
                    </span>
                </td>

                <td>
                    ${escapeHTML(book.category)}
                </td>

                <td>
                    ${escapeHTML(book.isbn)}
                </td>

                <td>
                    ₹${book.price || "499"}
                </td>

                <td>

                    <span class="badge
                        ${book.status === "Issued"
                            ? "issued"
                            : "available"}">

                        ${escapeHTML(book.status)}

                    </span>

                </td>

                <td>
// SANDHU
                    <div class="action-buttons">

                        ${
                            book.status === "Available"

                            ?

                            `<button
                                class="icon-button"
                                title="Issue Book"
                                onclick="openIssueForBook(${book.id})">

                                ↗

                             </button>`

                            :

                            `<button
                                class="icon-button"
                                title="Return Book"
                                onclick="openReturnForBook(${book.id})">

                                ↙

                             </button>`
                        }
// SANDHU

                        <button
                            class="icon-button"
                            title="Delete Book"
                            onclick="deleteBook(${book.id})">

                            ×

                        </button>

                    </div>

                </td>

            </tr>

        `).join("");

}

// SANDHU
/* =========================================
   SEARCH + FILTER
========================================= */

function setupSearch() {

    const search =
        document.getElementById(
            "bookSearch"
        );

    const filter =
        document.getElementById(
            "bookFilter"
        );


    function updateBookList() {

        const query =
            search.value
                .toLowerCase()
                .trim();

        const selected =
            filter.value;


        const filtered =
            books.filter(book => {

                const matchesSearch =

                    book.title
                        .toLowerCase()
                        .includes(query)

                    ||
// SANDHU
                    book.author
                        .toLowerCase()
                        .includes(query)

                    ||

                    book.category
                        .toLowerCase()
                        .includes(query)

                    ||

                    book.isbn
                        .toLowerCase()
                        .includes(query);


                const matchesFilter =

                    selected === "all"

                    ||

                    book.status === selected;


                return (
                    matchesSearch &&
                    matchesFilter
                );

            });


        renderBooks(filtered);

    }
// SANDHU

    search.addEventListener(
        "input",
        updateBookList
    );


    filter.addEventListener(
        "change",
        updateBookList
    );

}


/* =========================================
   MEMBERS
========================================= */

function renderMembers() {

    const grid =
        document.getElementById(
            "membersGrid"
        );


    if (!members.length) {

        grid.innerHTML = `
            <p>No members registered.</p>
        `;

        return;

    }

// SANDHU
    grid.innerHTML =
        members.map(member => {

            const initials =
                getInitials(
                    member.name
                );


            const memberTransactions =
                transactions.filter(
                    transaction =>
                        transaction.member_id ===
                        member.id
                );

// SANDHU
            return `

                <article class="member-card">

                    <div class="member-head">

                        <div class="member-avatar">
                            ${initials}
                        </div>

                        <div>

                            <h4>
                                ${escapeHTML(member.name)}
                            </h4>

                            <p>
                                Member #${member.id}
                            </p>

                        </div>

                    </div>


                    <div class="member-details">

                        <span>
                            ✉ ${escapeHTML(member.email)}
                        </span>

                        <span>
                            ☎ ${escapeHTML(member.phone)}
                        </span>

                        <span>
                            Transactions:
                            ${memberTransactions.length}
                        </span>

                    </div>

                </article>

            `;

        }).join("");

}


/* =========================================
   TRANSACTIONS
========================================= */

function renderTransactions() {

    const tbody =
        document.getElementById(
            "transactionsTable"
        );


    if (!transactions.length) {

        tbody.innerHTML = `

            <tr>

                <td colspan="7"
                    class="empty-cell">

                    No transactions yet.

                </td>

            </tr>

        `;

        return;

    }
// SANDHU

    tbody.innerHTML =
        transactions
            .slice()
            .reverse()
            .map(transaction => {

                const reference =
                    generateReference(
                        transaction.id
                    );
// SANDHU

                return `

                    <tr>

                        <td>
                            TXN-${String(
                                transaction.id
                            ).padStart(4, "0")}
                        </td>

                        <td>
                            ${reference}
                        </td>

                        <td>
                            <strong>
                                ${escapeHTML(
                                    transaction.book_title
                                )}
                            </strong>
                        </td>

                        <td>
                            ${escapeHTML(
                                transaction.member_name
                            )}
                        </td>

                        <td>
                            ${formatDate(
                                transaction.issue_date
                            )}
                        </td>

                        <td>
                            ${
                                transaction.return_date
                                ?
                                formatDate(
                                    transaction.return_date
                                )
                                :
                                "—"
                            }
                        </td>
// SANDHU
                        <td>

                            <span class="badge
                                ${
                                    transaction.status ===
                                    "Returned"
                                    ?
                                    "returned"
                                    :
                                    "issued"
                                }">

                                ${escapeHTML(
                                    transaction.status
                                )}

                            </span>

                        </td>

                    </tr>

                `;

            }).join("");

}

// SANDHU
/* =========================================
   RECENT TRANSACTIONS
========================================= */

function renderRecentTransactions() {

    const tbody =
        document.getElementById(
            "recentTransactions"
        );


    const recent =
        transactions
            .slice()
            .reverse()
            .slice(0, 5);

// SANDHU
    if (!recent.length) {

        tbody.innerHTML = `

            <tr>

                <td colspan="5"
                    class="empty-cell">

                    No recent activity.

                </td>

            </tr>

        `;

        return;

    }
// SANDHU

    tbody.innerHTML =
        recent.map(transaction => `

            <tr>

                <td>
                    TXN-${String(
                        transaction.id
                    ).padStart(4, "0")}
                </td>

                <td>
                    ${escapeHTML(
                        transaction.book_title
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        transaction.member_name
                    )}
                </td>

                <td>
                    ${formatDate(
                        transaction.issue_date
                    )}
                </td>

                <td>

                    <span class="badge
                        ${
                            transaction.status ===
                            "Returned"
                            ?
                            "returned"
                            :
                            "issued"
                        }">

                        ${escapeHTML(
                            transaction.status
                        )}

                    </span>

                </td>

            </tr>

        `).join("");

}

// SANDHU
/* =========================================
   MODALS
========================================= */

function setupModals() {

    document
        .querySelectorAll("[data-open]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    openModal(
                        button.dataset.open
                    );

                }

            );

        });

// SANDHU
    document
        .querySelectorAll("[data-close]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    closeModal(
                        button.dataset.close
                    );

                }

            );

        });

// SANDHU
    document
        .querySelectorAll(".modal-overlay")
        .forEach(overlay => {

            overlay.addEventListener(
                "click",
                event => {

                    if (
                        event.target === overlay
                    ) {

                        overlay.classList.remove(
                            "show"
                        );

                    }

                }

            );

        });
// SANDHU

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                document
                    .querySelectorAll(
                        ".modal-overlay.show"
                    )
                    .forEach(modal => {

                        modal.classList.remove(
                            "show"
                        );

                    });

            }

        }

    );

}

// SANDHU
function openModal(type) {

    const modalMap = {

        book: "bookModal",

        member: "memberModal",

        issue: "issueModal",

        return: "returnModal"

    };

// SANDHU
    const id =
        modalMap[type];


    if (!id) return;


    document
        .getElementById(id)
        .classList.add("show");


    if (type === "issue") {

        populateIssueBooks();

        populateMembers();

        generateReferencePreview();

    }


    if (type === "return") {

        populateReturnBooks();

    }

}
// SANDHU

function closeModal(id) {

    const modal =
        document.getElementById(id);


    if (modal) {

        modal.classList.remove("show");

    }

}


/* =========================================
   FORMS
========================================= */
// SANDHU
function setupForms() {

    document
        .getElementById("bookForm")
        .addEventListener(
            "submit",
            addBook
        );


    document
        .getElementById("memberForm")
        .addEventListener(
            "submit",
            addMember
        );


    document
        .getElementById("issueForm")
        .addEventListener(
            "submit",
            issueBook
        );


    document
        .getElementById("returnForm")
        .addEventListener(
            "submit",
            returnBook
        );

}
// SANDHU

/* =========================================
   ADD BOOK
========================================= */

async function addBook(event) {

    event.preventDefault();


    const book = {

        title:
            document.getElementById(
                "bookTitle"
            ).value.trim(),

        author:
            document.getElementById(
                "bookAuthor"
            ).value.trim(),

        category:
            document.getElementById(
                "bookCategory"
            ).value,

        isbn:
            document.getElementById(
                "bookISBN"
            ).value.trim()

    };

// SANDHU
    try {

        const response =
            await fetch(
                "/api/books",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(book)

                }
            );
// SANDHU
        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Unable to add book."
            );

        }


        document
            .getElementById(
                "bookForm"
            )
            .reset();

// SANDHU
        closeModal("bookModal");

        await loadAllData();

        renderEverything();


        showToast(
            "Book Added",
            "New book has been added successfully."
        );

    }

    catch (error) {

        showToast(
            "Unable to Add Book",
            error.message,
            "error"
        );

    }

}

// SANDHU
/* =========================================
   ADD MEMBER
========================================= */
// SANDHU
async function addMember(event) {

    event.preventDefault();


    const member = {

        name:
            document.getElementById(
                "memberName"
            ).value.trim(),

        email:
            document.getElementById(
                "memberEmail"
            ).value.trim(),

        phone:
            document.getElementById(
                "memberPhone"
            ).value.trim()

    };
// SANDHU

    try {

        const response =
            await fetch(
                "/api/members",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(member)

                }
            );

// SANDHU
        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Unable to register member."
            );

        }

// SANDHU
        document
            .getElementById(
                "memberForm"
            )
            .reset();


        closeModal("memberModal");

        await loadAllData();

        renderEverything();


        showToast(
            "Member Added",
            "Member registered successfully."
        );

    }

    catch (error) {

        showToast(
            "Registration Failed",
            error.message,
            "error"
        );

    }

}

// SANDHU
/* =========================================
   ISSUE BOOK
========================================= */

async function issueBook(event) {

    event.preventDefault();


    const bookId =
        document.getElementById(
            "issueBook"
        ).value;
// SANDHU
    const memberId =
        document.getElementById(
            "issueMember"
        ).value;


    if (!bookId || !memberId) {

        showToast(
            "Missing Information",
            "Select both book and member.",
            "error"
        );

        return;

    }

// SANDHU
    try {

        const response =
            await fetch(
                "/api/issue",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({

                            book_id:
                                Number(bookId),

                            member_id:
                                Number(memberId)

                        })

                }
            );
// SANDHU

        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Unable to issue book."
            );

        }


        closeModal("issueModal");

        await loadAllData();

        renderEverything();


        showToast(
            "Book Issued",
            "Transaction created successfully."
        );

    }

    catch (error) {

        showToast(
            "Issue Failed",
            error.message,
            "error"
        );

    }

}

// SANDHU
/* =========================================
   RETURN BOOK
========================================= */

async function returnBook(event) {

    event.preventDefault();


    const bookId =
        document.getElementById(
            "returnBook"
        ).value;


    if (!bookId) {

        return;

    }

// SANDHU
    try {

        const response =
            await fetch(
                "/api/return",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({

                            book_id:
                                Number(bookId)

                        })

                }
            );

// SANDHU
        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Unable to return book."
            );

        }


        closeModal("returnModal");

        await loadAllData();

        renderEverything();

// SANDHU
        showToast(
            "Book Returned",
            "Book returned successfully."
        );

    }

    catch (error) {

        showToast(
            "Return Failed",
            error.message,
            "error"
        );

    }

}

// SANDHU
/* =========================================
   DELETE BOOK
========================================= */

async function deleteBook(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this book?"
        );


    if (!confirmed) {

        return;

    }

// SANDHU
    try {

        const response =
            await fetch(
                `/api/books/${id}`,
                {
                    method: "DELETE"
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Unable to delete book."
            );

        }
// SANDHU

        await loadAllData();

        renderEverything();


        showToast(
            "Book Deleted",
            "Book removed from library."
        );

    }

    catch (error) {

        showToast(
            "Delete Failed",
            error.message,
            "error"
        );

    }

}
// SANDHU

/* =========================================
   SELECT OPTIONS
========================================= */

function populateIssueBooks() {

    const select =
        document.getElementById(
            "issueBook"
        );


    const available =
        books.filter(
            book =>
                book.status === "Available"
        );


    select.innerHTML = `

        <option value="">
            Select available book
        </option>

        ${
            available.map(book => `

                <option value="${book.id}">

                    ${escapeHTML(book.title)}
                    —
                    ${escapeHTML(book.author)}

                </option>

            `).join("")
        }

    `;

}
// SANDHU

function populateMembers() {

    const select =
        document.getElementById(
            "issueMember"
        );


    select.innerHTML = `

        <option value="">
            Select member
        </option>

        ${
            members.map(member => `

                <option value="${member.id}">

                    ${escapeHTML(member.name)}

                    —
                    ${escapeHTML(member.email)}

                </option>

            `).join("")
        }

    `;

}
// SANDHU

function populateReturnBooks() {

    const select =
        document.getElementById(
            "returnBook"
        );
// SANDHU

    const issued =
        books.filter(
            book =>
                book.status === "Issued"
        );


    select.innerHTML = `

        <option value="">
            Select issued book
        </option>

        ${
            issued.map(book => `

                <option value="${book.id}">

                    ${escapeHTML(book.title)}

                </option>

            `).join("")
        }

    `;

}

// SANDHU
/* =========================================
   QUICK ISSUE / RETURN
========================================= */

function openIssueForBook(id) {

    openModal("issue");

    setTimeout(() => {

        document.getElementById(
            "issueBook"
        ).value = String(id);

    }, 50);

}
// SANDHU

function openReturnForBook(id) {

    openModal("return");

    setTimeout(() => {

        document.getElementById(
            "returnBook"
        ).value = String(id);

    }, 50);

}
// SANDHU

/* =========================================
   REFERENCE ID
========================================= */

function generateReference(transactionId) {

    return `REF-${new Date().getFullYear()}-${String(
        transactionId
    ).padStart(4, "0")}`;

}


function generateReferencePreview() {

    const nextId =
        transactions.length + 1;


    document.getElementById(
        "referencePreview"
    ).textContent =
        generateReference(nextId);

}
// SANDHU

/* =========================================
   THEME
========================================= */

function setupTheme() {

    const savedTheme =
        localStorage.getItem(
            "libraflow-theme"
        );

// SANDHU
    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark"
        );

        updateThemeButton(true);

    }


    document
        .getElementById(
            "themeToggle"
        )
        .addEventListener(
            "click",
            toggleTheme
        );

}
// SANDHU

function toggleTheme() {

    const isDark =
        document.body.classList.toggle(
            "dark"
        );


    localStorage.setItem(
        "libraflow-theme",
        isDark
            ? "dark"
            : "light"
    );


    updateThemeButton(isDark);

}
// SANDHU

function updateThemeButton(isDark) {

    document.getElementById(
        "themeIcon"
    ).textContent =
        isDark
            ? "☀"
            : "☾";

}

// SANDHU
/* =========================================
   MOBILE MENU
========================================= */

function setupMobileMenu() {

    document
        .getElementById(
            "mobileMenu"
        )
        .addEventListener(
            "click",
            () => {

                document
                    .getElementById(
                        "sidebar"
                    )
                    .classList.toggle(
                        "mobile-open"
                    );

            }

        );

}

// SANDHU
function closeMobileSidebar() {

    document
        .getElementById(
            "sidebar"
        )
        .classList.remove(
            "mobile-open"
        );

}

// SANDHU
/* =========================================
   LOGOUT BUTTON
========================================= */

function setupLogout() {

    document
        .getElementById(
            "logoutButton"
        )
        .addEventListener(
            "click",
            () => {

                showToast(
                    "Session",
                    "You are currently using local admin mode."
                );

            }

        );

}
// SANDHU

/* =========================================
   HEADER ADD BOOK
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        document
            .getElementById(
                "headerAddButton"
            )
            .addEventListener(
                "click",
                () => {

                    openModal("book");

                }

            );

    }
);
// SANDHU

/* =========================================
   UTILITIES
========================================= */

function getInitials(name) {

    return name
        .split(" ")
        .map(word => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

}


function formatDate(dateString) {

    if (!dateString) {

        return "—";

    }


    const date =
        new Date(
            dateString.replace(" ", "T")
        );
// SANDHU

    if (Number.isNaN(date.getTime())) {

        return dateString;

    }


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


function escapeHTML(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}

// SANDHU
/* =========================================
   TOAST
========================================= */

function showToast(
    title,
    message,
    type = "success"
) {

    const toast =
        document.getElementById(
            "toast"
        );


    const icon =
        document.getElementById(
            "toastIcon"
        );

// SANDHU
    document.getElementById(
        "toastTitle"
    ).textContent = title;


    document.getElementById(
        "toastMessage"
    ).textContent = message;


    icon.textContent =
        type === "error"
            ? "!"
            : "✓";


    toast.classList.add(
        "show"
    );


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3200
        );

}

// SANDHU
/* =========================================
   GLOBAL ACCESS
========================================= */

window.deleteBook =
    deleteBook;

window.openIssueForBook =
    openIssueForBook;
// SANDHU
window.openReturnForBook =
    openReturnForBook;