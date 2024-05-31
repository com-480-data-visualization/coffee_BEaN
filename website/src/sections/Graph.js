import React, {useEffect, useState} from 'react'
import './Graph.css'
import {WorldMap} from "./components/WorldMap";
import coffeeVarieties from "../data/world_coffee_types.json";
import {ReactSearchAutocomplete} from 'react-search-autocomplete';

const formatData = (json) => {
    const formattedData = {};

    const countries = json["Country of Origin"];
    const varieties = json["Variety"];
    const totalCupPoints = json["Total Cup Points"];

    Object.keys(countries).forEach(key => {
        const country = countries[key];
        const variety = varieties[key];
        const points = totalCupPoints[key];

        if (!formattedData[country]) {
            formattedData[country] = [];
        }

        formattedData[country].push({ Variety: variety, "Total Cup Points": points });
    });

    return formattedData;
}

const Graph = () => {
    const allVarieties = Array.from(new Set(Object.values(coffeeVarieties["Variety"])));

    const [searchList, setSearchList] = useState([{ id: 0, name: 'All Varieties' }]);
    const [selectedCoffeeType, setSelectedCoffeeType] = useState('All Varieties');
    const formattedData = formatData(coffeeVarieties);

    useEffect(() => {
        const searchWords = allVarieties.map((item, index) => ({
            id: index,
            name: item
        }));
        setSearchList([{ id: 0, name: 'All Varieties' }, ...searchWords]);
    },[coffeeVarieties])

    const handleOnSearch = (string, results) => {
        console.log(string, results);
    };

    const handleOnHover = (result) => {
        console.log(result);
    };

    const handleOnSelect = (item) => {
        setSelectedCoffeeType(item.name);
    };

    const handleOnFocus = () => {
        console.log("Focused");
    };

    const handleOnClear = () => {
        console.log("Cleared");
        setSelectedCoffeeType("All Varieties");
    };

  return (
      <div className='graph' id='graph'>
          <h1>{"Coffee Beans in the World"}</h1>
          <p>{"Have you ever wondered where do coffee beans grow? Which countries can actually cultivate coffee?? " +
              "Well... we have! So, we did some research to show others like us!"}
              <br/>
              <br/>
              {"Feel free to hover over the World Map below to find out more information on countries' coffee production! You can also look for a specific bean variety with the help of the search bar below."}
              <br/>
              <span style={{fontWeight: 'bolder'}}>{"Total Cup Points:"}</span>
              {" quantifies the quality of coffee beans based on 10 sensory parameters: Aroma, Flavor, Aftertaste, Acidity, Body, Balance, Uniformity, Clean Cup (lackness of defects), Sweetness and Overall Impression. A variety that has a score higher than 80 is considered as \"Specialty Coffee\"."}
          </p>
          <div className='main-map'>
              <div className='search-bar'>
                  <ReactSearchAutocomplete
                      placeholder={"All Varieties"}
                      items={searchList}
                      maxResults={5}
                      onSearch={handleOnSearch}
                      onHover={handleOnHover}
                      onSelect={handleOnSelect}
                      onFocus={handleOnFocus}
                      onClear={handleOnClear}
                      fuseOptions={{keys: ["name"]}} // Search in the name key
                      styling={{zIndex: 3}} // To display it on top of the map
                  />
              </div>
              <WorldMap selectedCoffeeType={selectedCoffeeType} coffeeData={formattedData}/>
          </div>
      </div>
  )
}

export default Graph