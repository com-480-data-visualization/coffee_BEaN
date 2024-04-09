import './App.css';
import Navbar from "./sections/components/Navbar";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./sections/Home";

function App() {
  return (
      <div className="App">
        <Router>
          <Navbar/>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
          </Routes>
        </Router>
      </div>
  );
}

export default App;
