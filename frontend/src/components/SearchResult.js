import { useState} from "react";
import './SearchResult.css';
import {MolView} from "./";



export const SearchResult = ({result, setRoutes}) => {
    const [expand, expandElement] = useState([0])

    const fetch_route = async (route_id) => {
        const response = await fetch(`http://localhost:8080/fetch_route?id=${route_id}`);
        const result = await response.json();
        setRoutes(result.data)        
    };

    function selectRoute (event) {
        const route_id = event.currentTarget.id
        console.log(`FetchRouate for ${route_id}`)
        fetch_route(route_id)
        expandElement(1 ? expand == 0 : 0)

        console.log(result.building_blocks)
    }

    return (
        <li key={result.id} className="rxn_item" id={result.id} onClick={selectRoute}>
            <p className="result_header">Synthetic Steps {result.rxn_name.length}</p>
            <ul id="rxn_list">
            {result.rxn_name.map(function(name, index2){
                return <li key={index2} className="rxn_name">Step {index2+1}: {name}</li>
            })}
            {expand == 1 && 
                <div>
                <h4>Building Block Information</h4>

                <ul id="bb_list">
                    {result.building_blocks.map(function(bb, index2){
                        console.log(bb.catalog_entries)
                        return <li key={bb.smiles} className="rxn_name">
                            <MolView smiles={bb.smiles} width={100} height={100} />
                            <table>
                                <thead>
                                    <tr>
                                        <th>Vendor</th>
                                        <th>lead Time (weeks)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {bb.catalog_entries.map(function(entry, bb_index) {
                                    return <tr key={bb_index}>
                                        <td>{entry.catalog_name}</td>
                                        <td>{entry.lead_time_weeks}</td>
                                    </tr>
                                })}
                                </tbody>
                            </table>
                        </li>
                    })}
                </ul>
                </div>
            }
            </ul>
        </li>
    );
}