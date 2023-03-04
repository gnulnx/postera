import React from "react";
import { useState, useCallback, useMemo, useEffect } from "react";
import SVG from 'react-inlinesvg';


export const MolView = ({smiles}) => {
  const [molecule, setMol] = useState();

  const fetchMols = async (smiles) => {
    const response = await fetch(`http://localhost:8080/molecule?smiles=${smiles}`);
    const data = await response.json();
    setMol(data.data)
    // document.getElementById(`${smiles}`).innerHTML = molecule
  };

  fetchMols(smiles)
  return (
    <SVG src={molecule} width={200} height={200}/>

  );
};
