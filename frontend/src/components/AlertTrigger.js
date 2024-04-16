import React,{useState,useEffect} from "react";
import Alert from "@mui/material/Alert";

const AlertTrigger = ({ alertType, alertMessage }) => {

  
    return (
      <Alert variant="filled" severity={alertType}>
        {alertMessage}
      </Alert>
    );
  };

  export default AlertTrigger;
  