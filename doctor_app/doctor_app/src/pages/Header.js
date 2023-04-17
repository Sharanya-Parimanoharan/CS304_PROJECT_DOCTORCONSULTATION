import React from 'react';
import Nav from "./Nav";

function Header() {
 // render() {
    return (
     
      <header className='header'>
      <Nav/>
        <div className="head">
            <h1 style={{fontFamily:"serif" ,color:"white"}}>We Care and <br/>Treat with love</h1>
            <div>
              <p style={{color:"burlywood" ,fontWeight:"bolder"}}><h3 style={{color:"AppWorkspace"}}>We are here for you </h3><br/>Health is the first step to prosperity <br/>Simplify the way to book Doctor Appointment</p>
              
              
              <div><a className="contact" href='/UserProfile'>Register</a></div>
        </div>
        </div>
       
      </header>
      
    );
  
}

export default Header;