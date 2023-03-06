import './App.css';
import React, {useState} from "react"
import {Header, Routes, SearchBar} from "./components";

function App() {
  const [routes, setRoutes] = useState(false)

  // Surely there is a better way to handle conditional rendering in React???
  if (true ? routes : false) {
    return (
      <main>
        <Header />
        <div className="content-container">
          <div className="left_container">
            <SearchBar setRoutes={setRoutes}/>
          </div>
          <div className="right_container">
            <Routes routes={routes} />
          </div>
        </div>
      </main>
    )
  } else {
    return (
      <main>
        
        <Header />
        <div className="content-container">
          <div className="left_container">
            <SearchBar setRoutes={setRoutes}/>
          </div>
          <div className="right_container">
          </div>
        </div>
      </main>
    )

  }

}

export default App;
