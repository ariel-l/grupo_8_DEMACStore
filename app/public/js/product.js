let qs = (element) => {
    return document.querySelector(element);
}

window.addEventListener("load", () => {
    let $form = qs('#form'),
        $submitErrors = qs('#submitErrors'),
        $inputName = qs('#name'),
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
        $descriptionErrors = qs('#descriptionErrors');
        regExName = /^[A-Z0-9][A-Za-z0-9\s]{4,49}$/;

        regExDiscount = /^((7[5-9])|([89][0-9])|100)%$/;
        refExPrice = /^([1-9][0-9]{2,}|[1-9][0-9]*\.[0-9]+)$/;
        regExDescription = /^.{20,450}$/;


    /* Validaciones - Nombre */
    $inputName.addEventListener("blur", () => {
        switch (true) {
            case !$inputName.value.trim():
                $nameErrors.innerText = "El campo nombre es obligatorio";
                $inputName.classList.add("is-invalid");
                break;
            case !regExName.test($inputName.value):
                $nameErrors.innerText = "El nombre debe empezar con mayúscula y contener entre 5 y 40 caracteres";
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
            case $inputDiscount.value < 0:
                    $inputDiscount.classList.add("is-invalid");
                    $discountErrors.innerText = "no puede poner descuentos negativos";
                break;
            case $inputDiscount.value > 100:
                    $inputDiscount.classList.add("is-invalid");
                    $discountErrors.innerText = "El descuento no puede ser del 100%";
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
            case !$inputPrice.value || !refExPrice.test($inputPrice.value) || parseFloat($inputPrice.value) <= 100:
                $priceErrors.innerText = "El precio es inválido";
                $inputPrice.classList.add("is-invalid");
                break;
            default:
                $inputPrice.classList.remove("is-invalid");
                $inputPrice.classList.add("is-valid");
                $priceErrors.innerText = "";
                break;
        }
    });

    /* Validaciones - Imagen */
    $inputImage.addEventListener('blur', () => {
        const filePath = $inputImage.value,
              allowedExtensions = ['.jpg', '.png', '.jpeg', '.gif', '.svg'];
        const fileExtension = filePath.substring(filePath.lastIndexOf('.')).toLowerCase();
        switch (true) {
            case !$inputImage.value:
                $imageErrors.innerText = "Debes seleccionar una imagen";
                $inputImage.classList.add('is-invalid');
                break;
            case !allowedExtensions.includes(fileExtension):
                $imageErrors.innerText = "Formato de imagen inválido";
                $inputImage.classList.add('is-invalid');
                break;
            default:
                $inputImage.classList.remove('is-invalid');
                $inputImage.classList.add('is-valid');
                $imageErrors.innerText = "";
                break;
        }
    })
    /* Validaciones - Categoría y subcategoría */

    $selectCategory.addEventListener('change', () => {
        switch (true) {
            case $selectCategory.value === '':
                $categoryErrors.innerText = 'Por favor seleccione una categoría';
                $selectCategory.classList.add('is-invalid');
                break;
            default:
                $selectCategory.classList.remove('is-invalid');
                $selectCategory.classList.add('is-valid');
                $categoryErrors.innerText = '';
                break;
        }
    })
    $selectSubCategory.addEventListener('change', () => {
        switch (true) {
            case $selectSubCategory.value === '':
                $subCategoryErrors.innerText = 'Por favor seleccione una subcategoría';
                $selectSubCategory.classList.add('is-invalid');
                break;
            default:
                $selectSubCategory.classList.remove('is-invalid');
                $selectSubCategory.classList.add('is-valid');
                $subCategoryErrors.innerText = '';
                break;
        }
    })

    /* Validaciones - Marca */

    $inputBrand.addEventListener('blur', () => {
        switch (true) {
            case $inputBrand.value:
                $brandErrors.innerText = 'Por favor seleccione una marca';
                $inputBrand.classList.add('is-invalid');
                break;
            default:
                $inputBrand.classList.remove('is-invalid');
                $inputBrand.classList.add('is-valid');
                $brandErrors.innerText = '';
                break;
        }
    })

    /* Validaciones - Descripción */

    $inputDescription.addEventListener('blur', () => {
        switch (true) {
            case !$inputDescription.value.trim():
                $descriptionErrors.innerText = 'Debes escribir una descripción';
                $inputDescription.classList.add('is-invalid');
                break;
            case !regExDescription.test($inputDescription.value):
                $descriptionErrors.innerText = 'Por favor ingrese como máximo 450 caracteres, y como minimo 20';
                $inputDescription.classList.add('is-invalid');
                break;
            default:
                $inputDescription.classList.remove('is-invalid');
                $inputDescription.classList.add('is-valid');
                $descriptionErrors.innerText = '';
                break;
        }
    });
      $form.addEventListener("submit", (event) => {
        event.preventDefault();
        let variable = "";
        const FORM_ELEMENTS = event.target.elements;
        console.log(FORM_ELEMENTS);
        for (let i = 0; i < FORM_ELEMENTS.length - 14; i++) {
            const element = FORM_ELEMENTS[i];
            if((element.value === "" || element.value === "0" && element.id === "price") && element.type != "file"){
                element.classList.add("is-invalid")
                console.log(element.value)
                variable += element.value
            }
        }
        let elementosConErrores = document.querySelectorAll(".is-invalid");
        let errores = elementosConErrores.length > 0;
        errores ? $submitErrors.innerText = "Hay errores en su formulario, por favor verifique que todos los valores sean correctos" : $form.submit()
    })
})