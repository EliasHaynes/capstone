import React from "react";
import AIModal from './AIModal.js'
import 'bootstrap/dist/css/bootstrap.min.css';

function MaintenanceCard({
  repair,
  repairID,
  repairDescs,
  repairDifficulty,
  parts,
}) {

  console.log("repair descs:", repairDescs)

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 1: return "#19AB0C"; // Easy
      case 2: return "#F07A0D"; // Medium
      case 3: return "#F00D0D"; // Hard
      default: return "transparent"; // Default case
    }
  };  
  const backgroundColor = getDifficultyColor(repairDifficulty);


  return (
    <>
      <div className="abstract">
        <h4
          className="repair-desc"
          style={{ backgroundColor}}
        >
          {repair.desc}
        </h4>
        <div className="repair-info">
          <section>
            <p className="repair-sub-headings">Due Mileage: </p>
            <p className="repair-sub-headings-value">{repair.due_mileage}</p>
          </section>
          <section>
            <p className="repair-sub-headings">Labor Cost: </p>
            <p className="repair-sub-headings-value">{repair.repair ? repair.repair.labor_cost : 0}</p>
          </section>
        </div>
        <AIModal cardID={repairID} cardDescs={repairDescs}></AIModal>
      </div>
      {parts && parts.length > 0 && (
        <PartsCard parts={repair.parts}></PartsCard>
      )}
      
    </>
  );
}

function PartsCard({ parts }) {
  return (
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
  );
}

export default MaintenanceCard;
