import React from "react";
import { useState, useCallback, useMemo, useEffect } from "react";
import SVG from 'react-inlinesvg';


export const MolView = ({smiles, width, height}) => {
  const [molecule, setMol] = useState();
  // const [width, setWidth] = useState(200);
  // const [height, setHeight] = useState(200);

  const fetchMols = async (smiles) => {
    const response = await fetch(`http://localhost:8080/molecule?smiles=${smiles}`);
    const data = await response.json();
    setMol(data.data)
  };

  // For some reason MolView from Routes comes in multiple times with these variablees undefined...
  // width = 200 ? width === undefined : width
  // height = 200 ? height === undefined : height
  if (width === undefined) {
      width = 200;
  }
  if (height === undefined) {
      height = 200;
  }
  // console.log(`Molview width=${width} height=${height}`)

  fetchMols(smiles)
  return (
    <SVG src={molecule} width={width} height={height}/>
  );
};
