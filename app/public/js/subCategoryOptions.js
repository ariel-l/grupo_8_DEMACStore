const $categorySelect = document.querySelector('#category');
const $subCategorySelect = document.querySelector('#subCategory');

const subCategoryOptions = {
  1: [
    { value: '1', label: 'Celular Nuevo' },
    { value: '2', label: 'Celular Refabricado' }
  ],
  2: [
    { value: '3', label: 'Accesorio Nuevo' }
  ]
};

function updateSubCategoryOptions(categoryValue) {
  $subCategorySelect.innerHTML = '';
  const options = subCategoryOptions[categoryValue];
  options.forEach(option => {
    const { value, label } = option;
    const optionElement = document.createElement('option');
    optionElement.value = value;
    optionElement.textContent = label;
    $subCategorySelect.appendChild(optionElement);
  });
}

$categorySelect.addEventListener('change', () => {
  const categoryValue = $categorySelect.value;
  updateSubCategoryOptions(categoryValue);
});

const initialCategoryValue = $categorySelect.value;
updateSubCategoryOptions(initialCategoryValue);