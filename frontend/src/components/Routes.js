import React, {useEffect, useState} from "react";
import {createUseStyles} from 'react-jss';
import Tree from 'react-d3-tree';


// use jss styling
const useRoutesStyles = createUseStyles({
  foundation: {
    margin: '10px',
  },
});

export const Routes = () => {
  const styles = useRoutesStyles();
  const [routes, setRoutes] = useState([]);

  /* This is my psudeo code */
  const fetch_data = e => {
    fetch("http://localhost:8080")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result.message)
          // MyComponent.defaultProps.message = result.message
        }
      )
  }
  /* end my code section */

  const fetchRoutes = async () => {
    const response = await fetch("http://localhost:8080/routes");
    // If using VSCode + windows, try using your IP 
    // instead (see frontent terminal)
    //const response = await fetch("http://X.X.X.X:8000/routes");
    const newRoutes = await response.json();
    console.log(newRoutes)
    setRoutes(newRoutes.data);
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const orgChart = {
    name: 'CEO',
    children: [
      {
        name: 'Manager',
        attributes: {
          department: 'Production',
        },
        children: [
          {
            name: 'Foreman',
            attributes: {
              department: 'Fabrication',
            },
            children: [
              {
                name: 'Worker',
              },
            ],
          },
          {
            name: 'Foreman',
            attributes: {
              department: 'Assembly',
            },
            children: [
              {
                name: 'Worker',
              },
            ],
          },
        ],
      },
    ],
  };

  // TODO: use react-d3-tree to visualize the routes
  //   - https://www.npmjs.com/package/react-d3-tree

  return (
    <div className={styles.foundation}>
      <div id="treeWrapper" style={{ width: '50em', height: '20em' }}>
        <Tree data={orgChart} />
      </div>
      {/* <button onClick={useEffect}>Fetch Routes </button>
      {routes.map((route, routeNumber) => (
        <h1 key={routeNumber}>Route {routeNumber}</h1>
      ))} */}
    </div>
  );
};
