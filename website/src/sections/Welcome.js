import React from 'react';
import '../App.css';
import './Welcome.css';

function Welcome() {
  return (
    <div className='hero-container' id="hero">
      <h1>{"Coffee BEaN"}</h1>
      <p>{"sub explanation"}</p>
      <div className='hero-sub'>{"description"}</div>
    </div>
  );
}

export default Welcome;