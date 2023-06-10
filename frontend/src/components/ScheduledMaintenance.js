import React, {useState, useEffect} from "react";
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useAuth0 } from "@auth0/auth0-react";
import '../index.css';

function ScheduledMaintenance(props) {
    const {
        isAuthenticated,
        getAccessTokenSilently
      } = useAuth0()

      const [repairs, setRepairs] = useState([])

      useEffect(() => {
        const fetchRepairData = async () => {
            try {
                const token = await getAccessTokenSilently();
                const response = await axios.get('http://localhost:5000/repair', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setRepairs(response.data)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchRepairData()
      },[])

      return (
        <div style={{  display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around', alignItems: 'center'}}>
            {repairs.map((rep,idx) => (
                <Card style={{ width: '18rem'}} key={idx}>
                    <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                    <Card.Body>
                        <Card.Title>Mileage: {rep.mileage}</Card.Title>
                        <Card.Text>
                        Maintenance: {rep.maintenance}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Material: {rep.material}</ListGroup.Item>
                        <ListGroup.Item>Other: {rep.other}</ListGroup.Item>
                        <ListGroup.Item>Labor: {rep.labor}</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                </Card>
            ))}
        </div>
      )

}

export default ScheduledMaintenance









//Steps:
    //1: 