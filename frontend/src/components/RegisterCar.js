import React, { useState, useEffect } from "react";
import { TextField, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from '@auth0/auth0-react';

const RegisterCar = (props) => {
    const navigate = useNavigate();
    
    const { isAuthenticated, user } = useAuth0();
    
    const user_id = user.sub.split('|')[1].toString();
    const [vin, setVin] = useState('');
    const [mileage, setMileage] = useState('');
    const [open, toggleOpen] = useState(false);
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
      const getVehicles = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/getVehicles/${user_id}`);
          setVehicles(response.data);
        } catch (e) {
          console.error(e);
        }
      };
      getVehicles();
    }, []);

    const MaxVehicles = () => {
      return (
        <div>
          Max limit of registered vehicles reached (4)
        </div>
      );
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post(`http://localhost:5000/addVehicle/${user_id}`, { vin, mileage })
        .then((res) => {
          console.log(res);
        })
        .catch(err => console.log(err));
    };

    return (
      <div>
        {vehicles.length >= 4 ? <MaxVehicles /> : (
          <Container maxWidth="sm">
            <form className="login-form" onSubmit={(e) => {
                handleSubmit(e);
                toggleOpen(true);
              }}>
              <TextField
                required
                onChange={(e) => setVin(e.target.value)}
                name="vin"
                label="vin"
                type="text"
              />
              <TextField
                required
                onChange={(e) => setMileage(e.target.value)}
                name="mileage"
                label="mileage"
              />
              <Button
                type="submit"
                className="login-button"
                variant="contained"
                color="primary"
              >
                Submit Info
              </Button>
            </form>
          </Container>
        )}
        {open && (
          <div className="home" style={{ marginTop: "100px" }}>
            <h4>Find your Vehicle Specs</h4>
            <button onClick={() => navigate('/vindecode')}>Click Here</button>
          </div>
        )}
      </div>
    );
};

export default RegisterCar;
