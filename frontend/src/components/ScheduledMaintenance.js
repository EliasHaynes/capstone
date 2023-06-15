import React, {useState, useEffect} from "react";
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useAuth0 } from "@auth0/auth0-react";
import '../index.css';
import {useSelector } from "react-redux";
import MapScheduledMaintenance from "./MapScheduledMaintenance";

function ScheduledMaintenance(props) {
    const [open, toggleOpen] = useState(false)


      return (
        <div>
            <div>
                <button onClick={() => toggleOpen(true)}>Fetch Maintenace +-10,000 miles</button>
            </div>
            <div>
                {open && (
                    <MapScheduledMaintenance></MapScheduledMaintenance>
                )}
            </div>
        </div>
      )

}

export default ScheduledMaintenance









//Steps:
    //1: 