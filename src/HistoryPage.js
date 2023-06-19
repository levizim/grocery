import React, { useState } from 'react';

function HistoryPage() {

    const [orderHistory, setOrderHistory] = useState(JSON.parse(localStorage.getItem('orderHistory')) || []);

    const clearHistory = () => {
        localStorage.removeItem('orderHistory');
        setOrderHistory([]);
    };

    return (
        <div className="container mx-auto my-4">
            <h2>Order History</h2>
            {orderHistory.length === 0 ? (
                <p>No orders yet.</p>
            ) : (
                <ul>
                    {orderHistory.map((order, index) => (
                        <li key={index}>
                            <h5>Order {index + 1}</h5>
                            {order.map((item) => (
                                <p key={item.id}>
                                    {item.name} x {item.cartQuantity} = ${(item.price * item.cartQuantity).toFixed(2)}
                                </p>
                            ))}
                        </li>
                    ))}
                </ul>
            )}
            <button className="btn btn-danger" onClick={clearHistory}>Clear History</button>
        </div>
    );
}

export default HistoryPage;
