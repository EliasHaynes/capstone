import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import axios from "axios";

function AIModal({ cardID, cardDescs }) {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAIResponse] = useState("");

  console.log("card descs:",cardDescs)

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleIconClick = () => {
    if (!modal) {  // Only fetch data if the modal is not currently open
      fetchAIResponse(cardID);
    }
    toggleModal();
  };

  const fetchAIResponse = async (index) => {
    setLoading(true);
    const cardDesc = cardDescs[index]; // Get the description using cardID as index
    console.log("CARD DESC:", cardDesc)
    try {
      const response = await axios.post(`https://capstone-ten-lyart.vercel.app/aiModal`, {
        desc: cardDesc  // Send the description as part of the request body
      }, {
        headers: { "Content-Type": "application/json" }
      });
      setAIResponse(response.data);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setAIResponse("Failed to fetch AI data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AutoAwesomeIcon className="ai-icon" onClick={handleIconClick} />
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Details for: {cardDescs[cardID]}</ModalHeader>
        <ModalBody>
          {loading ? "Loading AI Response..." : aiResponse || "No AI response available."}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>Close</Button>
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AIModal;
