import Modal from 'react-bootstrap/Modal';
import { FaCheckCircle } from 'react-icons/fa';


export function Success(props){
    return (
        
        <Modal
          {...props}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <div style={{marginLeft: 'auto', marginRight: 'auto', textAlign:'center'}}>
            <FaCheckCircle size={40} color="green" ></FaCheckCircle>
            <br></br>
            <br></br>
            {props.text}
            </div>
          </Modal.Body>
        </Modal>
      );
  }