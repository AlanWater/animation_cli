import React, { Component } from 'react';
import Substance from './substance/substance';

class App extends Component {
    render() {
        let substance = new Substance('enemy');
        substance.run();
        return (
            <div>app</div>
        );
    }
}

export default App;