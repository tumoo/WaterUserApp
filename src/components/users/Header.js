import React, {useState,Fragment,useEffect} from  'react';
import { Link } from "react-router-dom";
import { useSearch } from '../users/SearchContext';

export  default function Header({cartItemCount}){  

    const [username, setUserName] = useState("");

    const { searchTerm, setSearchTerm } = useSearch();

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };

    useEffect(() => {
      setUserName(localStorage.getItem("username"));
    }, []);
  
    const logout = (e) => {
      e.preventDefault();
      localStorage.removeItem("username");
      window.location.href = "/";
    };
  
    return (
      <Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor:'lightblue' }}>
          <a className="navbar-brand" href="#">
            Water System
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
  
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">           
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  My Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/myorders" className="nav-link">
                  My Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/stores" className="nav-link">
                  Water Refill Stores
                </Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0 mr-3 rounded-pill">
            <input
                 className="form-control mr-sm-2 rounded-pill"
                 type="search"
                 placeholder="Search"
                 aria-label="Search"
                 value={searchTerm}
                 onChange={handleSearchChange}
            />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
            <div className="nav-item">
              <Link to="/cart"  className="nav-link active d-flex align-items-center" >
                  <img
                   src="../carticon.png"
                   alt="Cart Logo"
                   style={{ width: '30px', height: '30px'}}
                 />
                {cartItemCount > 0 && (
                <span className="badge badge-danger position-absolute" style={{right: '312px', backgroundColor: 'red', borderRadius: '50%', padding: '3px 5px', color: 'white',top: '10px'}}>
                  {cartItemCount}
                </span>
              )}
              </Link>
            </div>
            <div className="nav-item">
              <Link to="/dashboard"  className="nav-link active d-flex align-items-center" >
                  <img
                   src="../loggedinicon.jpg"
                   alt="User Logo"
                   className="rounded-circle mr-2"
                   style={{ width: '30px', height: '30px'}}
                 /> <span className="sr-only">current</span>
                   {username} 
                  </Link>
            </div>
            <form className="form-inline my-2 my-lg-0">
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
                onClick={(e) => logout(e)}
              >
                Logout
              </button>
            </form>
          </div>
        </nav>
      </Fragment>
    );
}