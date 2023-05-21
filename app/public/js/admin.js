const scrollLeftButton = document.querySelector('.scroll-left');
const scrollRightButton = document.querySelector('.scroll-right');
const scrollContent = document.querySelector('.scroll-content');

scrollLeftButton.addEventListener('click', () => {
  scrollContent.scrollLeft -= 100;
});

scrollRightButton.addEventListener('click', () => {
  scrollContent.scrollLeft += 100;
});


document.addEventListener('DOMContentLoaded', function() {
  const table = document.querySelector('#productTable');
  const rows = table.querySelectorAll('tbody tr');
  const brandFilter = document.querySelector('.brand-filter');
  const categoryFilter = document.querySelector('.category-filter');
  const subcategoryFilter = document.querySelector('.subcategory-filter');

  brandFilter.addEventListener('change', filterRows);
  categoryFilter.addEventListener('change', filterRows);
  subcategoryFilter.addEventListener('change', filterRows);

  function filterRows() {
    const selectedBrand = brandFilter.value.toLowerCase();
    const selectedCategory = categoryFilter.value.toLowerCase();
    const selectedSubcategory = subcategoryFilter.value.toLowerCase();

    rows.forEach(function(row) {
      const rowBrand = row.querySelector('.product-brand').textContent.toLowerCase();
      const rowCategory = row.querySelector('.product-category').textContent.toLowerCase();
      const rowSubcategory = row.querySelector('.product-subcategory').textContent.toLowerCase();

      if (
        (selectedBrand === '' || rowBrand === selectedBrand) &&
        (selectedCategory === '' || rowCategory.includes(selectedCategory)) &&
        (selectedSubcategory === '' || rowSubcategory.includes(selectedSubcategory))
      ) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }
});
