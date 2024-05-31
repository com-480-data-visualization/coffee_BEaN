import React, { useState, useEffect } from 'react'
import './Graph3.css'
import useScript from './useScript';
import filtered_population_data from "../data/filtered_population_pyramids_data.json"
import overall_population_data from "../data/overall_population_data.json"
const Graph3 = () => {

  // Reduce the data to create a mapping of population filters to categories
  const populationFilterToCategories = filtered_population_data.reduce((acc, item) => {
    if (!acc[item["Population Filter"]]) {
      acc[item["Population Filter"]] = new Set(); // Initialize with a Set to ensure uniqueness
    }
    acc[item["Population Filter"]].add(item["Category"]);
    return acc;
  }, {});

  // Convert Sets to Arrays for easier access and manipulation
  const populationFilterToCategoriesList = Object.keys(populationFilterToCategories).reduce((acc, key) => {
    acc[key] = Array.from(populationFilterToCategories[key]);
    return acc;
  }, {});
  console.log(populationFilterToCategoriesList)

  // State to hold the currently selected filter and category
  const [currentFilter, setCurrentFilter] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [currentCategoryData, setCurrentCategoryData] = useState(overall_population_data);

  // Populate the categories based on the selected filter
  useEffect(() => {
    if (currentFilter) {
      setCategories(populationFilterToCategoriesList[currentFilter]);
      setCurrentCategory(populationFilterToCategoriesList[currentFilter][0] || '');
    } else {
      // Reset to overall population data when no filter is selected
      setCategories([]);
      setCurrentCategory('');
      setCurrentCategoryData(overall_population_data);
    }
  }, [currentFilter]);

  // Update current category data based on changes in filter or category
  useEffect(() => {
    if (currentFilter && currentCategory) {
      const data = filtered_population_data
        .filter(item => item["Population Filter"] === currentFilter && item["Category"] === currentCategory)
        .flatMap(item => item.Data);
      setCurrentCategoryData(data);
    } else if (!currentFilter) {
      setCurrentCategoryData(overall_population_data);
    }
  }, [currentCategory, currentFilter]);




  //Current category data will be based on the filters
  const current_category_data = 
  filtered_population_data.filter((dictionary) => dictionary["Population Filter"] === "Where do you typically drink coffee?" && dictionary["Category"] === "At home").map((item) => item.Data).flat();
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
    <h3></h3>
    <div className="controls">
      <select value={currentFilter} onChange={e => setCurrentFilter(e.target.value)}>
        <h2>Filter:</h2>
        <option value=""><h2>Main Population</h2></option>
        {Object.keys(populationFilterToCategoriesList).map(filter => (
          <option key={filter} value={filter}><h2>{filter}</h2></option>
        ))}
      </select>
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