import React from 'react';
import Nav from './Nav';

function About(){
    return(
        <main>
            <Nav />
          <h1 className='about'>About Us</h1>   
        <section>
            <h2 style={{color:"blue",fontFamily:"initial"}}>Values</h2>
            <p style={{fontFamily:"cursive"}}>Our value system defines us, and acts as an anchor when we are faced with challenges. 
                 We have a culture of customer focus, continuous improvement and customer service.</p>
             <br/>    <div>
        <h3>Our relationship with people we serve:</h3><br/>
        <ul style={{fontFamily:"cursive"}}>
            <li>The patient always comes first. We are dedicated to patient care.</li>
            <li>We treat each person with respect and dignity.</li>
            <li>We believe that patients deserve to have timely access to health care and that our systems should reflect this value.</li>
            <li>We are compassionate listeners. We hear the issues of our patients, respect them, and do everything in our power to help.</li>
        </ul>
        </div>
    </section>
   
        <div>
             <div className="services">
                <div className="service-one">
                <p className="service-icon"><i className="fa fa-users" /></p>
                <p className="service-title">Customer Focus</p>
                <p>Listening to the customers, and rapidly evolving the product helps MedWeb not only meet the customer expectations but also lead the market in terms of product features.</p>
                </div>
                <div className="service-two">
                <p className="service-icon"><i className="fas fa-chart-line" /></p>
                <p className="service-title">Continuous Improvement</p>
                <p>We believe quality is a journey and we are constantly striving to provide the features that just works for our customers</p>
            
                </div>
                <div className="service-three">
                <p className="service-icon"><i className="fas fa-headset" /></p>
                <p className="service-title">Customer Service</p>
                <p>Our focus on customer service makes our customers not only happy but also enthusiastically refer to other customers.</p>
              
          </div>
        </div>

            </div>
            
</main>
    )
    ;
}

export default  About;