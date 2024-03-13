import React, { useState } from "react";

function CardTest() {
  return (
    <div className="card">
      <div className="abstract">
        <h4 className="repair-desc" style={{ backgroundColor: "#19AB0C" }}>
          Change Oil
        </h4>
        <div className="repair-info">
          <section>
            <p className="repair-sub-headings">Due Mileage: </p>
            <p className="repair-sub-headings-value">51000</p>
          </section>
          <section>
            <p className="repair-sub-headings">Labor Cost: </p>
            <p className="repair-sub-headings-value">$50</p>
          </section>
        </div>
      </div>
      <div className="details-wrapper">
        <div className="details">
          <h4 className="parts-desc">Oil</h4>
          <div className="repair-info">
            <section>
              <p className="repair-sub-headings">Price: </p>
              <p className="repair-sub-headings-value">$60</p>
            </section>
            <section>
              <p className="repair-sub-headings">Quantity: </p>
              <p className="repair-sub-headings-value">5</p>
            </section>
          </div>
        </div>
        <div className="details">
          <h4 className="parts-desc">Oil</h4>
          <div className="repair-info">
            <section>
              <p className="repair-sub-headings">Price: </p>
              <p className="repair-sub-headings-value">$60</p>
            </section>
            <section>
              <p className="repair-sub-headings">Quantity: </p>
              <p className="repair-sub-headings-value">5</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardTest;
