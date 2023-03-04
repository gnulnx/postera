import './App.css';

import {Header, Routes, SearchBar} from "./components";


function App() {
  return (
    <main>
      <Header />
      <SearchBar />
      {/* <h1> Below is your Routes</h1> */}
      <Routes />
    </main>
  )
}

export default App;
