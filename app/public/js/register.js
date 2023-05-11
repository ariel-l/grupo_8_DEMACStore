let qs = (elemento) => {
    return document.querySelector(elemento);
}

window.addEventListener("load", () =>  {
    let $inputUser = qs("#username"),
    $userErrors = qs("#userErrors"),
    $email = qs("#email"),
    $emailErrors = qs("#emailErrors"),
    $pass = qs("#password"),
    $passErrors = qs("#passwordErrors"),
    $pass2= qs("#pass2"),
    $pass2Errors = qs("#pass2Errors"),
    $check = qs("#check"),
    $checkErrors = qs("#checkErrors"),
    $register = qs("#register"),
    $file = qs('#avatar'),
    $fileErrors = qs('#avatarErrors'),
    $imgPreview = qs('#img-preview'),
    regExName = /^[a-zA-Z0-9]{1,39}$/;
    regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
    regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
    regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;

    //username
    $inputUser.addEventListener("blur", () => {
        switch (true) {
            case !$inputUser.value.trim():
                $userErrors.innerText = " Nombre de usuario invalido";
                $inputUser.classList.add("is-invalid");
                break;
            case !regExName.test($inputUser.value):
                $userErrors.innerText = "El nombre debe contener entre 2 y 40 caracteres";
                $userErrors.classList.add("is-invalid");
                break;
            case !regExAlpha.test($inputUser.value) :
                $userErrors.innerText = " El nombre de usuario es obligatorio";
                $inputUser.classList.add("is-invalid");

                break;
        
            default:
                $inputUser.classList.remove("is-invalid");
                $inputUser.classList.add("is-valid");
                $userErrors.innerText = "";
                break;
        }
    })
    
    //email
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
    })

    //password
    $pass.addEventListener('blur', () => {
        switch (true) {
            case !$pass.value.trim():
                $passErrors.innerText = 'Debes escribir tu contraseña';
                $pass.classList.add('is-invalid')
                break;
            case !regExPass.test($pass.value):
                $passErrors.innerText = 'La contraseña debe tener al menos 8 caracteres y contener letras mayúsculas, minúsculas, un número y un carácter especial';
                $pass.classList.add('is-invalid')
                break
            default:
                $pass.classList.remove('is-invalid');
                $pass.classList.add('is-valid');
                $passErrors.innerText = ''
                break;
        }
    })

    //password 2
    $pass2.addEventListener('blur', () => {
        switch (true) {
            case !$pass2.value.trim():
                $pass2Errors.innerText = 'Debe reingresar la contraseña';
                $pass2.classList.add('is-invalid')
                break;
            case $pass2.value != $pass.value:
                $pass2Errors.innerText = 'Las contraseñas no coinciden';
                $pass2.classList.add('is-invalid')
                break;
            default:
                $pass2.classList.remove('is-invalid');
                $pass2.classList.add('is-valid');
                $pass2Errors.innerText = ''
                break;
        }
    })
    

    //terms
     $check.addEventListener('click',() => {
         $check.value = 'on'
         $check.classList.toggle('is-valid');
         $check.classList.remove('is-invalid');
         $checkErrors.innerHTML = ""
     })

     //avatar
     $file.addEventListener('change', () => {
        let filePath = $file.value, 
                 allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i 
             if(!allowefExtensions.exec(filePath)){ 
                 $fileErrors.innerHTML = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)';
                 $file.value = '';
                 $imgPreview.innerHTML = '';
                 return false;
             }else{
                // Image preview
                 console.log($file.files);
                if($file.files && $file.files[0]){
                     let reader = new FileReader();
                     reader.onload = function(e){
                         $imgPreview.innerHTML = '<img src="' + e.target.result +'"/>';
                     };
                     reader.readAsDataURL($file.files[0]);
                     $fileErrors.innerHTML = '';
                     $file.classList.remove('is-invalid')
                     }
             }})
})