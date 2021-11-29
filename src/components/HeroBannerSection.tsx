import React, { FC } from 'react'
import Typewriter from 'typewriter-effect';


 const HeroBannerSection:FC = () => {
    return (
        <div className="hero-banner" style={{}}>          
          <div>
            <h1><span>Finally! </span><br /> The all-in-one place <br /> to track your <br /> 
            <Typewriter
              options={{
                strings: ['crypto payments', 'client invoices', 'transaction reports'],
                autoStart: true,
                loop: true,
              }}
            />
            </h1>
            <p>Think intuit for crypto</p>
            {/* <button>Start</button> */}
          </div>
          <div>
            <img src="/surr-465.png" alt="" height="" width="600"/>
          </div>
        </div>
    )
}
export default HeroBannerSection;