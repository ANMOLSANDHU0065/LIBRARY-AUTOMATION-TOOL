// SANDHU


/* =========================================
 LIBRARY DESK SIMPLE AUTH
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    setupPasswordToggle(
        "login-password",
        "login-password-toggle"
    );

    setupPasswordToggle(
        "register-password",
        "register-password-toggle"
    );


    /* ================================
       LOGIN
       ================================= */

    const loginForm =
        document.getElementById("login-form");

// SANDHU
    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();

                const email =
                    document
                        .getElementById("login-email")
                        .value
                        .trim();

                const password =
                    document
                        .getElementById("login-password")
                        .value;

// SANDHU
                if (!email) {

                    showMessage(
                        "Please enter your email address.",
                        "error"
                    );

                    return;
                }


                if (!isValidEmail(email)) {

                    showMessage(
                        "Please enter a valid email address.",
                        "error"
                    );

                    return;
                }


                if (!password) {

                    showMessage(
                        "Please enter your password.",
                        "error"
                    );

                    return;
                }
// SANDHU
                const button =
                    document.getElementById(
                        "login-button"
                    );


                setLoading(
                    button,
                    true
                );

// SANDHU
                try {

                    const response =
                        await fetch(
                            "/api/login",
                            {

                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body: JSON.stringify({

                                    email: email,

                                    password: password

                                })

                            }
                        );

// SANDHU
                    const result =
                        await response.json();


                    if (!response.ok) {

                        showMessage(
                            result.message ||
                            "Login failed.",
                            "error"
                        );

                        setLoading(
                            button,
                            false
                        );

                        return;
                    }

// SANDHU
                    showMessage(
                        "Login successful. Opening dashboard...",
                        "success"
                    );


                    setTimeout(() => {

                        window.location.href = "/";

                    }, 500);


                } catch (error) {

                    showMessage(
                        "Server connection failed.",
                        "error"
                    );

                    setLoading(
                        button,
                        false
                    );

                }

            }
        );

    }
// SANDHU

    /* ================================
       REGISTER
       ================================= */

    const registerForm =
        document.getElementById(
            "register-form"
        );


    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();


                const name =
                    document
                        .getElementById("register-name")
                        .value
                        .trim();


                const email =
                    document
                        .getElementById("register-email")
                        .value
                        .trim();

// SANDHU
                const password =
                    document
                        .getElementById("register-password")
                        .value;


                const confirmPassword =
                    document
                        .getElementById("register-confirm")
                        .value;


                if (!name) {

                    showMessage(
                        "Please enter your name.",
                        "error"
                    );

                    return;
                }
// SANDHU

                if (!/^[A-Za-z ]+$/.test(name)) {

                    showMessage(
                        "Name can contain letters and spaces only.",
                        "error"
                    );

                    return;
                }


                if (!isValidEmail(email)) {

                    showMessage(
                        "Please enter a valid email address.",
                        "error"
                    );

                    return;
                }


                if (!password) {

                    showMessage(
                        "Please enter a password.",
                        "error"
                    );

                    return;
                }
// SANDHU

                if (password.length < 6) {

                    showMessage(
                        "Password must contain at least 6 characters.",
                        "error"
                    );

                    return;
                }


                if (password !== confirmPassword) {

                    showMessage(
                        "Passwords do not match.",
                        "error"
                    );

                    return;
                }


                const button =
                    document.getElementById(
                        "register-button"
                    );

// SANDHU
                setLoading(
                    button,
                    true
                );


                try {

                    const response =
                        await fetch(
                            "/api/register",
                            {

                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body: JSON.stringify({

                                    name: name,

                                    email: email,

                                    password: password,

                                    confirm_password:
                                        confirmPassword

                                })
// SANDHU
                            }
                        );


                    const result =
                        await response.json();


                    if (!response.ok) {

                        showMessage(
                            result.message ||
                            "Registration failed.",
                            "error"
                        );

                        setLoading(
                            button,
                            false
                        );

                        return;
                    }

// SANDHU
                    showMessage(
                        "Account created. Opening dashboard...",
                        "success"
                    );


                    setTimeout(() => {

                        window.location.href = "/";

                    }, 500);


                } catch (error) {

                    showMessage(
                        "Server connection failed.",
                        "error"
                    );

                    setLoading(
                        button,
                        false
                    );

                }

            }
        );

    }

});

// SANDHU
/* =========================================
   PASSWORD TOGGLE
   ========================================= */

function setupPasswordToggle(
    inputId,
    buttonId
) {

    const input =
        document.getElementById(inputId);

    const button =
        document.getElementById(buttonId);


    if (!input || !button) {
        return;
    }

// SANDHU
    button.addEventListener(
        "click",
        () => {

            if (input.type === "password") {

                input.type = "text";

                button.textContent = "🙈";

            } else {

                input.type = "password";

                button.textContent = "👁";

            }

        }
    );

}

// SANDHU
/* =========================================
   EMAIL VALIDATION
   ========================================= */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


/* =========================================
   MESSAGE
   ========================================= */

function showMessage(
    message,
    type
) {
// SANDHU
    const box =
        document.getElementById(
            "auth-message"
        );


    if (!box) {
        return;
    }


    box.textContent = message;

    box.className =
        "auth-message show " + type;

}


/* =========================================
   LOADING
   ========================================= */

function setLoading(
    button,
    loading
) {
// SANDHU
    if (!button) {
        return;
    }


    if (loading) {

        button.classList.add("loading");

        button.innerHTML =
            "<span>Please wait...</span><span>...</span>";

    } else {

        button.classList.remove("loading");

    }
// SANDHU
}