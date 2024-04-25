import React from 'react';
import '../App.css';
import Welcome from './Welcome';
import Footer from "./Footer";
import Graph4 from "./Graph4"
import Graph3 from "./Graph3";
import Graph2 from "./Graph2";
import Graph from "./Graph";

function Home() {
  return (
    <>
      <Welcome />
      <Graph />
      <Graph2 />
      <Graph3 />
      <Graph4 />
      <Footer/>
    </>
  );
}

export default Home;