import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import axios from 'axios';


function AIModal({args, cardID, cardDesc}) {
    const [modal, setModal] = useState(false);
    const [loading,setLoading] = useState()
    const [aiResponse, storeAIResponse] = useState("")
    const [cardDescription, setCardDesc] = useState("")
  console.log("cardDesc:", cardDescription)
  
    const toggle = () => setModal(!modal);

    

    const getAIResponse = async () => {
      const handleClick = () => {
      setCardDesc(cardDesc);
    }
    handleClick()
      try {
        const response = await axios.get('http://localhost:5000/aiModal', {cardDescription});
        console.log("response:", response.data)
      } catch (e) {
        console.error(e);
      }
    }
  
    return (
      <div>
        <AutoAwesomeIcon className='ai-icon' onClick={() => {toggle(); getAIResponse();}}></AutoAwesomeIcon>
        <Modal isOpen={modal} toggle={toggle} {...args}>
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>
              Do Something
            </Button>{' '}
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
