import { useState, useCallback} from "react";
import debounce from "lodash.debounce";
import './SearchBar.css';
import {SearchResult} from "./";


export const SearchBar = ({setRoutes}) => {
    const [results, setSearchResults] = useState([])

    // Select potential synthetic routes using autocomplete
    const autocomplete_search = async (query_term) => {
        const response = await fetch(`http://localhost:8080/search?q=${query_term}`);
        const data = await response.json();
        setSearchResults(data)
    };

    const debouncedAutocomplete = useCallback(
        debounce((event) => {
            autocomplete_search(event.target.value)
        }, 300)
    , []);

    return (
        <div >
            <input placeholder="Search for routes..." onChange={debouncedAutocomplete} id="query"></input>
            {results.length > 0 && 
            <h1>Total Results {results.length}</h1> 
            }
            <ul id="search_results_dropdown">
                {results.map(function(result, index){
                    return (<SearchResult key={result.id} result={result} setRoutes={setRoutes} />)
                })}
            </ul>
        </div>
    );
};