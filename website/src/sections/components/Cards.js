import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards' id="cards">
      <h1>{"Title"}</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              text={"sustainability"}
              label='Sustainability'
              path='/services'
            />
            <CardItem
              text={"corporate"}
              label='Corporate'
              path='/services'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;