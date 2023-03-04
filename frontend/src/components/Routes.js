import React, {useEffect, useState} from "react";
import SVG from 'react-inlinesvg';
import {MolView} from "./";
import { useCenteredTree } from "./helpers";
import {createUseStyles} from 'react-jss';
import Tree from 'react-d3-tree';

// use jss styling
const useRoutesStyles = createUseStyles({
  foundation: {
    margin: '10px',
  },
});

export const Routes = (routes) => {
  const styles = useRoutesStyles();

  // const fetchMols = async (smiles) => {
  //   const response = await fetch(`http://localhost:8080/molecule?smiles=${smiles}`);
  //   const data = await response.json();
  //   const svg = data.data
  //   return svg
  // };

  // const svg = fetchMols("O=C(Cn1nnc2ccccc21)N(Cc1ccsc1)c1ccc(Cl)cc1")
  // console.log(svg)


  // TODO Remove this
  const renderForeignObjectNode = ({ nodeDatum, toggleNode }) => {

    return (
      <g>
        {/* <circle r="100" onClick={toggleNode} /> */}
       <foreignObject {...foreignObjectProps}>
        {/* <div style={{ border: "1px solid black", backgroundColor: "#dedede" }}> */}
        <div>
         
          {/* <h3 style={{ textAlign: "center" }}>{nodeDatum.name}</h3> */}
          <MolView smiles={nodeDatum.name} />
          {/* {nodeDatum.children && (
            <button style={{ width: "100%" }} onClick={toggleNode}>
              {nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"}
            </button>
          )} */}
        </div>
      </foreignObject>
      {/* <MolView smiles={nodeDatum.name} /> */}
        {/* <circle r="1" onClick={toggleNode} />
        <text fill="black" strokeWidth="1" x="-20">
          {nodeDatum.name}
          
        </text>
        {nodeDatum.attributes?.reaction && (
          <text fill="black" x="20" dy="20" strokeWidth="1">
            Reaction: {nodeDatum.attributes?.reaction}
          </text>

        )} */}
    </g>
    )
  };
  const [translate, containerRef] = useCenteredTree();
  const nodeSize = { x: 400, y: 400 };
  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    x:-75, y:-75};

  return (
    
    <div className={styles.foundation}>
      
      <h1>{routes.title}</h1>
      <div id="treeWrapper" style={{ marginLeft: '10vw', width: '100vw', height: '100vh' }} ref={containerRef}>
          <Tree 
            data={routes.routes}
            translate={translate}
            nodeSize={nodeSize}
            renderCustomNodeElement={(rd3tProps) =>
              renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
            }
            // renderCustomNodeElement={renderRectSvgNode}
            orientation="vertical"
            />
      </div>
    </div>
  );
};
