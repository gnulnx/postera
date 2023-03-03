import React from 'react';
import ReactDOM from 'react-dom';
import MyComponent from './MyComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});