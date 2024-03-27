import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function AddRepair() {
  const [mileage, setMileage] = useState(0);
  const [maintenance, setMaintenance] = useState("");
  const [performed_by, setPerformed_by] = useState("");
  const [material, setMaterial] = useState(0);
  const [labor, setLabor] = useState(0);
  const [other, setOther] = useState(0);

  const { isAuthenitcated, user } = useAuth0();

  const { user_id, v_id } = useParams();
  console.log(`user id in param: ${user_id} and v_id in param: ${v_id}`);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/create/${user_id}/${v_id}`, {
        mileage,
        maintenance,
        performed_by,
        material,
        labor,
        other,
      });
      navigate("/repair");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="repair-forms-container">
      <h1>Add Repair</h1>
    <form onSubmit={handleSubmit} className="repair-forms">
      <input
        name="mileage"
        placeholder="mileage"
        onChange={(e) => {
          setMileage(e.target.value);
          console.log(e.target.value);
        }}
      ></input>
      <input
        name="maintenance"
        placeholder="maintenance"
        onChange={(e) => {
          setMaintenance(e.target.value);
          console.log(e.target.value);
        }}
      ></input>
      <input
        name="performedBy"
        placeholder="performedBy"
        onChange={(e) => {
          setPerformed_by(e.target.value);
          console.log(e.target.value);
        }}
      ></input>
      <input
        name="material"
        placeholder="material"
        onChange={(e) => {
          setMaterial(e.target.value);
          console.log(e.target.value);
        }}
      ></input>
      <input
        name="labor"
        placeholder="labor"
        onChange={(e) => {
          setLabor(e.target.value);
          console.log(e.target.value);
        }}
      ></input>
      <input
        name="other"
        placeholder="other"
        onChange={(e) => {
          setOther(e.target.value);
          console.log(e.target.value);
        }}
      ></input>

      <button class="button-82-pushable" role="button" type="submit">
        <span class="button-82-shadow"></span>
        <span class="button-82-edge"></span>
        <span class="button-82-front text">Add Repair</span>
      </button>
    </form>
    </div>
  );
}

export default AddRepair;
