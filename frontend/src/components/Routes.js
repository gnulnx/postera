import React, {useEffect, useState} from "react";
import {MolView} from "./";
import { useCenteredTree } from "./helpers";
import {createUseStyles} from 'react-jss';
import Tree from 'react-d3-tree';
import './Routes.css';


// use jss styling
const useRoutesStyles = createUseStyles({
  foundation: {
    margin: '10px',
  },
});

export const Routes = (routes) => {
  const styles = useRoutesStyles();

  const renderForeignObjectNode = ({ nodeDatum, toggleNode }) => {
    return (
      <g>
       <foreignObject {...foreignObjectProps}>
        <div>         
          <MolView smiles={nodeDatum.name} />
        </div>
      </foreignObject>
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
    
    <div class="route_container">
      
      <h1>{routes.title}</h1>
      {/* <div id="treeWrapper" style={{ marginLeft: '10vw', width: '100vw', height: '100vh' }} ref={containerRef}> */}
      <div id="treeWrapper"  ref={containerRef}>
          <Tree 
            data={routes.routes}
            translate={translate}
            nodeSize={nodeSize}
            renderCustomNodeElement={(rd3tProps) =>
              renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
            }
            orientation="vertical"
            />
      </div>
    </div>
  );
};
