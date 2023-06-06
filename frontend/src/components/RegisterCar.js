import React, {useState} from "react"
import { TextField, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";



function RegisterCar() {
    const navigate = useNavigate();

    const [vin, setVin] = useState('')
    const [mileage,setMileage] = useState('')

  
    const login = (e) => {
      e.preventDefault();
      document.cookie = "loggedIn=true;Max-Age=1800";
      navigate("/");
    };
  
    return (
      <div className="App">
        <Container maxWidth="sm">
          <form className="login-form" onSubmit={login}>
            <TextField
              required
            onChange={(e) => {
              setVin(e.target.value)
              console.log(vin)
            }}
              name="vin"
              label="vin"
              type="text"
            />
            <TextField
              required
              onChange={(e) => {
                  setMileage(e.target.value)
                console.log(mileage)
              }}
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
      </div>
    );
};


export default RegisterCar;