import React from 'react';

const RiviewItem = (props) => {
    console.log(props);
    const {name, quantity, key, price} = props.product;
    const reviewItemStyle = {
        borderBottom: '1px solid lightgrey',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '200px'
    }
    return (
        <div style={reviewItemStyle}>
            <h2 className="product-title">Name: {name}</h2>
            <h2>Quantity: {quantity}</h2>
            <p>Price: {price}</p>
            <button 
                className='main-button'
                onClick={() => props.removeProduct(key)}
            >Remove</button>
        </div>
    );
};

export default RiviewItem;