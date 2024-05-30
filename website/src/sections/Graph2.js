import React, {useEffect, useState} from 'react'
import './Graph2.css'
import InteractiveRadarChart, {defaultCoffee} from "./components/InteractiveRadarChart";
import tasteProfiles from "../data/variety_profiles.json"
import { ReactSearchAutocomplete } from 'react-search-autocomplete'


const formatData = (json) => {
    var dict_list = []
    json.forEach((row) => {
        let format = {
            name: row.Variety,
            profile: [
                { axis: "Aroma", value: row.Aroma },
                { axis: "Flavor", value: row.Flavor },
                { axis: "Aftertaste", value: row.Aftertaste },
                { axis: "Acidity", value: row.Acidity },
                { axis: "Body", value: row.Body },
                { axis: "Balance", value: row.Balance },
            ]
        };
        dict_list.push(format);
    });
    return dict_list;
}

const Graph2 = () => {
    const all_profiles = formatData(tasteProfiles);

    const [searchList, setSearchList] = useState([]);
    const [mainData, setMainData] = useState(defaultCoffee);
    const [smallData1, setSmallData1] = useState(defaultCoffee);
    const [smallData2, setSmallData2] = useState(defaultCoffee);
    const [smallData3, setSmallData3] = useState(defaultCoffee);

    useEffect(() => {
        var search_words = [];
        for (var i = 0; i < all_profiles.length; i++) {
            search_words.push({id: i, name: all_profiles[i].name})
        }
        setSearchList(search_words)
    },[])

    const findData = (name) => {
        var found = defaultCoffee
        all_profiles.forEach((entry) => {
            if(entry.name === name) {
                found = entry;
            }
        });
        return found
    }

    function handleDataFromChild(data) {
        // sent 3 closest match
        setSmallData1(data[0]);
        setSmallData2(data[1]);
        setSmallData3(data[2]);
    }

    const handleOnSearch = (string, results) => {
        console.log(string, results);
        //TODO choose most similar
    };

    const handleOnHover = (result) => {
        console.log(result);
    };

    const handleOnSelect = (item) => {
        setMainData(findData(item.name))
    };

    const handleOnFocus = () => {
    };

    const handleOnClear = () => {
        console.log("Cleared");
        setMainData(defaultCoffee)
    };

    return (
        <div className='graph2' id='graph2'>
            <h1>{"Taste Profile of Coffee Beans"}</h1>
            <div style={{width: 350, margin: 20}}>
                <ReactSearchAutocomplete
                    items={searchList}
                    maxResults={5}
                    onSearch={handleOnSearch}
                    onHover={handleOnHover}
                    onSelect={handleOnSelect}
                    onFocus={handleOnFocus}
                    onClear={handleOnClear}
                    fuseOptions={{keys: ["name"]}} // Search in the description text as well
                    styling={{zIndex: 3}} // To display it on top of the search box below
                />
            </div>
            <InteractiveRadarChart
                isMain={true}
                data={mainData}
                allData={all_profiles}
                func={handleDataFromChild}
            />
            <div className='main-radar'>
                <InteractiveRadarChart
                    isMain={false}
                    data={smallData1}
                />
                <InteractiveRadarChart
                    isMain={false}
                    data={smallData2}
                />
                <InteractiveRadarChart
                    isMain={false}
                    data={smallData3}
                />
            </div>
        </div>
    )
}

export default Graph2

