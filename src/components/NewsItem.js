import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const NewsItem = ({ title, description, imageUrl, newsUrl }) => {
  return (
    <div className="card shadow-lg h-100 rounded-4 overflow-hidden border-0" style={{ backgroundColor: "#f8f9fa" }}>
      <img 
        src={imageUrl || "https://via.placeholder.com/400"} 
        className="card-img-top rounded-top-4"
        alt="News"
        style={{ 
          height: "200px",   // Fixed height for uniform images
          width: "100%",     // Ensures it spans full width
          objectFit: "cover" // Crops instead of stretching
        }} 
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold text-dark">{title}</h5>
        <p className="card-text text-muted flex-grow-1">{description}</p>
        <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-sm w-100 mt-auto">
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
