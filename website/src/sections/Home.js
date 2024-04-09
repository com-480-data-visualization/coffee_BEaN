import React from 'react';
import '../App.css';
import Welcome from './Welcome';
import Footer from "./Footer";
import Graph2 from "./Graph2";
import Graph from "./Graph";

function Home() {
  return (
    <>
      <Welcome />
      <Graph />
      <Graph2 />
      <Footer/>
    </>
  );
}

export default Home;