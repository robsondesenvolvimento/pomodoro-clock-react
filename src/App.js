import React from 'react';
import PomodoroClock from './components/clock/PomodoroClock';
import './App.css';

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <PomodoroClock />
        </header>
      </div>
    );
  }
}

export default App;
