import React, { Component } from 'react';
import Substance from './substance/substance';

class App extends Component {
    render() {
        let substance = new Substance();
        console.log(substance);
        console.log(substance.moveStatus);
        return (
            <div>app</div>
        );
    }
}

export default App;