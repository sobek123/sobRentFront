import Modal from 'react-bootstrap/Modal';


export function SalesModal(props){
    return (
        
        <Modal
          {...props}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {props.header}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {props.text}
          </Modal.Body>
        </Modal>
      );
  }