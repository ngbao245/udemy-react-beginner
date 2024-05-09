import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {

  const user = useSelector(state => state.user.account)

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  if (user && !user.auth) {
    return (
      <>
        <Alert variant="danger" dismissible className="mt-3">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            You don't have permission to access this service. Please{" "}
            <b role="button" onClick={() => handleClick()}>
              Log in
            </b>{" "}
            to access this service.
          </p>
        </Alert>
      </>
    );
  }

  return props.children;
};
export default PrivateRoute;
