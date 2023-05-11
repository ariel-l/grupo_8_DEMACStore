let qs = (elemento) => {
    return document.querySelector(elemento);
};

window.addEventListener("load", () => {
    let $email = qs("#email"),
        $emailErrors = qs("#emailErrors"),
        $password = qs("#password"),
        $passwordErrors = qs("#passwordErrors"),
        $remember = qs("#remember");
        $rememberErrors = qs("#rememberErrors"),
        $form = qs("#form"),
        regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,

        $email.addEventListener('blur', () => {
            switch (true) {
                case !$email.value.trim(): 
                    $emailErrors.innerText = 'El email es obligatorio';
                    $email.classList.add('is-invalid')
                    break;
                case !regExEmail.test($email.value):
                    $emailErrors.innerText = 'Debe ingresar un email válido';
                    $email.classList.add('is-invalid')
                    break
                default:
                    $email.classList.remove('is-invalid');
                    $email.classList.add('is-valid');
                    $emailErrors.innerText = ''
                    break;
            }
    });

    $password.addEventListener("blur", () => {
        switch (true) {
                case !$password.value.trim():
                    $passwordErrors.innerText = "La contraseña es obligatoria";
                    $password.classList.add("is-invalid");
                    break;
                default:
                    $password.classList.remove("is-invalid");
                    $password.classList.add("is-valid");
                    $passwordErrors.innerText = "";
                    break;
        }
    });

    $form.addEventListener("submit", (event) => {
        event.preventDefault();
        const FORM_ELEMENTS = event.target.elements;

        for (let index = 0; index < FORM_ELEMENTS.length - 2; index++) {
                const element = FORM_ELEMENTS[index];
                console.log(element.value, element.type)
                if (element.value.trim() === "") {
                    element.classList.add("is-invalid");
                }
        }

        if(!$remember.checked) {
            $rememberErrors.innerText = "Debes recordar sesión";
            $remember.classList.add("is-invalid");
            err
        }

        let elementosConErrores = document.querySelectorAll(".is-invalid");
        let errores = elementosConErrores.length > 0;
        console.log(errores)
        if (errores) {
            submitErrors.innerText = "Hay errores en el formulario";
        } else {
            $form.submit();
        }
    });
});