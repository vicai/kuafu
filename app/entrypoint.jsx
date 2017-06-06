import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import './global.scss';
import ExampleApp from './components/ExampleApp';

ReactDOM.render(
    <ExampleApp />,
    document.getElementById('content')
);