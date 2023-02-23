import { Component } from "react";
import "./App.css";

type AppProps = {
  counterState: number;
};

type StateProps = {
  currentCounterState: number;
};

class App extends Component<AppProps, StateProps> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      currentCounterState: this.props.counterState,
    };
  }

  incrementCounter = () => {
    this.setState({
      currentCounterState: this.state.currentCounterState + 1,
    });
  };

  decrementCounter = () => {
    this.setState({
      currentCounterState: this.state.currentCounterState - 1,
    });
  };

  resetCounterToInitialValue = () => {
    this.setState({
      currentCounterState: this.props.counterState,
    });
  };

  setCounterToRandomValue = () => {
    this.setState({
      currentCounterState: Math.floor(Math.random() * 10) + 1,
    });
  };

  render() {
    const { currentCounterState } = this.state;
    const {
      incrementCounter,
      decrementCounter,
      setCounterToRandomValue,
      resetCounterToInitialValue,
    } = this;
    return (
      <div className="app">
        <div className="counter">{currentCounterState}</div>
        <div className="controls">
          <button onClick={incrementCounter}>INC</button>
          <button onClick={decrementCounter}>DEC</button>
          <button onClick={setCounterToRandomValue}>RND</button>
          <button onClick={resetCounterToInitialValue}>RESET</button>
        </div>
      </div>
    );
  }
}
export default App;
