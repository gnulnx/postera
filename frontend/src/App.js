import './App.css';
import React, {useEffect, useState} from "react"
import {Header, MolView, Routes, SearchBar} from "./components";

function App() {
  const [routes, setRoutes] = useState(false)

  // Surely there is a better way to handle conditional rendering in React???
  if (true ? routes : false) {
    return (
      <main>
        <Header />
          <SearchBar setRoutes={setRoutes}/>
          {/* <div class="route_container"> */}
            <Routes routes={routes} />
          {/* </div> */}
      </main>
    )
  } else {
    return (
      <main>
        <Header />
        <SearchBar setRoutes={setRoutes}/>
      </main>
    )

  }

}

export default App;
