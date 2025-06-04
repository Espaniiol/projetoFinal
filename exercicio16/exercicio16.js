document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('passwordInput');
    const validateButton = document.getElementById('validateButton');
    const lengthCriterion = document.getElementById('lengthCriterion');
    const uppercaseCriterion = document.getElementById('uppercaseCriterion');
    const lowercaseCriterion = document.getElementById('lowercaseCriterion');
    const numberCriterion = document.getElementById('numberCriterion');
    const specialCharCriterion = document.getElementById('specialCharCriterion');
    const overallStatus = document.getElementById('overallStatus');
    const messageDiv = document.getElementById('message');

    function updateCriterion(element, isValid) {
        if (isValid) {
            element.classList.remove('invalid');
            element.classList.add('valid');
        } else {
            element.classList.remove('valid');
            element.classList.add('invalid');
        }
    }

    function validatePassword() {
        const password = passwordInput.value;

        const hasMinLength = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password);

        updateCriterion(lengthCriterion, hasMinLength);
        updateCriterion(uppercaseCriterion, hasUppercase);
        updateCriterion(lowercaseCriterion, hasLowercase);
        updateCriterion(numberCriterion, hasNumber);
        updateCriterion(specialCharCriterion, hasSpecialChar);

        const isStrong = hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;

        if (isStrong) {
            overallStatus.textContent = 'Senha Forte!';
            overallStatus.className = 'success';
            displayMessage('Sua senha é forte e atende a todos os requisitos!', 'success');
        } else {
            overallStatus.textContent = 'Senha Fraca. Atenda a todos os requisitos.';
            overallStatus.className = 'error';
            displayMessage('Sua senha não atende a todos os requisitos.', 'error');
        }
    }

    function displayMessage(msg, type = 'info') {
        messageDiv.textContent = msg;
        messageDiv.className = `message ${type}`;
        setTimeout(() => {
            clearMessage();
        }, 4000);
    }

    function clearMessage() {
        messageDiv.textContent = '';
        messageDiv.className = 'message';
    }

    validateButton.addEventListener('click', validatePassword);

    passwordInput.addEventListener('input', validatePassword);

    validatePassword();
});