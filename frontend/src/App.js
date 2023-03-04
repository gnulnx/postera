import './App.css';
import React, {useEffect, useState} from "react"
import {Header, MolView, Routes, SearchBar} from "./components";


function App() {
  // const [routes, setRoutes] = useState([{data: []}])
  const [routes, setRoutes] = useState(false)
  // const [title, setTitle] = useState("Hello John") 

  // Surely there is a better way to handle conditional rendering in React???
  if (true ? routes : false) {
    return (
      <main>
        <Header />
        <SearchBar setRoutes={setRoutes}/>
        <Routes routes={routes}/>
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
