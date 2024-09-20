import React, { useState } from "react";
import trash from "../trash.svg";
import { useCart, useDispatchCart } from "./../components/ContextReducer";
import { useNavigate } from "react-router-dom";
const BASE_URL = process.env.BASE_URL ; 

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  const [orderPlaced, setOrderPlaced] = useState(false); // state to show success message
  const navigate = useNavigate();

  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3">The Cart is empty!</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");

    console.log("User email: ", userEmail); // debugging for user email
    console.log("Cart data: ", data); // debugging for cart data

    if (!userEmail) {
      console.log("User email not found in local storage");
      return;
    }

    let response = await fetch(`${BASE_URL}/orderData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });

    console.log("Order Response: ", response);

    if (response.status === 200) {
      dispatch({ type: "DROP" });
      setOrderPlaced(true); // Change state to show success message
      console.log("Order placed, state changed"); // Debugging: ensure the state is updated
    } else {
      console.error("Failed to place the order. Status: ", response.status);
    }
  };

  // Ensure prices are treated as numbers
  let totalPrice = data.reduce(
    (total, food) => total + parseFloat(food.price),
    0
  );

  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.quantity}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <img
                      src={trash}
                      alt="delete"
                      style={{ width: "20px", height: "20px" }}
                      onClick={() => dispatch({ type: "REMOVE", index: index })}
                    ></img>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price: ₹{totalPrice.toFixed(2)}/-</h1>
        </div>

        {!orderPlaced ? (
          <div>
            <button className="btn bg-success mt-5" onClick={handleCheckOut}>
              Check Out
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <h2 className="text-success">Your order has been placed</h2>
            <p className="text-muted">
              You can view your order in the <strong>My Order</strong> section.
            </p>
            <button
              className="btn btn-primary mt-3"
              onClick={() => navigate("/myOrderData")}
            >
              Go to My Orders
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
