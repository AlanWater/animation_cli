import React, { Component } from 'react';
import Substance from './substance/substance';
import './style/index.scss';
export class AppState {
    substanceList: Substance[];
}
class App extends Component<any, AppState> {
    constructor(props: any) {
        super(props);
        this.state = new AppState();
    }
    stop = () => {
        const { substanceList } = this.state;
        for (let idx = 0; idx < substanceList.length; idx++) {
            let substance = substanceList[idx];
            substance.stop();
        }
    }
    start = () => {
        const { substanceList } = this.state;
        for (let idx = 0; idx < substanceList.length; idx++) {
            let substance = substanceList[idx];
            substance.start();
        }
    }
    componentDidMount() {
        let substanceList = [];
        for (let idx = 0; idx < 99; idx++) {
            let substance = new Substance(document.querySelector('.panel'), 'circle');
            substance.run();
            substanceList.push(substance);
        }
        this.setState({
            substanceList
        })
    }
    render() {
        return (
            <div>
                <button onClick={this.start}>启动</button>
                <button onClick={this.stop}>暂停</button>
                <div className="panel">
                </div>
            </div>
        );
    }
}

export default App;