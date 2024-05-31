import React, {useEffect, useState} from 'react'
import './Graph2.css'
import InteractiveRadarChart, {defaultCoffee, getClosest} from "./components/InteractiveRadarChart";
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
        const closest = getClosest(mainData, all_profiles);
        handleDataFromChild(closest);
    };

    const handleOnFocus = () => {
    };

    const handleOnClear = () => {
        console.log("Cleared");
        setMainData(defaultCoffee)
    };

    return (
        <div className='graph2' id='graph2'>
            <h1>{"How Do Coffee Beans Taste?"}</h1>
            <p>{"What about the taste difference of bean varieties? " +
                "A crucial quality that makes each variety unique and different must be their different tastes. " +
                "Here, you can discover the different taste profiles of all coffee beans!"}
                <br/>
                <br/>
                {"Let's talk about what each 6 taste traits mean. "}
                <span style={{fontWeight: 'bolder'}}>{"Aroma"}</span>
                {" describes the smell of coffee. A low rated aroma would suggest off-putting or stale smells, " +
                    "whereas a high rated aroma would mean strong, complex, and enjoyable scents. A similar trait is "}
                <span style={{fontWeight: 'bolder'}}>{"flavor"}</span>
                {" which describes the overall taste encompassing all other traits and rated the same fashion as aroma." +
                    "However, "}
                <span style={{fontWeight: 'bolder'}}>{"aftertaste"}</span>
                {" is quite different. It rates the lingering taste left on the mouth after a sip. Lower ratings mean that the aftertaste was unpleasant or harsh. " +
                    "Higher ratings mean that there was a pleasant and long-lasting aftertaste. "}
                <span style={{fontWeight: 'bolder'}}>{"Acidity"}</span>
                {" describes the bright, tangy, or sharp taste sensation that adds liveliness to the coffee. Low ratings " +
                    "would signify an unbalanced tanginess or lack of acidity whereas high ratings signal a well-integrated vibrant acidity presence. "}
                <span style={{fontWeight: 'bolder'}}>{"Body"}</span>
                {" is the weight or mouthfeel of the coffee, describing how it feels on the tongue. Poor body rating would mean " +
                    "the coffee feels very thin and watery. The opposite would be a full and rich body feel in the mouth. "}
                <span style={{fontWeight: 'bolder'}}>{"Balance"}</span>
                {" is the harmonious interaction between the various taste attributes in the coffee. When the coffee is poorly balanced, " +
                    "there would be certain elements overpowering others, leading to a discordant taste."}
            </p>
            <div className='two-col'>
                <div className='col-1'>
                    <p style={{color: 'white', fontSize: '18px', textAlign: "left", width: '100%'}}>
                        {"Here, you can tweek the 6 components of the graph to find the taste that fits you best."}
                        <br/>
                        <br/>
                        {"The three little graphs will show the most 3 similar coffee varieties for your taste!"}
                        <br/>
                        <br/>
                        {"You can also look up the taste profile of your favourite coffee bean using the search bar below. " +
                            "Once you clear out your selection, you will be able to continue tweeking with the interactive chart!"}
                    </p>
                    <div style={{width: 350}}>
                        <ReactSearchAutocomplete
                            placeholder={"Search for a bean variety..."}
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
                </div>
                <div className='col-2'>
                    <InteractiveRadarChart
                        isMain={true}
                        data={mainData}
                        allData={all_profiles}
                        func={handleDataFromChild}
                    />
                </div>
            </div>
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

