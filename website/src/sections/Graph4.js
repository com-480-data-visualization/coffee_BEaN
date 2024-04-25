import React, { useEffect } from 'react'
import './Graph4.css'
import Plotly from 'plotly.js/dist/plotly'
import CodersData from '../data/codersData.json'

const Graph4 = () => {
  useEffect(()=>{
    const dataArray = Object.values(CodersData.CodingHours)
    dataArray.forEach(value => console.log(value));
    var layout= {
      plot_bgcolor:"bisque",
      paper_bgcolor:"bisque"
    }
    var data = [
      {
          type: 'parcoords',
          line: {
              color: 'blue'
          },
          dimensions: [
              {
                  range: [1, 10],
                  label: 'Coding Hours',
                  values: Object.values(CodersData.CodingHours)
              },
              {
                  range: [1, 10],
                  label: 'Coffee Cups Per Day',
                  values: Object.values(CodersData.CoffeeCupsPerDay)
              },
              {
                  range: [1, 5],
                  label: 'Coffee Time',
                  values: Object.values(CodersData.CoffeeTime)
              },
              {
                  range: [1, 5],
                  label: 'Coding Without Coffee',
                  values: Object.values(CodersData.CodingWithoutCoffee)
              },
              {
                  range: [1, 10],
                  label: 'Coffee Solve Bugs',
                  values: Object.values(CodersData.CoffeeSolveBugs)
              },
              {
                  range: [1, 10],
                  label: 'Gender',
                  values: Object.values(CodersData.Gender)
              },
              {
                  range: [1, 10],
                  label: 'Age Range',
                  values: Object.values(CodersData.AgeRange)
              },
              {
                  range: [1, 10],
                  label: 'Cluster',
                  values: Object.values(CodersData.Cluster)
              }
          ]
      }
  ];
  
  Plotly.newPlot('ParallelCoordinatesGraph', data, layout);
  })
  return (
    <div className='graph4' id='graph4'>
      <h1>Parallel Coordinates Graph</h1>
      <div id = "ParallelCoordinatesGraph"></div>
    </div>
  )
}

export default Graph4