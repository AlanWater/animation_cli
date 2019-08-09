import App from './app';
import React from 'react';
import ReactDom from 'react-dom';
export type ReactElement = React.DOMElement<React.DOMAttributes<Element>, Element>;
ReactDom.render(<App />, document.getElementById('app'));