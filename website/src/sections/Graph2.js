import React, { useState } from 'react'
import './Graph2.css'
import InteractiveRadarChart, {defaultCoffee} from "./components/InteractiveRadarChart";
import tasteProfiles from "../data/variety_profiles.json"


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
    const [mainData, setMainData] = useState(defaultCoffee);
    const [smallData1, setSmallData1] = useState(defaultCoffee);
    const [smallData2, setSmallData2] = useState(defaultCoffee);
    const [smallData3, setSmallData3] = useState(defaultCoffee);

    function handleDataFromChild(data) {
        // sent 3 closest match
        setSmallData1(data[0]);
        setSmallData2(data[1]);
        setSmallData3(data[2]);
    }

    return (
      <div className='graph2' id='graph2'>
          <h1>{"Taste Profile of Coffee Beans"}</h1>
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

