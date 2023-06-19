import React from 'react';

function ReceiptPage() {
    const order = JSON.parse(localStorage.getItem('lastOrder')) || [];

    return (
        <div className="container mx-auto my-4">
            <h2>Receipt</h2>
            <ul>
                {order.map((item) => (
                    <li key={item.id}>
                        {item.name} x {item.cartQuantity} = ${(item.price * item.cartQuantity).toFixed(2)}
                    </li>
                ))}
            </ul>
            <p>Total price: {order.reduce((sum, item) => sum + item.price * item.cartQuantity, 0).toFixed(2)}</p>
            <p>Total items: {order.reduce((sum, item) => sum + item.cartQuantity, 0)}</p>
        </div>
    );
}

export default ReceiptPage;
