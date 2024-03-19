import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import img from "./images/x-lg.svg";

function Signin({ setShowSignup }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [formVisible, setFormVisible] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await axios.post("https://cinemaapi.onrender.com/signup", formData);
      setShowSignup(false);
      setSuccess(true);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError(
          "User already exists. Please choose a different username or email."
        );
        setTimeout(() => {
          setError("");
        }, 2000);
      } else {
        setSuccess(true);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCrossbtn = () => {
    setFormVisible(false);
    setTimeout(() => {
      setShowSignup(false);
    }, 100);
  };

  return (
    <div>
      {formVisible && (
        <div>
          <img
            src={img}
            alt=""
            className="crossimage"
            onClick={handleCrossbtn}
          />
          <Form onSubmit={handleSubmit} method="post" className="signupForm">
            <Form.Group className="mb-3" controlId="formBasicname">
              <Form.Label style={{ fontSize: "20px" }}>Username</Form.Label>
              <input
                type="text"
                name="name"
                placeholder="Enter Username"
                className="signinInputs"
                value={formData.name}
                onChange={handleChange}
                autoComplete="none"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ fontSize: "20px" }}>Email</Form.Label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="signinInputs"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label style={{ fontSize: "20px" }}>Password</Form.Label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="signinInputs"
                value={formData.password}
                onChange={handleChange}
                autoComplete="none"
                required
              />
            </Form.Group>

            <Button
              className="fs-4"
              variant="none"
              type="submit"
              disabled={submitting}
              style={{ position: "absolute", top: "120%", left: "35%" }}
            >
              {submitting ? (
                <div
                  className="spinner-border text-light"
                  role="status"
                  style={{ height: 35, width: 35 }}
                >
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Signup"
              )}
            </Button>
          </Form>
          {error && (
            <Alert
              variant="danger"
              style={{ marginTop: "-50px", transition: "none" }}
            >
              {error}
            </Alert>
          )}
          {success && (
            <Alert
              variant="success"
              style={{ marginTop: "-50px", transition: "none" }}
            >
              Signup successful! Go back & Please login.
            </Alert>
          )}
        </div>
      )}
    </div>
  );
}

export default Signin;
