import { useState, useCallback, useMemo, useEffect } from "react";
import {createUseStyles} from 'react-jss';
import debounce from "lodash.debounce";


// use jss styling
const useRoutesStyles = createUseStyles({
    foundation: {
        width: '50%',
    },
});

export const SearchBar = ({setRoutes}) => {
    const styles = useRoutesStyles();
    const [query_term, setQueryTerm] = useState();

    const fetchRoutes = async (query_term) => {
        // const url = `http://localhost:8080/routes?q=${query_term}`
        // console.log(url)
        const response = await fetch(`http://localhost:8080/routes?q=${query_term}`);
        const newRoutes = await response.json();
        console.log(newRoutes)
        setRoutes(newRoutes[0].data)
        console.log(query_term)
        // setTitle(query_term)
    };


      const handleChange = (event) => {
        // console.log(event.target.value)
        fetchRoutes(event.target.value)
        // 👇 Get input value from "event"
        // setMessage(event.target.value);
      };

    const debouncedOnChange = useCallback(
        debounce(handleChange, 300)
    , []);

  return (
    <header>
        <label>Search: </label>
        <input className={styles.foundation} onChange={debouncedOnChange} id="query"></input>
        {/* <input onChange={handleChange} id="query"></input> */}
    </header>
  );
};