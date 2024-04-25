import React, { useEffect } from 'react'
import './Graph3.css'
import {pyramidBuilder} from "./components/popPyramid.js"
import mainPopulationPyramidData from "../data/mainPopulationPyramid.json"
const Graph3 = () => {
  useEffect(() => {
    // Your population pyramid script here
    const exampleData = mainPopulationPyramidData;
    const options = {
        height: 400,
        width: 1200,
        style: {
            leftBarColor: "#229922",
            rightBarColor: "#992222"
        }
    };
    // Check if the pyramid element already exists
    const pyramidElement = document.querySelector("#pyramid");
    if (!pyramidElement) {
      // If the pyramid element does not exist, create and append it
      const graph3Element = document.querySelector("#graph3");
      const newPyramidElement = document.createElement("div");
      newPyramidElement.id = "pyramid";
      graph3Element.appendChild(newPyramidElement);
      pyramidBuilder(exampleData, newPyramidElement, options);
    }
  }, []);

  return (
    <div className="graph3" id="graph3">
      <h1>Population Pyramid Graph</h1>
    </div>
  );
};

export default Graph3