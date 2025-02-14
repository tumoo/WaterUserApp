import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {baseUrl} from './constants';
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    debugger;
    let error = '';
    if(email === '')
    error = error + 'Email ,';

    if(password === '')
    error = error + 'Password ';
    
    if(error.length > 0)
    {
      error = error + ' can not be blank';
      alert(error);
      return;
    }

    e.preventDefault();
    const data = {
      Email: email,
      Password: password,
    };
    const url = `${baseUrl}/api/User/login`;
    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        if (dt.statusCode === 200) {
          if (email === "admin" && password === "admin") {
            localStorage.setItem("username", email);
            window.location.href = "/admindashboard";
          } else {
            localStorage.setItem("username", email);
            //localStorage.setItem("username", dt.registration.name);
            window.location.href = "/stores";
          }
        }
        else
        {
          alert(dt.statusMessage);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
          <h3>Water System Login</h3>
        </div>

        <section className="vh-100">
          <div className="container py-5 h-100">
            <div className="row d-flex align-items-center justify-content-center h-100">
              <div className="col-md-8 col-lg-7 col-xl-6">
                <img
                  src="../Water-Image-Logo.jpeg"
                  className="img-fluid"
                  alt="Phone image"
                />
              </div>
              <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                <form>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form1Example13"
                      className="form-control form-control-lg"
                      onChange={(e)=> setEmail(e.target.value)}
                      value={email}
                      placeholder="Enter Email"
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form1Example23"
                      className="form-control form-control-lg"
                      onChange={(e)=> setPassword(e.target.value)}
                                value={password}
                                placeholder="Enter Password"
                    />
                  </div>

                  <div className="d-flex justify-content-around align-items-center mb-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="form1Example3"
                        checked
                      />
                      <label className="form-check-label" for="form1Example3">
                        {" "}
                        Remember me{" "}
                      </label>
                    </div>
                    <a href="#!">Forgot password?</a>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                    onClick={(e)=> handleLogin(e)}
                  >
                    Sign in
                  </button>
                  <Link to="/Registration" className="btn btn-info btn-lg btn-block">                   
                      Registration
                  </Link>                         
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      
         {/* Footer Component */}
         <footer style={{ backgroundColor:"lightblue", padding: "20px", marginTop: "20px", borderRadius: "0 0 11px 11px", width:"100%"}}>
          <div className="container text-center">
            <p>Connect with us on social media!</p>
            <div>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px", color: "#3b5998" }}>
                <i className="fab fa-facebook fa-2x"></i>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px", color: "#e4405f" }}>
                <i className="fab fa-instagram fa-2x"></i>
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px", color: "#55acee" }}>
                <i className="fab fa-twitter fa-2x"></i>
              </a>
            </div>
          </div>
        </footer>
    </Fragment>
  );
}
