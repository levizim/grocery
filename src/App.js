import React, { useState } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';
import applesImg from './images/download.jpeg';
import orangesImg from './images/Orange.jpeg';
import grapesImg from './images/grape.jpeg';
import kiwisImg from './images/kiwi.jpeg';
import strawberriesImg from './images/SB.jpeg';
import bananasImg from './images/nana.jpeg';
import blueberriesImg from './images/BB.jpeg';


function App() {
  const initialGroceries = [
    { id: 1, name: "Apples", price: 1.19, quantity: 25, thumbnail: applesImg },
    { id: 2, name: "Oranges", price: 2.59, quantity: 10, thumbnail: orangesImg },
    { id: 3, name: "Grapes", price: 2.30, quantity: 7, thumbnail: grapesImg },
    { id: 4, name: "Kiwis", price: 5.50, quantity: 2, thumbnail: kiwisImg },
    { id: 5, name: "Strawberrys", price: 0.99, quantity: 20, thumbnail: strawberriesImg },
    { id: 6, name: "Bananas", price: 0.79, quantity: 15, thumbnail: bananasImg },
    { id: 7, name: "Blueberrys", price: 9.99, quantity: 4, thumbnail: blueberriesImg },
  ];

  const [groceries] = useState(initialGroceries);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [isCheckout, setIsCheckout] = useState(false);

  const addToCart = id => {
    let tempCart = [...cart];
    const tempItem = groceries.find(item => item.id === id);
    tempItem.quantity--;
    const findCartItem = tempCart.find(item => item.id === id);
    if (findCartItem) {
      findCartItem.cartQuantity++;
    } else {
      tempCart.push({ ...tempItem, cartQuantity: 1 });
    }
    setCart(tempCart);
    calculateTotalPrice();
    calculateTotalItems();
  };

  const removeFromCart = id => {
    let tempCart = [...cart];
    const findCartItem = tempCart.find(item => item.id === id);
    if (findCartItem.cartQuantity > 1) {
      findCartItem.cartQuantity--;
      const tempItem = groceries.find(item => item.id === id);
      tempItem.quantity++;
    } else {
      tempCart = tempCart.filter(item => item.id !== id);
      const tempItem = groceries.find(item => item.id === id);
      tempItem.quantity++;
    }
    setCart(tempCart);
    calculateTotalPrice();
    calculateTotalItems();
  };

  const calculateTotalPrice = () => {
    const total = cart.reduce((sum, item) => sum + item.price * item.cartQuantity, 0);
    setTotalPrice(total);
  };

  const calculateTotalItems = () => {
    const total = cart.reduce((sum, item) => sum + item.cartQuantity, 0);
    setTotalItemCount(total);
  };


  const checkout = () => {
    setIsCheckout(true);
  };

  const goBack = () => {
    setIsCheckout(false);
  };

  if (isCheckout) {
    return (
      <div className="container mx-auto my-4">
        <h2>Receipt</h2>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} x {item.cartQuantity} = ${(item.price * item.cartQuantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <p>Total price: {totalPrice.toFixed(2)}</p>
        <p>Total items: {totalItemCount}</p>
        <button className="btn btn-success btn-lg mt-3" onClick={goBack}>Return</button>
      </div>
    );
  }



  return (
    <div className="container mx-auto my-4">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6">
          <h2>Groceries</h2>
          <ul className="list-group">
            {groceries.map((item) => (
              <li
                className={`list-group-item d-flex justify-content-between align-items-center`}
                key={item.id}
              >
                <img className="item-image" src={item.thumbnail} alt={item.name} />
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span> 
                <span>{item.quantity}</span>
                <button className="btn btn-primary" disabled={item.quantity <= 0} onClick={() => addToCart(item.id)}>Add to cart</button>
              </li>
            ))}
  
          </ul>
        </div>
        <div className="col-md-6">
          <h2>Cart</h2>
          <ul className="list-group">
            {cart.map((item) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
                <img className="item-image" src={item.thumbnail} alt={item.name} />
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span> {/* Show price in dollar format */}
                <span>{item.cartQuantity}</span>
                <button className="btn btn-primary" onClick={() => removeFromCart(item.id)}>Remove from cart</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <p>Total price: ${totalPrice.toFixed(2)}</p> {/* Show total price in dollar format */}
          <p>Total items: {totalItemCount}</p>
          <button className="btn btn-success mt-3" onClick={checkout}>Checkout</button> {/* Moved the button here */}
        </div>
      </div>
    </div>
  );
}
export default App;
