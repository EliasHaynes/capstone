import React,{useState,useEffect} from "react";
import Alert from "@mui/material/Alert";

const AlertTrigger = ({ alertType, alertMessage }) => {

    const [alert,sendAlert] = useState(false)
    useEffect(() => {
      const timer = setTimeout(() => {
        sendAlert(false); // You need to ensure `sendAlert` can be called here, possibly via props
      }, 8000);
      return () => clearTimeout(timer);
    }, [alertType, alertMessage]);
  
    return (
      <Alert variant="filled" severity={alertType}>
        {alertMessage}
      </Alert>
    );
  };

  export default AlertTrigger;
  