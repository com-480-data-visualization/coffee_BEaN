import React from 'react'
import './Graph2.css'
import {RadarChart as Chart} from "./components/RadarChart";
import {RadarChart} from "./components/COPYRadarChart";
import InteractiveRadarChart from "./components/InteractiveRadarChart";

const Graph2 = () => {
  return (
      <div className='graph2' id='graph2'>
          <h1>{"Taste Profile of Coffee"}</h1>
          <div className='main-radar'>
              <div className='col-1'>
                  <Chart
                      label="Gesha"
                      data={[8.5, 8.5, 7.92, 8.0, 7.92, 8.25]}
                      backgroundColor={'rgba(45,137,141,0.2)'}
                      borderColor={'rgb(92,218,241)'}
                  />
              </div>
              <div className='col-2'>
                  <Chart
                      label="Java"
                      data={[7.776667, 7.836667, 7.610000, 7.723333, 7.666667, 7.753333]}
                      backgroundColor={'rgba(255, 99, 132, 0.2)'}
                      borderColor={'rgba(255, 99, 132, 1)'}
                  />
              </div>
              <div className='col-3'>
                  <Chart
                      label="Castillo Paraguaycito"
                      data={[8.080000, 8.000000, 7.830000, 8.170000, 7.750000, 7.830000]}
                      backgroundColor={'rgba(206,149,83,0.2)'}
                      borderColor={'rgb(225,151,99)'}
                  />
              </div>
          </div>
          <InteractiveRadarChart/>
      </div>
  )
}

export default Graph2