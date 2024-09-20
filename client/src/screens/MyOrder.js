import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import './MyOrder.css'; // Import CSS file for styling
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL ; 

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        try {
            const response = await fetch(`${REACT_APP_BASE_URL}/myOrderData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail'),
                }),
            });

            const data = await response.json();
            setOrderData(data);
        } catch (error) {
            console.error('Error fetching order data:', error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                {orderData.length === 0 ? (
                    <div className="alert alert-info" role="alert">
                        No orders available.
                    </div>
                ) : (
                    orderData.map((order, orderIndex) => (
                        <div key={orderIndex} className="order-section mb-4">
                            {order.order_data.length > 0 && (
                                <>
                                    {order.order_data.map((items, index) => {
                                        // Filter out items with missing crucial data
                                        const filteredItems = items.filter(item => item.name && item.quantity !== undefined && item.size && item.price !== undefined);

                                        return (
                                            filteredItems.length > 0 && (
                                                <div key={index} className="order-date-section mb-4">
                                                    <h3 className="text-primary mb-3">
                                                        Order Date: {items[0]?.Order_date || 'Date Not Available'}
                                                    </h3>
                                                    <div className="order-items">
                                                        {filteredItems.map((orderDetail, detailIndex) => (
                                                            <div key={detailIndex} className="order-item mb-3">
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">
                                                                            {orderDetail.name || 'Name Not Available'}
                                                                        </h5>
                                                                        <p className="card-text">
                                                                            <strong>Qty:</strong> {orderDetail.quantity} <br />
                                                                            <strong>Size:</strong> {orderDetail.size} <br />
                                                                            <strong>Price:</strong> ₹{orderDetail.price}/-
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )
                                        );
                                    })}
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
            <Footer />
        </>
    );
}
