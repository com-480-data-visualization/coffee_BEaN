import React from 'react'
import './Graph.css'
import {WorldMap} from "./components/WorldMap";

const Graph = () => {
  return (
    <div className='graph' id='graph'>
      <h1>{"Coffee Producing Countries"}</h1>
      <div className='main-map'>
        <WorldMap
        />
      </div>
    </div>
  )
}

export default Graph