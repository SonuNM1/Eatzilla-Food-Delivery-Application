import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  // Function to remove duplicates
  const removeDuplicates = (array, key) => {
    return [...new Map(array.map((item) => [item[key], item])).values()];
  };

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:7000/api/foodData", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      response = await response.json();

      console.log("API Response: ", response);

      // Function to remove duplicates
      const removeDuplicates = (array, key) => {
        return [...new Map(array.map((item) => [item[key], item])).values()];
      };

      // Set unique food items and categories
      setFoodItem(removeDuplicates(response[0], "_id"));
      setFoodCategory(removeDuplicates(response[1], "_id"));
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                style={{
                  filter: "brightness(30%)",
                  objectFit: "cover",
                  height: "500px",
                }}
                src="/first_slide.jpg"
                alt="first slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                style={{
                  filter: "brightness(30%)",
                  objectFit: "cover",
                  height: "500px",
                }}
                src="/second_slide.jpg"
                alt="second slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                style={{
                  filter: "brightness(30%)",
                  objectFit: "cover",
                  height: "500px",
                }}
                src="/third_slide.jpg"
                alt="Third slide"
              />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleFade"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleFade"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
      <div className="container">
  {foodCategory.length > 0
    ? foodCategory.map((data) => (
        <div className="row mb-3" key={data._id}>
          <div className="fs-3 m-3">{data.CategoryName}</div>
          <hr />
          {foodItem.length > 0 ? (
            foodItem
              .filter(
                (item) =>
                  item.CategoryName === data.CategoryName &&
                  item.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((filterItems) => (
                <div
                  key={filterItems._id}
                  className="col-12 col-md-6 col-lg-3 mb-4 mx-lg-3" // Add spacing here
                >
                  <Card
                    foodItem={filterItems}
                    options={filterItems.options[0]}
                  />
                </div>
              ))
          ) : (
            <div>No such data found</div>
          )}
        </div>
      ))
    : ""}
</div>


      <div>
        <Footer />
      </div>
    </div>
  );
}
