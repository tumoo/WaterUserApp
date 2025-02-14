import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "./constants";
import axios from "axios";
import "../App.css"; // Import your CSS file

export default function Registration() {
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cellNumber, setCellNumber] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");

  const [errors, setErrors] = useState({}); // State for tracking errors

  const handleSave = (e) => {
    e.preventDefault();

    let error = {};
    if (firstName === "") error.firstName = true;
    if (lastname === "") error.lastname = true;
    if (email === "") error.email = true;
    if (password === "") error.password = true;
    if (confirmPassword === "") error.confirmPassword = true;
    if (password !== confirmPassword) error.passwordMismatch = true;
    if (streetAddress === "") error.streetAddress = true;
    if (cellNumber === "") error.cellNumber = true;

    if (Object.keys(error).length > 0) {
      setErrors(error);
      return;
    }

    const url = `${baseUrl}/api/User/Register`;
    const data = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      firstName: firstName,
      lastName: lastname,
      address: streetAddress,
      cellNumber: cellNumber,
    };

    axios
      .post(url, data)
      .then((result) => {
        clear();
        const dt = result.data;
        alert('User successfully created! A confirmation email has been sent');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clear = () => {
    setFirstName("");
    setEmail("");
    setLastname("");
    setPassword("");
    SetConfirmPassword("");
    setCellNumber("");
    setStreetAddress("");
    setErrors({});
  };

  return (
    <Fragment>
      <div
        style={{
          backgroundColor: "white",
          width: "80%",
          margin: "0 auto",
          borderRadius: "11px",
        }}
      >
        <div className="mt-4" style={{ margin: "0 auto", width: "430px" }}>
          <h3>Water App Registration</h3>
        </div>
        <section
          className="vh-100"
          style={{ backgroundColor: "white", padding: "7px" }}
        >
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div className="card text-black" style={{ borderRadius: "25px" }}>
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <form className="mx-1 mx-md-4">
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="text"
                                id="form3Example1c"
                                className={`form-control ${errors.firstName ? "error" : ""}`}
                                onChange={(e) => {
                                  setFirstName(e.target.value);
                                  setErrors({ ...errors, firstName: false });
                                }}
                                value={firstName}
                                placeholder="Enter First Name"
                              />
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="text"
                                id="form3Example1c"
                                className={`form-control ${errors.lastname ? "error" : ""}`}
                                onChange={(e) => {
                                  setLastname(e.target.value);
                                  setErrors({ ...errors, lastname: false });
                                }}
                                value={lastname}
                                placeholder="Enter Last Name"
                              />
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="text"
                                id="form3Example1c"
                                className={`form-control ${errors.cellNumber ? "error" : ""}`}
                                onChange={(e) => setCellNumber(e.target.value)}
                                value={cellNumber}
                                placeholder="Enter Cell Number"
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="text"
                                id="form3Example1c"
                                className={`form-control ${errors.streetAddress ? "error" : ""}`}
                                onChange={(e) => setStreetAddress(e.target.value)}
                                value={streetAddress}
                                placeholder="Enter Street Address"
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="email"
                                id="form3Example3c"
                                className={`form-control ${errors.email ? "error" : ""}`}
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                  setErrors({ ...errors, email: false });
                                }}
                                value={email}
                                placeholder="Enter Email"
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="password"
                                id="form3Example4c"
                                className={`form-control ${errors.password ? "error" : ""}`}
                                onChange={(e) => {
                                  setPassword(e.target.value);
                                  setErrors({ ...errors, password: false });
                                }}
                                value={password}
                                placeholder="Enter Password"
                              />
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="password"
                                id="form3Example4c"
                                className={`form-control ${errors.confirmPassword || errors.passwordMismatch ? "error" : ""}`}
                                onChange={(e) => {
                                  SetConfirmPassword(e.target.value);
                                  setErrors({ ...errors, confirmPassword: false, passwordMismatch: false });
                                }}
                                value={confirmPassword}
                                placeholder="Confirm Password"
                              />
                            </div>
                          </div>
                          {errors.passwordMismatch && (
                            <div className="text-danger mb-3">Passwords do not match.</div>
                          )}

                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button
                              type="button"
                              className="btn btn-primary btn-lg"
                              onClick={(e) => handleSave(e)}
                            >
                              Register
                            </button>
                            &nbsp;
                            <Link
                              to="/"
                              className="btn btn-info btn-lg btn-block"
                            >
                              Login
                            </Link>
                          </div>
                        </form>
                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img
                          src="../LoginBanner2.jpg"
                          className="img-fluid"
                          alt="Sample image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
}
