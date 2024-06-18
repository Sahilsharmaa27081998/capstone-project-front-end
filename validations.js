// Function to validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to validate password strength (minimum 8 characters)
function validatePassword(password) {
    return password.length >= 8;
}

// Function to validate login form
function validateLoginForm() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    if (!validateEmail(emailInput.value)) {
        alert('Please enter a valid email address.');
        emailInput.focus();
        return false;
    }

    // Additional validation logic can be added here for specific requirements

    return true;
}

// Function to validate signup form
function validateSignupForm() {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const confirmEmailInput = document.getElementById('confirmEmail');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    if (!validateEmail(emailInput.value)) {
        alert('Please enter a valid email address.');
        emailInput.focus();
        return false;
    }

    if (emailInput.value !== confirmEmailInput.value) {
        alert('Email addresses do not match.');
        confirmEmailInput.focus();
        return false;
    }

    if (!validatePassword(passwordInput.value)) {
        alert('Password must be at least 8 characters long.');
        passwordInput.focus();
        return false;
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
        alert('Passwords do not match.');
        confirmPasswordInput.focus();
        return false;
    }

    // Additional validation logic can be added here for specific requirements

    return true;
}