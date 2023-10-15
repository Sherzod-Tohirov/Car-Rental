// Auth : Login

const elLoginBtn = get('js-login-btn');
const elAuthOverlay = get('js-auth-overlay');
const elLogin = get('js-login');
const elAuthCloseBtn = get('js-auth-close-btn');
const elEyeIcon = get('js-eye-icon');
const elEmailInput = get('js-email-input');
const elPasswordInput = get('js-password-input');
const elLoginForm = get('js-login-form');
const elEmailError = get('js-email-error');
const elPasswordError = get('js-password-error');

elLoginBtn.addEventListener('click', (evt) => {
    if(matchMedia('(min-width: 0)').matches && matchMedia('(max-width: 1024px)').matches) {
        setTimeout(() => {
            elAuthOverlay.classList.add('appear');
            elLogin.classList.add('auth-appear');
        }, 400);
    }else {
        elAuthOverlay.classList.add('appear');
        elLogin.classList.add('auth-appear');
    }
    

});

elAuthCloseBtn.addEventListener('click', (evt) => {
    elAuthOverlay.classList.remove('appear');
    elLogin.classList.remove('auth-appear');
});

elEyeIcon.addEventListener('click', (evt) => {
    if(localStorage.getItem("dark")) elEyeIcon.classList.toggle('eye-closed--dark');
    else elEyeIcon.classList.toggle('eye-closed');
    elPasswordInput.type === 'password' ? elPasswordInput.type = 'text' : elPasswordInput.type = 'password';
});

elLoginForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  validate(elEmailInput, elEmailError, 'Email', ['email']);
  validate(elPasswordInput, elPasswordError, 'Password');
});



function validate(element, errElement, inputName, options = []) {
    if(element.value.length == 0) {
        element.classList.add('invalid-input');
        element.classList.remove('valid-input');
        addError(errElement, `${inputName} cannot be empty !`);
        return;
      } else if(options.length > 0) {
        for(options of options) {
            if(options === "email") {
                
                const Regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

                if(!Regexp.test(element.value)) {
                    element.classList.add('invalid-input');
                    element.classList.remove('valid-input');
                    addError(errElement, `${inputName} must be valid email !`);
                    return;
                }
            }
        }
      } 

    element.classList.remove('invalid-input');
    element.classList.add('valid-input');
    removeError(errElement);
      
    // Additional helper functions
    
    function addError(element, msg) {
        element.textContent = msg;
    }

    function removeError(element) {
    element.textContent = '';
    }
}