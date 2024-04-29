import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ModalEditUser = (props) => {
  const { show, handleClose, dataUserEdit } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleEditUser = () => {};

  useEffect(() => {
    if (show) {
        setName(dataUserEdit.first_name);
    }
  }, [dataUserEdit]);

  console.log(dataUserEdit);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit a user</Modal.Title>
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
          <Button variant="primary" onClick={() => handleEditUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditUser;
