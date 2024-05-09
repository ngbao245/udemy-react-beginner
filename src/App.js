import { Container } from "react-bootstrap";
import "./App.scss";
import Header from "./components/Header";
import { Bounce, ToastContainer } from "react-toastify";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import AppRoutes from "./Routes/AppRoutes";
import { useSelector } from "react-redux";

function App() {
  const { user, loginContext } = useContext(UserContext);

  const dataUserRedux = useSelector((state) => state.user.account);
  console.log("test dataUserRedux");
  console.log(dataUserRedux);

  // console.log("check user app: ", user);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loginContext(
        localStorage.getItem("email"),
        localStorage.getItem("token")
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <AppRoutes />
        </Container>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
}

export default App;
