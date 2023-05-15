import React, {useState} from "react";
import { useNavigate } from "react-router";
import cookie from "cookie"




function RegisterUser() {
    const navigate = useNavigate()

    const [state, setState] = useState({
        email: "",
        password: "",
        name: "",
        phoneNum: "",
        vinNum: "",
        mileage: ""
      });

    const handleSubmit = (e) => {
        e.preventDefault()

        document.cookie = "loggedIn=true;Max-Age=1800";
        navigate("/")
    }

    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => {
          return {
            ...prevState,
            [name]: value,
          };
        });
    };
      
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="email" value={state.email} placeholder="Email"></input>
                <input name="password" value={state.password} type="password" placeholder="Set password"></input>
                <input name="name" value={state.name} placeholder="Name"></input>
                <input name="phoneNum" value={state.phoneNum} placeholder="Phone #"></input>
                <input name="vinNum" value={state.vinNum} placeholder="Vin #"></input>
                <input name="mileage" value={state.mileage} placeholder="Mileage"></input>

                <button type="submit">Create Account</button>
            </form>
        </div>
    )
}

export default RegisterUser