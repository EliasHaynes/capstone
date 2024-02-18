import React, {useState} from "react"
import axios from 'axios'
import {useSelector } from "react-redux";
import VinDecodeMore from "./VinDecodeMore";
import { useNavigate } from "react-router-dom";


function VinDecode(props) {
  const navigate = useNavigate()
    //State
  const [specs,setSpecs] = useState([])
  const [additionalSpecs, setAdditionalSpecs] = useState([])
  const [open, toggleOpen] = useState(false)
  const [display, toggleDisplay] = useState(false)
    //Redux
  const mileage = useSelector(state => state.mileage)
  const vin = useSelector(state => state.vin)
    //Env
    const token = process.env.REACT_APP_CAR_KEY
    const key = process.env.REACT_APP_API_KEY

  const handleClick = () => {
    const fetchVehicleData = async () => {
      try {
        const response = await axios.get(`http://api.carmd.com/v3.0/decode?vin=${vin}`, {
            headers: {
                authorization: token,
                "partner-token": key
            }
        })
        setSpecs(response.data.data)
        console.log(response.data.data)
      } catch (error) {
          console.log(error)
      }
      
    }
    fetchVehicleData()
  }

  const handleMoreInfoClick = () => {
    const fetchMoreVehicleData = async () => {
        try {

            const response = await axios.get(`http://api.carmd.com/v3.0/decode_more?vin=${vin}`)
            setAdditionalSpecs(response.additionalData)
            console.log(response.data)
        } catch (err) {
            console.log(err)
        }
    }
  }
    
    return (
        <div className="home">
            <button onClick={() => {
              handleClick();
              toggleDisplay(true)
               }}>Get Vehicle Data</button>
            {display && (
              <div>
                <img/>
                <div>
                    <h2>{specs.year} + {specs.make} + {specs.model}</h2>
                </div>
                <div>
                    <h5>Engine: {specs.engine}</h5> <h5>Trim: {specs.trim} </h5> <h5>Transmission: {specs.transmission} </h5>
                </div>
                {/* <button onClick={() => toggleOpen(true)}>Full Details</button> */}
                {/* Map this component for each vin decode more */}
                {/* {open && (
                  <div style={{width: "50%", display: "flex", alignItems: "center"}}>
                    <VinDecodeMore ></VinDecodeMore>
                    <button onClick={() => toggleOpen(false)}>Hide Details</button>
                </div>
                )} */}
                <button onClick={ () => navigate('/userMaintenace')}> View Scheduled Maintenance</button>
            </div>
            
                )}
        </div>
    )
}

export default VinDecode;