import React from "react";

function Spinner() {
  return (
    <div>
      <div className="spinner-border text-primary"  style={{
      height: '5rem',
      width: '5rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }} role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;
