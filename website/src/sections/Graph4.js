import React, { useEffect } from 'react'
import './Graph4.css'
import Plotly from 'plotly.js/dist/plotly'
import CodersData from '../data/codersData.json'

const Graph4 = () => {
  useEffect(()=>{
    var layout= {
      plot_bgcolor:"white",
      paper_bgcolor:"white"
    }
    var data = [
      {
          type: 'parcoords',
          line: {
              showscale: false,
              colorscale: 'Jet',
              cmin: 0,
              cmax: 4,
              color: Object.values(CodersData.Cluster)
          },
          dimensions: [
              {
                  range: [0, 4],
                  label: 'Groups',
                  ticktext: ["Dark Blue", 'Light Blue', 'Green', 'Orange', 'Dark Red'],
                  values: Object.values(CodersData.Cluster)
              },
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
          <h1>Coders and Coffee</h1>
          <p>{"Having a cup of coffee by your side when you dive into some complicated code is part of a habit. " +
              "It’s almost like a trigger for us when we are pondering a complicated problem: " +
              "as soon as we sit down with a cup of coffee in hand, the ideas will start flowing! " +
              "Apparently, it is not so different for many other coders. Here, we have gathered some information from coders " +
              "and their habits with coffee. "}
              <br/>
              <br/>
              {"Feel free to choose a range of values in each column to see who has similar habits with you! " +
                  "You can also move around the columns!"}
          </p>
          <div style={{width: '90%'}} id="ParallelCoordinatesGraph"></div>
          <div className="clusters">
              <p style={{width: '90%'}}>
                  <span style={{fontWeight: 'bolder', color: 'darkblue'}}>{"Coding Joe/Jane"}</span>
                  <br/>
                  <br/>
                  {"33% of people is in this group which is the biggest of the groups. They are most common coffee drinkers in coding. They drink coffee while they are coding and before " +
                      "coding. They are mostly 18 to 29 years old."}
              </p>
              <p style={{width: '90%'}}>
                  <span style={{fontWeight: 'bolder', color: 'lightblue'}}>{"Enough Sleep Coder"}</span>
                  <br/>
                  <br/>
                  {"20% is in this group. They do not drink coffee so much, less than 3 cups per day, most of them drink only one cup per day. " +
                      "Most of them like Nescafe. Most of them are either 18 to 29 years old or 30 to 39 years old."}
              </p>
              <p style={{width: '90%'}}>
                  <span style={{fontWeight: 'bolder', color: 'lightgreen'}}>{"Under-represented Coders"}</span>
                  <br/>
                  <br/>
                  {"17% is in this group. They are mainly occupied by female. They do not drink coffee so much, less than 3 cups per day, most of " +
                      "them drink two cups per day. Most of them like American coffee or Nescafe. Most of them are 18 to 29 years old."}
              </p>
              <p style={{width: '90%'}}>
                  <span style={{fontWeight: 'bolder', color: 'orange'}}>{"Coffee-Powered Coder"}</span>
                  <br/>
                  <br/>
                  {"11% is in this group. They are coding for long hours and drink coffee too much, most of them drink more than 4 cups per day. " +
                      "And they drink coffee not only while they are coding but also all the time. Most of them are 18 to 29 years old."}
              </p>
              <p style={{width: '90%'}}>
                  <span style={{fontWeight: 'bolder', color: 'darkred'}}>{"Veteran Coder"}</span>
                  <br/>
                  <br/>
                  {"19% is in this group. They are over 40 years old. Most of them drink coffee while they are coding, 2 to 4 cups per day. " +
                      "About half of them like Turkish coffee. (The coders who input their ideas in this data are mainly from Middle East.)"}
              </p>
          </div>
      </div>
  )
}

export default Graph4