import React from 'react';
import './Footer.css';

function Footer() {
  return (
      <div className='footer-container' id="footer">
          <h1>
              {"Creators"}
          </h1>
          <div className='container'>
              <div className='col-1'>
                  <h2>{"Elif Kurtay"}</h2>
                  <span className='line'></span>
                  <p>{"description"}</p>
              </div>
              <div className='col-2'>
                  <h2>{"Burcu Ozer"}</h2>
                  <span className='line'></span>
                  <p>{"description"}</p>
              </div>
              <div className='col-3'>
                  <h2>{"Nikhen Sanjaya Nyo"}</h2>
                  <span className='line'></span>
                  <p>{"description"}</p>
              </div>
          </div>
      </div>
  );
}

export default Footer;