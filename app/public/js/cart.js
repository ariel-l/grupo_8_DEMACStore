function addProductToCart(productID) {
  const productQuantity = document.getElementById("number").value;

  if (productQuantity === "Unidades") {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.innerText = "Por favor, selecciona una cantidad.";
    return;
  }

  const data = {
    productID: productID,
    productQuantity: productQuantity
  };
  console.log(data)

  fetch(`/cart/add/${productID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        console.log("Producto agregado al carrito");
      } else {
        throw new Error(`Error al agregar el producto al carrito. Código de estado: ${response.status}`);
      }
    })
    .catch(error => {
      console.log("Error en la solicitud: ", error);
      console.log("Error al agregar el producto al carrito. Código de estado: Desconocido");
      throw error; // Relanza el error para que pueda ser capturado en otro lugar si es necesario
    });
}