import React, {useState} from "react"
import axios from 'axios'
import {useSelector } from "react-redux";
import VinDecodeMore from "./VinDecodeMore";

function VinDecode(props) {

    const mileage = useSelector(state => state.mileage)
    const vin = useSelector(state => state.vin)
    
    return (
        <div>
            <p>Image of Car here</p>
            <div>
                <h2>Year + Make + Model</h2>
            </div>
            <div>
                <span>Engine |</span> <span>Trim |</span> <span>Transmission |</span>
            </div>
            <button >Full Details</button>
            {/* Map this component for each vin decode more */}
            <div style={{width: "50%", display: "flex", alignItems: "center"}}>
                <VinDecodeMore ></VinDecodeMore>
            </div>
        </div>
    )
}

export default VinDecode;