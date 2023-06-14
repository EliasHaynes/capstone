import React, {useState} from "react";     
import Table from 'react-bootstrap/Table';
import axios from "axios";
import {useSelector } from "react-redux";




function VinDecodeMore() {

  // const [data,setData] = useState([])

    const mileage = useSelector(state => state.mileage)
    const vin = useSelector(state => state.vin)

  //   const handleClick = () => {
  //     const fetchVehicleData = async () => {
  //       try {

  //         const response = await axios.get(`http://api.carmd.com/v3.0/decode?vin=${vin}`)
  //         setData(response.data)
  //       } catch (error) {
  //           console.log(error)
  //       }
        
  //     }
  //     fetchVehicleData()
  //   }

    return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th colSpan={2}>Technical Specification</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Engine Spec 1:</td>
          <td>Engine Spec 2:</td>
        </tr>
        <tr>
          <td>Spec Desc</td>
          <td>Spec Desc</td>

        </tr>

      </tbody>
    </Table>
  );
}

export default VinDecodeMore;