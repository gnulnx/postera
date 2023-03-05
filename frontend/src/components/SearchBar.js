import { useState, useCallback, useMemo, useEffect } from "react";
import {createUseStyles} from 'react-jss';
import debounce from "lodash.debounce";
import './SearchBar.css';
import {SearchResult} from "./";


// use jss styling
const useRoutesStyles = createUseStyles({
    foundation: {
        width: '50%',
    },
});

export const SearchBar = ({setRoutes}) => {
    const styles = useRoutesStyles();
    const [results, setSearchResults] = useState([])

    // Select potential synthetic routes using autocomplete
    const autocomplete_search = async (query_term) => {
        const response = await fetch(`http://localhost:8080/search?q=${query_term}`);
        const data = await response.json();
        console.log(data)
        console.log(`'Total Results ${data.length}`)
        setSearchResults(data)
    };

    const debouncedAutocomplete = useCallback(
        debounce((event) => {
            autocomplete_search(event.target.value)
        }, 300)
    , []);

    const fetch_route = async (route_id) => {
        const response = await fetch(`http://localhost:8080/fetch_route?id=${route_id}`);
        const result = await response.json();
        setRoutes(result.data)        
    };

    function selectRoute (event) {
        const route_id = event.currentTarget.id
        console.log(`FetchRouate for ${route_id}`)
        fetch_route(route_id)
    }

    return (
        <div >
            <input placeholder="Search for routes..." onChange={debouncedAutocomplete} id="query"></input>
            {results.length > 0 && 
            <h1>Total Results {results.length}</h1> 
            }
            <ul id="search_results_dropdown">
                {results.map(function(result, index){
                    // console.log(`names ${result}`)
                    // console.log(result.id)

                    return (<SearchResult key={result.id} result={result} setRoutes={setRoutes} />)

                    // return (
                    //     <li key={index} className="rxn_item" id={result.id} onClick={selectRoute}>
                    //         <p className="result_header">Synthetic Steps {result.rxn_name.length}</p>
                    //         <ul id="rxn_list">
                    //         {result.rxn_name.map(function(name, index2){
                    //             return <li key={index2} className="rxn_name">Step {index2+1}: {name}</li>
                    //         })}
                    //         </ul>
                    //         <div>
                    //             <h1> Add Other info here</h1>
                    //         </div>
                    //     </li>
                    // );

                })}
            </ul>
        </div>
    );
};