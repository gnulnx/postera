import { useState, useCallback, useMemo, useEffect } from "react";
import {createUseStyles} from 'react-jss';
import debounce from "lodash.debounce";
import './SearchResult.css';


export const SearchResult = ({result, setRoutes}) => {
    const [results, setSearchResults] = useState([])

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
        <li key={result.id} className="rxn_item" id={result.id} onClick={selectRoute}>
            <p className="result_header">Synthetic Steps {result.rxn_name.length}</p>
            <ul id="rxn_list">
            {result.rxn_name.map(function(name, index2){
                return <li key={index2} className="rxn_name">Step {index2+1}: {name}</li>
            })}
            </ul>
        </li>
    );
}