import { useState, useMemo, useEffect } from "react";
import debounce from "lodash.debounce";


export const SearchBar = ({setRoutes, setTitle}) => {
    const fetchRoutes = async () => {
        const response = await fetch("http://localhost:8080/routes");
        const newRoutes = await response.json();
        console.log("now routes in searchbar")
        console.log(newRoutes)
        setRoutes(newRoutes.data)
        setTitle("Yo Man")
      };

    const debouncedResults = useMemo(() => {
        return debounce(fetchRoutes, 300);
      }, []);

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
          };
      }, []);

  return (
    <header>
        <label>Search: </label>
        <input onChange={debouncedResults}></input>
    </header>
  );
};