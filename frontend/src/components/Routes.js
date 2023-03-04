import React, {useEffect, useState} from "react";
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

  // TODO: use react-d3-tree to visualize the routes
  //   - https://www.npmjs.com/package/react-d3-tree

  // TODO Remove this
  // console.log(JSON.stringify(routes.routes, null, 2))


  return (
    
    <div className={styles.foundation}>
      <h1>{routes.title}</h1>
      <div id="treeWrapper" style={{ width: '100vw', height: '100vh' }}>
          <Tree 
            // key={routes.title}
            data={routes.routes}
            // translate={translate}
            orientation="vertical"
            />
      </div>
    </div>
  );
};
