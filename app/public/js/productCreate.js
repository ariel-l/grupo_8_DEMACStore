let qs = (element) => {
    return document.querySelector(element);
}

window.addEventListener("load", () => {


    let $inputName = qs('#name'),
        $nameErrors = qs('#nameErrors'),
        $inputDiscount = qs('#discount'),
        $discountErrors = qs('#discountErrors'),
        $inputPrice = qs('#price'),
        $priceErrors = qs('#priceErrors'),
        $inputImage = qs('#image'),
        $imageErrors = qs('#imageErrors'),
        $selectCategory = qs('#category'),
        $categoryErrors = qs('#categoryErrors'),
        $selectSubCategory = qs('#subCategory'),
        $subCategoryErrors = qs('#subCategoryErrors'),
        $inputBrand = qs('#brand'),
        $brandErrors = qs('#brandErrors'),
        $inputDescription = qs('#description'),
        $descriptionError = qs('#descriptionError'),
        regExName = `^[A-Z][a-zA-Z0-9]{4,39}$`;
        regExDiscount = `^((7[5-9])|([89][0-9])|100)%$`;
        refExPrice = `^[1-9][0-9]*(\.[0-9]+)?$`;
        refExDescription = /^.{20,450}$/; 


        /* Validaciones - Nombre */

        $inputName.addEventListener("blur", () => {
            switch (true) {
                case !$inputName.value.trim():
                    $nameErrors.innerText = "El campo nombre es obligatorio";
                    $inputName.classList.add("is-invalid");
                    break;
                case !regExName.test($inputName.value):
                    $nameErrors.innerText = "El nombre debe empezar con mayuscula, y conetener menos de 40 caracteres";
                    $inputName.classList.add("is-invalid");
                    break;
                default:
                    $inputName.classList.remove("is-invalid");
                    $inputName.classList.add("is-valid");
                    $nameErrors.innerText = "";
                    break;
            }
        })

        /* Validaciones - Descuento */
        $inputDiscount.addEventListener("blur", () => {
            switch (true) {
                case regExDiscount.test($inputDiscount.value):
                    $discountErrors.innerText = "El descuento es invalido";
                    $inputDiscount.classList.add("is-invalid");
                    break;
                default:
                    $inputDiscount.classList.remove("is-invalid");
                    $inputDiscount.classList.add("is-valid");
                    $discountErrors.innerText = "";
                    break;
            }
        })

        /* Validaciones - Precio */
        $inputPrice.addEventListener("blur", () => {
            switch (true) {
                case !refExPrice.test($inputPrice.value):
                    $priceErrors.innerText = "El precio es invalido";
                    $inputPrice.classList.add("is-invalid");
                    break;
                default:
                    $inputPrice.classList.remove("is-invalid");
                    $inputPrice.classList.add("is-valid");
                    $priceErrors.innerText = "";
                    break;
            }
        })


    let elementosConErrores = document.querySelectorAll(".is-invalid");
    let errores = elementosConErrores.length > 0;

    if(errores) {
             submitErrors.innerText = "Hay errores en el formulario"
         } else {
             $form.submit()
         }
    })

    // $file.addEventListener('change', () => {
    //     let filePath = $file.value, //Capturo el valor del input
    //         allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i //Extensiones permitidas
    //     if(!allowefExtensions.exec(filePath)){ //El método exec() ejecuta una busqueda sobre las coincidencias de una expresión regular en una cadena especifica. Devuelve el resultado como array, o null.
    //         $fileErrors.innerHTML = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)';
    //         $file.value = '';
    //         $imgPreview.innerHTML = '';
    //         return false;
    //     }else{
    //        // Image preview
    //         console.log($file.files);
    //         if($file.files && $file.files[0]){
    //             let reader = new FileReader();
    //             reader.onload = function(e){
    //                 $imgPreview.innerHTML = '<img src="' + e.target.result +'"/>';
    //             };
    //             reader.readAsDataURL($file.files[0]);
    //             $fileErrors.innerHTML = '';
    //             $file.classList.remove('is-invalid')
    //             }
    //         }
