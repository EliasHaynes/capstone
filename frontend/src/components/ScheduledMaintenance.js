import React, {useState, useEffect} from "react";
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useAuth0 } from "@auth0/auth0-react";
import '../index.css';
import {useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ScheduledMaintenance(props) {

    const navigate = useNavigate()

    const [repairs, setRepairs] = useState([])
    const [open, toggleOpen] = useState(false)
    const mileage = useSelector(state => state.mileage)
    const vin = useSelector(state => state.vin)
        //Env
    const token = process.env.REACT_APP_CAR_KEY
    const key = process.env.REACT_APP_API_KEY

    const handleClick = () => {
        const fetchVehicleData = async () => {
          try {

            const response = await axios.get(`http://api.carmd.com/v3.0/maint?vin=${vin}&mileage=${mileage}`, {
                headers: {
                    authorization: token,
                    "partner-token": key
                }
            })
            setRepairs(response.data.data)
            console.log(response.data.data)
          } catch (error) {
              console.log(error)
          }
        }
        fetchVehicleData()
      }


      return (
        <div>
            <div>
                <button
                onClick={() => {
                    toggleOpen(true)
                    handleClick()
                    }}>Fetch Maintenace +-10,000 miles</button>
            </div>
            <div>
                {open && (
                    <div style={{  display: 'flex', flexFlow: "row", justifyContent: 'space-around'}}>
                        
                    <div>
                        <button onClick={() => navigate('/repair')}>View Repair Log</button>
                            {repairs.map((rep,idx) => (
        
                                <Card style={{ width: '18rem'}} key={idx}>
                                    <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                                    <Card.Body>
                                    <Card.Title>Repair Desc: {rep.desc}</Card.Title>
                                    <Card.Text>
                                        Due Mileage: {rep.due_mileage}
                                        </Card.Text>
                                    </Card.Body>
        
                                    <ListGroup className="list-group-flush">
                                        Repair Stats
                                        <ListGroup.Item>Repair Difficulty: {rep.repair.repair_difficulty}</ListGroup.Item>
                                        <ListGroup.Item>Labor Rate: {rep.repair.labor_rate_per_hour}</ListGroup.Item>
                                        <ListGroup.Item>Part Cost: {rep.repair.part_cost}</ListGroup.Item>
                                        <ListGroup.Item>Total Cost: {rep.repair.total_cost} </ListGroup.Item>
                                    </ListGroup>
        
                                    {rep.parts && (
                                        <div>
                                            Parts
                                        {rep.parts.map((part,ind) => (
                                            
                                            <ListGroup className="list-group-flush" key={ind}>
                                            
                                                <ListGroup.Item>Part Desc: {part.desc} </ListGroup.Item>
                                                <ListGroup.Item>Part Price: {part.price}</ListGroup.Item>
                                                <ListGroup.Item>Part Qty: {part.qty}</ListGroup.Item>
                                            </ListGroup>  
                                        ))}
                                        </div>
                                    )}
        
                                    <Card.Body>
        
                                    </Card.Body>
                                </Card>
                            ))}
                        
                    </div>
                </div>
                )}
            </div>
        </div>
      )

}

export default ScheduledMaintenance









//Steps:
    //1: 