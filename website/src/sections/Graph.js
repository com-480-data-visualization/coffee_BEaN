import React, {useEffect, useState} from 'react'
import './Graph.css'
import {WorldMap} from "./components/WorldMap";
import coffeeVarieties from "./data/world_coffee_types.json";
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
      <h1>{"Coffee Producing Countries"}</h1>
        <h2>{`${selectedCoffeeType}`}</h2>
      <div className='main-map'>
          <div style={{width: 350, margin: 20}}>
              <ReactSearchAutocomplete
                  placeholder={"All Varieties"}
                  items={searchList}
                  maxResults={5}
                  onSearch={handleOnSearch}
                  onHover={handleOnHover}
                  onSelect={handleOnSelect}
                  onFocus={handleOnFocus}
                  onClear={handleOnClear}
                  fuseOptions={{ keys: ["name"] }} // Search in the name key
                  styling={{ zIndex: 3}} // To display it on top of the map
                  className="search_bar"
                  defaultValue="All Varieties"
              />
      </div>
          <WorldMap selectedCoffeeType={selectedCoffeeType} coffeeData={formattedData} />
      </div>
    </div>
  )
}

export default Graph