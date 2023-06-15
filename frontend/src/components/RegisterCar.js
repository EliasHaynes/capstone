import React, {useState} from "react"
import { TextField, Button, Container, useThemeProps } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { saveVin,saveMileage } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux"; 



const RegisterCar = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch() 

    const mileage = useSelector(state => state.mileage)
    const vin = useSelector(state => state.vin)
    
    

    const [vinNum, setVin] = useState('')
    const [mile,setMileage] = useState('')
    const [open, toggleOpen] = useState(false)

  
    const login = (e) => {
      e.preventDefault();
      // document.cookie = "loggedIn=true;Max-Age=1800";
      // navigate("/");
      dispatch(saveVin(vinNum))
      dispatch(saveMileage(mile))

    };


  
    return (
      <div className="App">
        <p>{vin}</p>
        <p>{mileage}</p>
        <Container maxWidth="sm">
          <form className="login-form" 
            onSubmit={(e) => {
              login(e)
              toggleOpen(true)
            }}>
            <TextField
              required
            onChange={(e) => {
              setVin(e.target.value)
            }}
              name="vin"
              label="vin"
              type="text"
            />
            <TextField
              required
              onChange={(e) => {
                setMileage(e.target.value)
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
        {open &&(
          <div className="home" style={{marginTop: "100px"}}>

          <h4> Find your Vehicle Specs</h4>
          <button onClick={() => navigate('/vindecode')}>Click Here</button>
          </div>
        )}
        </div>
    );
};


export default RegisterCar;