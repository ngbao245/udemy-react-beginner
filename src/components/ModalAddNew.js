import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ModalAddNew = (props) => {
  const { show, handleClose } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleSaveUser = () => {
    console.log(">>> check state: ", "name = ", name, "job = ", job);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <form>
              <div className="mb-3">
                <label htmlFor="inputName" className="form-label">
                  Name
                </label>
                <input
                  type="email"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  className="form-control"
                  id="inputName"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="InputJob" className="form-label">
                  Job
                </label>
                <input
                  type="text"
                  value={job}
                  onChange={(event) => {
                    setJob(event.target.value);
                  }}
                  className="form-control"
                  id="InputJob"
                />
              </div>
            </form>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddNew;
