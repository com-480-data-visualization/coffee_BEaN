import React from 'react'
import './Graph2.css'
import {RadarChart} from "./components/RadarChart";

const Graph2 = () => {
  return (
    <div className='graph2' id='graph2'>
      <h1>{"Taste Atlas of Coffee"}</h1>
        <div className='main-radar'>
            <div className='col-1'>
                <RadarChart/>
            </div>
            <div className='col-2'>
                <RadarChart/>
            </div>
            <div className='col-3'>
                <RadarChart/>
            </div>
        </div>

    </div>
  )
}

export default Graph2