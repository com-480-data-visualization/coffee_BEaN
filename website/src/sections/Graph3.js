import React, { useState, useEffect } from 'react'
import './Graph3.css'
import Select from 'react-select';
import useScript from './useScript';
import filtered_population_data from "../data/filtered_population_pyramids_data.json"
import overall_population_data from "../data/overall_population_data.json"
const Graph3 = () => {

  const populationFilterToCategories = filtered_population_data.reduce((acc, item) => {
    if (!acc[item["Population Filter"]]) {
      acc[item["Population Filter"]] = new Set();
    }
    acc[item["Population Filter"]].add(item["Category"]);
    return acc;
  }, {});

  const populationFilterToCategoriesList = Object.keys(populationFilterToCategories).reduce((acc, key) => {
    acc[key] = Array.from(populationFilterToCategories[key]);
    return acc;
  }, {});

  const filterOptions = [
    { value: '', label: 'Overall Population' },
    ...Object.keys(populationFilterToCategoriesList).map(filter => ({
      value: filter,
      label: filter
    }))
  ];

  const [currentFilter, setCurrentFilter] = useState('');
  const [currentCategory, setCurrentCategory] = useState('Overall Population');
  const [categories, setCategories] = useState([]);
  const [currentCategoryData, setCurrentCategoryData] = useState(overall_population_data);

  const handleFilterChange = selectedOption => {
    const filter = selectedOption ? selectedOption.value : '';
    setCurrentFilter(filter);
    const newCategories = populationFilterToCategoriesList[filter] || [];
    setCategories(newCategories);
    setCurrentCategory(newCategories.length > 0 ? newCategories[0] : 'Overall Population');
    if (!filter) {
      setCurrentCategoryData(overall_population_data);
    }
  };

  const handleCategoryChange = e => {
    setCurrentCategory(categories[e.target.value]);
  };

  useEffect(() => {
    if (currentFilter && currentCategory !== 'Overall Population') {
      const data = filtered_population_data
        .filter(item => item["Population Filter"] === currentFilter && item["Category"] === currentCategory)
        .flatMap(item => item.Data);
      setCurrentCategoryData(data);
    } else {
      setCurrentCategoryData(overall_population_data);
    }
  }, [currentCategory, currentFilter]);

  const getHoverText = (ageGroup, gender) => {

    const data = currentCategoryData.find(item => item.Gender === gender && item.Age.includes(ageGroup));
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
        aspect: 'hbar',
        plotarea: {
          'background-color': "#D04347"
        }
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
          values: currentCategoryData.filter((dictionary) => dictionary.Gender == 'Male').map((dictionary)=>dictionary.Count),
          "data-commonDailyCups": currentCategoryData.filter((dictionary) => dictionary.Gender == 'Male').map((dictionary)=> dictionary['Most Common Daily Coffee Cups Consumed']),
          "data-commonMonthlyExpenditure": currentCategoryData.filter((dictionary) => dictionary.Gender == 'Male').map((dictionary)=> dictionary['Most Common Monthly Coffee Expenditure']),
          "data-commonHighestWillingPrice": currentCategoryData.filter((dictionary) => dictionary.Gender == 'Male').map((dictionary)=> dictionary['Most Common Highest Price they are willing to Pay']),
          backgroundColor: '#4682b4',
          dataSide: 1
        },
        {
          text: 'Female',
          values: currentCategoryData.filter((dictionary) => dictionary.Gender == 'Female').map((dictionary)=>dictionary.Count),
          "data-commonDailyCups": currentCategoryData.filter((dictionary) => dictionary.Gender == 'Female').map((dictionary)=> dictionary['Most Common Daily Coffee Cups Consumed']),
          "data-commonMonthlyExpenditure": currentCategoryData.filter((dictionary) => dictionary.Gender == 'Female').map((dictionary)=> dictionary['Most Common Monthly Coffee Expenditure']),
          "data-commonHighestWillingPrice": currentCategoryData.filter((dictionary) => dictionary.Gender == 'Female').map((dictionary)=> dictionary['Most Common Highest Price they are willing to Pay']),
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
    <p>Discover Coffee Trends with Our Interactive Population Pyramid! Dive into the world of coffee enthusiasts with our dynamic Population Pyramid chart, designed to reveal fascinating insights into coffee drinking habits across various demographics. Use the population filter and interactive slider to explore categories like <strong>Types of sugar/sweeter people add to their coffee</strong>, <strong>Why people drink coffee</strong>, <strong>Where people purchase coffee</strong>, and more. Watch as the chart updates in real-time, showcasing intriguing statistics such as hover information on the most common daily cups of coffee, expenditure, and highest price they are willing to pay for coffee. Uncover the coffee trends that define different groups and see how your own habits compare. Explore and engage with the data to learn more about the diverse world of coffee drinkers!</p>
    <br></br>
    <h3>Choose a filter from the selection box below to narrow down the population, then use the slider to select a specific coffee demographic category! &#128522;</h3>
    <div className="controls">
    <br></br>
    <Select
          value={filterOptions.find(option => option.value === currentFilter)}
          onChange={handleFilterChange}
          options={filterOptions}
          placeholder="Select a filter"
        />
      {categories.length > 0 && (
        <div className="slider-container">
          <input
            type="range"
            min="0"
            max={categories.length - 1}
            value={categories.indexOf(currentCategory)}
            onChange={e => setCurrentCategory(categories[e.target.value])}
            step="1"
            className="category-slider"
          />
          <div className="category-label"><h2>Current Category:</h2> {currentCategory}</div>
        </div>
      )}
    </div>
    <div className="chart--container" id="graph3"></div>
  </div>
  );
};

export default Graph3