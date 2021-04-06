import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
const Product = (props) => {
    console.log(props);
    console.log(props.product);
    console.log(props.product.key);
   // console.log(props.product);
    const {name, seller, price, img, stock, key} = props.product;
    return (

        <div className='product'>
            <div>
                <img src={img} alt=""/>
            </div>

            <div>
                <h4 className='product-title'><Link to={"/productKey/" + key}>{name}</Link> </h4>
                <p>By: {seller}</p>
                <p>Price: ${price}</p>
                <p>Only {stock} left in stock. Order soon.</p>
                {props.showAddToCart && <button className='main-button' onClick={()=> props.handleProduct(props.product)}> <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart</button>}
            </div>
        </div>
    );
};

export default Product;