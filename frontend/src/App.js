import './App.css';
import React, {useEffect, useState} from "react"
import {Header, Routes, SearchBar} from "./components";


function App() {
  // const [routes, setRoutes] = useState([{data: []}])
  const [routes, setRoutes] = useState(false)
  const [title, setTitle] = useState("Hello John") 
  
  console.log("App.js")
  console.log(routes)

  if (true ? routes : false) {
    return (
      <main>
        <Header />
        <SearchBar setRoutes={setRoutes} setTitle={setTitle}/>
        <Routes routes={routes} title={title}/>
        {/* <Routes props={routes} title={title}/> */}
      </main>
    )
  } else {
    return (
      <main>
        <Header />
        <SearchBar setRoutes={setRoutes} setTitle={setTitle}/>
      </main>
    )

  }

}

export default App;
