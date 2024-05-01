import { Modal, Button } from "react-bootstrap";

const ModalConfirm = (props) => {
  const { show, handleClose, dataUserDelete } = props;

console.log(dataUserDelete.id)

  const confirmDelete = () => {
    console.log("helloWorld");
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            This action can't be undo! Do you want to delete this user? <br />
            <b>email = {dataUserDelete.email} </b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => confirmDelete()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConfirm;
