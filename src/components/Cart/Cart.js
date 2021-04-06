import React from 'react';


const Cart = (props) => {
    console.log(props.cart);
    const cart = props.cart;

    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const productPrice = cart[i].price;
        const productQuantity = cart[i].quantity;
        total = total + productPrice * productQuantity || 1;
        
    }

    function precision(num) {
        return num.toFixed(2);
    }
    let tax = total/10;
    return (
        <div>
            <h1>Order summery: {cart.length}</h1>
            <h2>Tax : {precision(tax)}</h2>
            <h2>Total Price: {precision(total)}</h2>
            {
                props.children
            }
        </div>
    );
};

export default Cart;