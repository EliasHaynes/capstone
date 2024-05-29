import React, { useState } from "react";
import AIModal from './AIModal.js'
import 'bootstrap/dist/css/bootstrap.min.css';

function MaintenanceCard({
  repairDesc,
  repairMileage,
  repairLabor,
  repairDifficulty,
  parts,
  partsDesc,
  partsCost,
  partsQuantity,
  isActive
}) {


  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 1: return "#19AB0C"; // Easy
      case 2: return "#F07A0D"; // Medium
      case 3: return "#F00D0D"; // Hard
      default: return "transparent"; // Default case
    }
  };  
  const backgroundColor = getDifficultyColor(repairDifficulty);

  //Parts component
  const PartsCard = () => {
    return (
      <div className="parts-card">
        <h1 className="parts-desc">Part Desc</h1>

        <section>
          <h4>Price: </h4>
          <h4> $100</h4>
          <h4>Quantity: </h4>
          <h4>8</h4>
        </section>
      </div>
    );
  };



  return (
    <>
      <div className="abstract">
        <h4
          className="repair-desc"
          style={{ backgroundColor}}
        >
          {repairDesc}
        </h4>
        <div className="repair-info">
          <section>
            <p className="repair-sub-headings">Due Mileage: </p>
            <p className="repair-sub-headings-value">{repairMileage}</p>
          </section>
          <section>
            <p className="repair-sub-headings">Labor Cost: </p>
            <p className="repair-sub-headings-value">{repairLabor}</p>
          </section>
        </div>
        <AIModal></AIModal>
      </div>
      {parts && parts.length > 0 && (
        <div className="details-wrapper">
            {parts.map((part,index) => (
                <div key={index} className="details">
                <h4 className="parts-desc">{part.desc}</h4>
        <div className="parts-info">
          <section>
            <p className="parts-sub-headings">Price: </p>
            <p className="parts-sub-headings-value">{part.price}</p>
          </section>
          <section>
            <p className="parts-sub-headings">Quantity: </p>
            <p className="parts-sub-headings-value">{part.qty}</p>
          </section>
        </div >
                </div>
            ))}
        
      </div>
      )}
      
    </>
  );
}

export default MaintenanceCard;
