import React from 'react';
import { useNavigate } from 'react-router-dom';

function Main()  {
  const navigate=useNavigate();
 // render() {
    return (
      <main>
       
     
        <section className="intro">
            <h2>MedWeb</h2>
            <div>
             <p>Founded in 2023, MedWeb is an on-demand, digital primary healthcare platform which makes appointment booking
               task easier that can be availed from the comfort of home, office, or even a spa.
               Driven by the passion to provide care,impelled with an unwavering focus on quality, MedWeb’s endeavour has always been to make
                good health more accessible, reliable and hassle-free to all. With the help of MedWeb, users can 
                instantly book appointments online - all through the tap or click of a button.</p>
            </div>
        </section>

        <div>
             <div className="services">
                <div className="service-one">
                <p className="service-icon"><i className="far fa-calendar-alt" /></p>
                <p className="service-title">Appointment</p>
                <p>Book your Appointment without any hurdles <br /><br/>It’s flexible for you to schedule your appointment at any time that’s convenient for you. Waiting on hold or in line at the doctor’s office is not necessary</p>
                </div>
                <div className="service-two">
                <p className="service-icon"><i className="fa fa-user-md" /></p>
                <p className="service-title">Search Doctor</p>
                <p>Search for your desired doctors</p>
            
                </div>
                <div className="service-three">
                <p className="service-icon"><i className="far fa-calendar-check" /></p>
                <p className="service-title">Check Availability</p>
                <p >Check available slots for Booking</p>
              
          </div>
        </div>

            </div>


        
        <div className="gallery">
         <div className="gallery-item-one" />
         <div style={{float:'right'}}/>
         <h3 className='find'><button className="button" onClick={()=>{navigate("/check")}}>Find Doctors</button></h3>

         {/* <div className="gallery-item-four"></div>
         <div className="gallery-item-five"></div>
         <div className="gallery-item-six"></div> */}
         
        </div>

        <section>
            <h2 style={{fontWeight:"bolder"}}>Our Mission</h2>
            <div>
              <p> To provide patient-centered healthcare with excellence in quality, service, and access.</p>
        </div>
        </section>


        {/* <section>
            <h2>Contact Us</h2>
            <Form />
          
        </section> */}

       
      </main>
    );
//  }
}

export default Main;