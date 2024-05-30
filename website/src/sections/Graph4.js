import React, { useEffect } from 'react'
import './Graph4.css'
import Plotly from 'plotly.js/dist/plotly'
import CodersData from '../data/codersData.json'

const Graph4 = () => {
  useEffect(()=>{
    var layout= {
      plot_bgcolor:"bisque",
      paper_bgcolor:"bisque"
    }
    var data = [
      {
          type: 'parcoords',
          line: {
              showscale: true,
              colorscale: 'Jet',
              cmin: 0,
              cmax: 4,
              color: Object.values(CodersData.Cluster)
          },
          dimensions: [
              {
                  range: [0, 10],
                  label: 'Coding Hours',
                  values: Object.values(CodersData.CodingHours)
              },
              {
                  range: [0, 10],
                  label: 'Coffee Cups Per Day',
                  values: Object.values(CodersData.CoffeeCupsPerDay)
              },
              {
                  label: 'Preferred Coffee Drink',
                  tickvals: [-1, 0, 1,2,3,4,5,6, 7],
                  ticktext: ["None", 'Caffè latte', 'Americano', 'Nescafe', 'Turkish',
                      'American Coffee', 'Espresso (Short Black)', 'Cappuccino',
                      'Double Espresso (Doppio)'],
                  values: Object.values(CodersData.CoffeeType)
              },
              {
                  label: 'Coffee Time',
                  tickvals: [0,1,2,3,4,5,6],
                  ticktext: ["No specific time", "In the morning", "Before coding", "While coding",  "After coding", "Before and while coding", "All the time"],
                  values: Object.values(CodersData.CoffeeTime)
              },
              {
                  label: 'Coding Without Coffee',
                  tickvals: [0,1,2],
                  ticktext: ["No", "Sometimes", "Yes"],
                  values: Object.values(CodersData.CodingWithoutCoffee)
              },
              {
                  label: 'Coffee Solve Bugs',
                  tickvals: [0,1,2],
                  ticktext: ["No", "Sometimes", "Yes"],
                  values: Object.values(CodersData.CoffeeSolveBugs)
              },
              {
                  label: 'Gender',
                  tickvals: [0,1],
                  ticktext: ["Male", "Female"],
                  values: Object.values(CodersData.Gender)
              },
              {
                  label: 'Age Range',
                  tickvals: [-1, 0,1,2,3,4],
                  ticktext: ["unknown", 'Under 18', '18 to 29', '30 to 39', '40 to 49', '50 to 59'],
                  values: Object.values(CodersData.AgeRange)
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