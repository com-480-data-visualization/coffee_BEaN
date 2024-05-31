import React from 'react';
import '../App.css';
import './Welcome.css';

function Welcome() {
  return (
    <div className='hero-container' id="hero">
        <div className='content'>
            <h1>{"Welcome to Coffee Beans!"}</h1>
            <p>{"As three dedicated programmers, we often found ourselves fueled by countless cups of coffee while coding during midnight. Those late-night coding sessions, filled with the rich aroma of our favourite brews, sparked a deeper appreciation for the beverage that kept us going. We started to wonder about the diverse world of coffee, its widespread popularity, and its special significance for people like us who rely on it to stay focused and inspired.\n"}</p>
            <div className='hero-sub'>
                {"COFFEE BEANS (checkout sections Map and Taste): Where do they grow? What are the varieties? How does different varieties taste like?..."}
                <br/>
                {"PEOPLE (checkout sections People and Coders): What is their coffee drink preference? How much coffee they consume daily?..."}
            </div>
        </div>
    </div>
  );
}

export default Welcome;