import { useState, useMemo, useEffect } from "react";
import debounce from "lodash.debounce";


export const SearchBar = () => {
    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ title: 'React POST Request Example' }, requestOptions)
    // };
    const fetchRoutes = e => {
        fetch("http://localhost:8080")
          .then(res => res.json())
          .then(
            (result) => {
              console.log(result.message)
            }
          )
      }
    // const fetchRoutes = async () => {
    //     fetch('http://localhost:8080/routes')
    //         .then(response => response.json())
    //         .then(
    //             (result) => {
    //                 console.log(result.message)
    //             }
    //         );

    //     // const response = await fetch("http://localhost:8080/routes");
    //     // const newRoutes = await response.json();
    //     console.log(newRoutes)
    // };

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