let cart = [];
let total = 0;

// Agregar evento a los botones "Agregar al carrito" cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-buy').forEach(button => {
        button.addEventListener('click', () => {
            const productDiv = button.parentElement;
            const id = productDiv.getAttribute('data-id');
            const name = productDiv.getAttribute('data-name');
            const price = parseFloat(productDiv.getAttribute('data-price'));
            addToCart(id, name, price);
        });
    });
    document.getElementById('checkout-button').addEventListener('click', checkout);
});

// Función para agregar al carrito
function addToCart(id, name, price) {
    const existingProduct = cart.find(product => product.id === id);

    if (existingProduct) {
        existingProduct.Quantity++;
    } else {
        cart.push({ id, name, price, Quantity: 1 });
        alert('Producto agregado!');
    }
    updateCart();
}

// Función para actualizar el carrito en cart.html
function updateCart() {
    const tableBody = document.getElementById('cart-body');
    tableBody.innerHTML = '';
    total = 0;

    cart.forEach((product) => {
        const row = document.createElement('tr');
        const cellId = document.createElement('td');
        const cellName = document.createElement('td');
        const cellPrice = document.createElement('td');
        const cellQuantity = document.createElement('td');
        const cellSubTotal = document.createElement('td');
        const cellActions = document.createElement('td');

        cellId.textContent = product.id;
        cellName.textContent = product.name;
        cellPrice.textContent = `$${product.price.toFixed(2)}`;
        cellQuantity.textContent = product.Quantity;
        const subTotal = product.price * product.Quantity;
        cellSubTotal.textContent = `$${subTotal.toFixed(2)}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.addEventListener('click', () => removeFromCart(product.id));

        cellActions.appendChild(removeButton);

        row.appendChild(cellId);
        row.appendChild(cellName);
        row.appendChild(cellPrice);
        row.appendChild(cellQuantity);
        row.appendChild(cellSubTotal);
        row.appendChild(cellActions);
        tableBody.appendChild(row);

        total += subTotal;
    });

    document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
}

// Función para eliminar del carrito
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Función de checkout
function checkout() {
    alert('Compra exitosa!');
    cart = [];
    updateCart();
}

// Abrir el modal
document.getElementById('open-cart-modal').addEventListener('click', () => {
    document.getElementById('cart-modal').style.display = 'block';
});

// Cerrar el modal
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('cart-modal').style.display = 'none';
});

// Cerrar el modal si se hace clic fuera de él
window.onclick = function(event) {
    const modal = document.getElementById('cart-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};