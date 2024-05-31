import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import axios from "axios";
import store from "../redux/store";

function AIModal({ args, cardID, cardDesc }) {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [aiResponse, storeAIResponse] = useState("");
  const [cardDescription, setCardDesc] = useState("");

  console.log("work?")
  const toggle = () => setModal(!modal);

  const handleClick = () => {
    setCardDesc(cardDesc)
  }

  const getAIResponse = async () => {
    try {
      console.log("card desc:", cardDesc); 
      const response = await axios.post(`https://capstone-ten-lyart.vercel.app/aiModal`, {
        cardDesc: cardDesc,
      });
      console.log("response:", response.data);
      storeAIResponse(response.data);
      setLoading(false);

    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <AutoAwesomeIcon
        className="ai-icon"
        onClick={() => {
          toggle();
          handleClick();
          getAIResponse(); // You don't need to pass cardDescription here
        }}
      ></AutoAwesomeIcon>

      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>{cardDescription}</ModalHeader>
        <ModalBody>{loading ? "Loading AI Response..." : aiResponse}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

// List of things AI can inform user of:
// 1. Typical lifespan and service intervals of parts
// 2. What a part does and why its important
// 3.

export default AIModal;
