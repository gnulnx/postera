import React from 'react';
import PropTypes from 'prop-types';
import styles from './MyComponent.module.scss';

const MyComponent = () => {
  
  const fetch_data = e => {
    fetch("http://localhost:8080")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result.message)
          MyComponent.defaultProps.message = result.message
        }
      )
  }
  
  return (
    <div>
      <h1 className={styles.MyComponent}>
        My First Component {MyComponent.defaultProps.message}
      </h1>

      <button onClick={fetch_data}>
        Click Me
      </button>
    </div>
  )
}

MyComponent.propTypes = {
  message: PropTypes.string
};

MyComponent.defaultProps = {
  message: "Love it"
};

export default MyComponent;
