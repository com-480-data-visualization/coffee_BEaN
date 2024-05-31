import React, { useEffect } from 'react'
import './Graph3.css'
import useScript from './useScript';
import {pyramidBuilder} from "./components/popPyramid.js"
import mainPopulationPyramidData from "../data/mainPopulationPyramid.json"
import coffee_drinking_data from "../data/Coffee_Drinking_Locations_Office.json"
const Graph3 = () => {
  const getHoverText = (ageGroup, gender) => {

    const data = coffee_drinking_data.find(item => item.Gender === gender && item.Age.includes(ageGroup));
    return data ? `
      Most Common Monthly Coffee Expenditure: ${data['Most Common Monthly Coffee Expenditure'] || "N/A"}<br>
      Most Common Daily Coffee Cups Consumed: ${data['Most Common Daily Coffee Cups Consumed'] || "N/A"}<br>
      Most Common Highest Price they are willing to Pay: ${data['Most Common Highest Price they are willing to Pay'] || "N/A"}
    ` : 'No data available';
  };

  useScript(
    'https://cdn.zingchart.com/zingchart.min.js', 
    ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"],
    () => {
    // ZingChart configuration
    const chartConfig = {
      type: 'pop-pyramid',
      globals: {
        fontSize: '14px'
      },
      title: {
        text: 'Population Pyramid by Age Group',
        fontSize: '24px'
      },
      options: {
        // values can be: 'bar', 'hbar', 'area', 'varea', 'line', 'vline'
        aspect: 'hbar'
      },
      legend: {
        shared: true
      },
      plot: {
        // hoverstate
        tooltip: {
          padding: '10px 15px',
          borderRadius: '3px',
          htmlMode: true,
          text:
          "Most Common Daily Cups of Coffee:%data-commonDailyCups \n Most Common Monthly Coffee Expenditure:%data-commonMonthlyExpenditure \nMost Common Highest Price they are willing to Pay: %data-commonHighestWillingPrice",
          thousandsSeparator: ','
        },
        valueBox: {
          color: '#fff',
          placement: 'top-in',
          thousandsSeparator: ','
        },
        animation: {
          effect: 'ANIMATION_EXPAND_BOTTOM',
          method: 'ANIMATION_STRONG_EASE_OUT',
          sequence: 'ANIMATION_BY_NODE',
          speed: 222
        }
      },
      scaleX: {
        label: {
          text: 'Age Groups'
        },
        labels: ['<18', '18-24', '25-34', '35-44', '45-54', '55-64', '>65'],
      },
      scaleY: {
        label: {
          text: 'Population'
        }
      },
      series: [{
          text: 'Male',
          values: coffee_drinking_data.filter((dictionary) => dictionary.Gender == 'Male').map((dictionary)=>dictionary.Count),
          "data-commonDailyCups": coffee_drinking_data.filter((dictionary) => dictionary.Gender == 'Male').map((dictionary)=> dictionary['Most Common Daily Coffee Cups Consumed']),
          "data-commonMonthlyExpenditure": coffee_drinking_data.filter((dictionary) => dictionary.Gender == 'Male').map((dictionary)=> dictionary['Most Common Monthly Coffee Expenditure']),
          "data-commonHighestWillingPrice": coffee_drinking_data.filter((dictionary) => dictionary.Gender == 'Male').map((dictionary)=> dictionary['Most Common Highest Price they are willing to Pay']),
          backgroundColor: '#4682b4',
          dataSide: 1
        },
        {
          text: 'Female',
          values: coffee_drinking_data.filter((dictionary) => dictionary.Gender == 'Female').map((dictionary)=>dictionary.Count),
          "data-commonDailyCups": coffee_drinking_data.filter((dictionary) => dictionary.Gender == 'Female').map((dictionary)=> dictionary['Most Common Daily Coffee Cups Consumed']),
          "data-commonMonthlyExpenditure": coffee_drinking_data.filter((dictionary) => dictionary.Gender == 'Female').map((dictionary)=> dictionary['Most Common Monthly Coffee Expenditure']),
          "data-commonHighestWillingPrice": coffee_drinking_data.filter((dictionary) => dictionary.Gender == 'Female').map((dictionary)=> dictionary['Most Common Highest Price they are willing to Pay']),
          backgroundColor: '#ee7988',
          dataSide: 2
        }
      ]
    };

    // Render the ZingChart
    window.zingchart.render({
      id: 'graph3',
      data: chartConfig,
      height: '100%',
      width: '100%',
    });
  }, []);

  return (
    <div className="graph3">
      <h1>Demographics of Coffee Drinkers</h1>
      <div className ="chart--container" id="graph3"></div>
    </div>
  );
};

export default Graph3