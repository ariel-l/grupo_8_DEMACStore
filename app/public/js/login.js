let qy = (element) => {
    return document.querySelector(element);
};

window.addEventListener("load", () => {
    let $email = qy("#email"),
        $emailErrors = qy("#emailErrors"),
        $password = qy("#password"),
        $passwordErrors = qy("#passwordErrors"),
        $form = qy("#form"),
        regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
        regExPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;

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
            case !regExPassword.test($password.value):
                $passwordErrors.innerText = "Email o contraseña inválido";
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
        $rememberErrors.innerHTML = "";
    });

    $form.addEventListener("submit", (event) => {
        event.preventDefault();
        if ($email.value.trim() && $password.value.trim()) {
            $form.submit();
        }
    });
});