import { Container } from "react-bootstrap";
import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import ModalAddNew from "./components/ModalAddNew";
import { useState } from "react";

function App() {
  const [isShowModelAddNew, setIsShowModelAddNew] = useState(false);

  const handleClose = () => {
    setIsShowModelAddNew(false);
  };

  return (
    <div className="app-container">
      <Header />
      <Container>
        <div className="my-3 add-new">
          <span>
            <b>List Users:</b>
          </span>
          <button
            className="btn btn-success"
            onClick={() => setIsShowModelAddNew(true)}
          >
            Add new user
          </button>
        </div>
        <TableUsers />
      </Container>

      <ModalAddNew show={isShowModelAddNew} handleClose={handleClose} />
    </div>
  );
}

export default App;
