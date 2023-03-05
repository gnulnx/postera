import { useState, useCallback, useMemo, useEffect } from "react";
import {createUseStyles} from 'react-jss';
import debounce from "lodash.debounce";
import './SearchBar.css';


// use jss styling
const useRoutesStyles = createUseStyles({
    foundation: {
        width: '50%',
    },
});

const headerStyle = {
    marginLeft: "25px"
  }
  

export const SearchBar = ({setRoutes}) => {
    const styles = useRoutesStyles();
    const [query_term, setQueryTerm] = useState();
    const [rxn_names, setRxnNames] = useState([])


    const fetchRoutes = async (query_term) => {
        const response = await fetch(`http://localhost:8080/search?q=${query_term}`);
        const data = await response.json();
        console.log(data)
        // setRoutes(newRoutes[0].data)
        setRoutes(data[data.length-1].data)
        console.log(query_term)

        let rxn_names = []
        for (let row in data) {
            console.log(data[row].rxn_name)
            rxn_names.push(data[row].rxn_name)
            // console.log(row.rxn_name)
        }
        console.log(rxn_names)
        setRxnNames(rxn_names)
        // console.log(data[0].rxn_name)
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
        <header style={headerStyle}>
            <label>Search: </label>
            <input className={styles.foundation} onChange={debouncedOnChange} id="query"></input>
            <ul id="search_results_dropdown">
                {rxn_names.map(function(names, index){
                    return (
                        <li key={index} className="rxn_item">
                            <p className="result_header">Synthetic Steps {names.length}</p>
                            <ul id="rxn_list">
                            {names.map(function(name, index2){
                                return <li key={index2} className="rxn_name">Step {index2+1}: {name}</li>
                            })}
                            </ul>
                        </li>
                    );

                })}

            </ul>
        </header>
    );
};