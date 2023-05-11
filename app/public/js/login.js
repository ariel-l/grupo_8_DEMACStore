let qs = (elemento) => {
    return document.querySelector(elemento);
};

window.addEventListener("load", () => {
    let $email = qs("#email"),
        $emailErrors = qs("#emailErrors"),
        $password = qs("#password"),
        $passwordErrors = qs("#passwordErrors"),
        $remember = qs('#remember'),
        $rememberErrors = qs('#rememberErrors'),
        $form = qs("#form"),
        regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i, 
    regExpassword = /^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{6,12}$/;

    $email.addEventListener("blur", () => {
        switch (true) {
                case !$email.value.trim():
                    $emailErrors.innerText = "El email es obligatorio";
                    $email.classList.add("is-invalid");
                    break;
                case !regExEmail.test($email.value):
                    $emailErrors.innerText = "Por favor ingrese un email válido";
                    $email.classList.add("is-invalid");
                    break;
                default:
                    $email.classList.remove("is-invalid");
                    $email.classList.add("is-valid");
                    $emailErrors.innerText = "";
                    break;
        }
    });

    $password.addEventListener("blur", () => {
        switch (true) {
                case !$password.value.trim():
                    $passwordErrors.innerText = "La contraseña es obligatoria";
                    $password.classList.add("is-invalid");
                    break;
                case !regExpassword.test($password.value):
                    $passwordErrors.innerText = "Email o contraseña invalido";
                    $password.classList.add("is-invalid");
                    break;
                default:
                    $password.classList.remove("is-invalid");
                    $password.classList.add("is-valid");
                    $passwordErrors.innerText = "";
                    break;
        }
    });

    $remember.addEventListener('click', () => {
        $remember.value = 'on'
        $remember.classList.toggle('is-valid');
        $remember.classList.remove('is-invalid');
        $rememberErrors.innerHTML = ""
    });

    $form.addEventListener("submit", (event) => {
        event.preventDefault();
        const FORM_ELEMENTS = event.target.elements;

        for (let index = 0; index < FORM_ELEMENTS.length - 1; index++) {
                const element = FORM_ELEMENTS[index];
                if (element.value === "" && element.type !== "file") {
                    element.classList.add("is-invalid");
                }
        }

        let elementosConErrores = document.querySelectorAll(".is-invalid");
        let errores = elementosConErrores.length > 0;

        if (errores) {
            submitErrors.innerText = "Hay errores en el formulario";
        } else {
            $form.submit();
        }

        if(!$remember.checked){
            $remember.classList.add('is-invalid');
            $rememberErrors.innerHTML = "Debes aceptar el recordatorio"
        }
    });
});