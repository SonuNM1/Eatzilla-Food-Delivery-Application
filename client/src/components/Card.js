import React, { useEffect, useRef, useState } from 'react'; 
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {

  let dispatch = useDispatchCart(); 
  let data = useCart(); 
  const priceRef = useRef(); 
  let options = props.options; 
  let priceOptions = Object.keys(options);

  const [quantity, setQuantity] = useState(1); 
  const [size, setSize] = useState(""); 

  let finalPrice = quantity * parseInt(options[size]);

  const handleAddToCart = async() => {
    let food = {}; 
    
    // Check if the item already exists in the cart
    for(const item of data){
      if(item.id === props.foodItem._id){
        food = item; 
        break; 
      }
    }

    // If the item exists and size is the same, update the quantity and price
    if (Object.keys(food).length !== 0 && food.size === size) {
      await dispatch({
        type: "UPDATE",
        id: props.foodItem._id,
        price: finalPrice,
        quantity: quantity
      });
      return;
    }

    // If size is different or item is new, add to cart
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice, 
      quantity: quantity,
      size: size
    });
  }

  useEffect(() => {
    setSize(priceRef.current.value); // Set default size on component mount
  }, []);

  return (
    <div>
      <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px", "borderRadius": "15px", "overflow": "hidden" }}>
  <img 
    src={props.foodItem.img} 
    className="card-img-top" 
    alt="..." 
    style={{ height: '150px', objectFit: 'cover' }} 
  />
  <div className="card-body d-flex flex-column justify-content-between">
    <h5 className="card-title">{props.foodItem.name}</h5>
    
    <div className="container w-100">
      <select 
        className="m-2 h-100 bg-success rounded"
        onChange={(e) => setQuantity(e.target.value)}
      >
        {
          Array.from(Array(6), (e, i) => {
            return (
              <option key={i+1} value={i+1}> {i+1} </option>
            );
          })
        }
      </select>

      <select 
        className="m-2 h-100 bg-success rounded"
        ref={priceRef}
        onChange={(e) => setSize(e.target.value)}
      >
        {
          priceOptions.map((data) => {
            return <option key={data} value={data}>{data}</option>
          })
        }
      </select>

      <div className="d-inline h-100 fs-5">
        ₹{finalPrice}/-
      </div>
    </div>

    <button className='btn btn-success justify-center ms-2 mt-2' onClick={handleAddToCart}>
      Add to Cart
    </button>
  </div>
</div>

    </div>
  );
}
