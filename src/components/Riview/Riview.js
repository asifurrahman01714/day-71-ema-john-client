import React, {useState, useEffect} from 'react';
import {getDatabaseCart, processOrder, removeFromDatabaseCart} from '../../utilities/databaseManager'
import RiviewItem from '../RiviewItem/RiviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';


const Riview = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();
    const hadleProceedCheckout =() =>{
        history.push('/shipment');
    }
    const removeProduct = (productKey) => {
        console.log('remove product clicked', productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('https://salty-tundra-44328.herokuapp.com/productsByKeys',{
            method: 'POST',
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
    },[]);

    let thankYou ;
    if (orderPlaced) {
        thankYou = <img src={happyImage} alt=""/>
    }
    return (
        <div className="twin-container">
            {/* <h1>Order riview  : {cart.length}</h1> */}
           <div className="product-container">
            {
                    cart.map(pd => <RiviewItem 
                        removeProduct={removeProduct} 
                        product={pd} 
                        key={pd.key}
                        >
                        </RiviewItem>)
                }
                {
                    thankYou
                }
           </div>
           <div className="cart-container">
               <Cart cart={cart}>
                   <button onClick={hadleProceedCheckout} className='main-button'>Proceed Checkout</button>
               </Cart>
           </div>
        </div>
    );
};

export default Riview;