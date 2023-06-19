import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import OrderPage from './OrderPage';
import HistoryPage from './HistoryPage';
import ReceiptPage from './ReceiptPage';

function App() {
  return (
    <Router>
      <header className="bg-light p-3">
        <div className="container">
          <Link to="/order" className="btn btn-primary m-2">Order Now</Link>
          <Link to="/history" className="btn btn-secondary m-2">History</Link>
        </div>
      </header>
      <Routes>
  <Route path="/order" element={<OrderPage />} />
  <Route path="/history" element={<HistoryPage />} />
  <Route path="/receipt" element={<ReceiptPage />} />
  <Route path="/" element={<Navigate to="/order" />} />
</Routes>

      <footer className="bg-light p-3">
        <div className="container">
          <Link to="/order" className="btn btn-primary m-2">Order Now</Link>
          <Link to="/history" className="btn btn-secondary m-2">History</Link>
        </div>
      </footer>
    </Router>
  );
}

export default App;
