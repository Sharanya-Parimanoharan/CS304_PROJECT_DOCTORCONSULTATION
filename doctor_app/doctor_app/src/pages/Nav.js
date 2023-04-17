import React from 'react';

function Nav() {
 // render() {
    return (
      <nav className='nav'>
          <ul className='ul'>
              <li className="logo" style={{fontFamily:"serif"}}>MedWeb</li>
          </ul>
          <ul className='ul'>
              <li><a href="/about">About us</a></li>
              
              <li><a href="/login">Sign-In</a></li>
              <li><a href="/UserProfile">Sign-Up</a></li>
          </ul>
      </nav>
    );
 // }
}

export default Nav;