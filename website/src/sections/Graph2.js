import React from 'react'
import './Graph2.css'
import {RadarChart} from "./components/RadarChart";

const Graph2 = () => {
  return (
    <div className='graph2' id='graph2'>
      <h1>{"Taste Atlas of Coffee"}</h1>
        <div className='main-radar'>
            <RadarChart/>
        </div>

    </div>
  )
}

export default Graph2