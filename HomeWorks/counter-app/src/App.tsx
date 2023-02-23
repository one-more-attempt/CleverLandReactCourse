import { Component } from "react";
import "./App.css";

type AppProps = {
  initialCounterValue: number;
};

type StateProps = {
  currentCounterStateValue: number;
};

class App extends Component<AppProps, StateProps> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      currentCounterStateValue: this.props.initialCounterValue,
    };
  }

  incrementCounter = () => {
    if (this.state.currentCounterStateValue < 10) {
      this.setState((state) => ({
        currentCounterStateValue: state.currentCounterStateValue + 1,
      }));
    }
  };

  decrementCounter = () => {
    if (this.state.currentCounterStateValue > -10) {
      this.setState((state) => ({
        currentCounterStateValue: state.currentCounterStateValue - 1,
      }));
    }
  };

  resetCounterToInitialValue = () => {
    this.setState({
      currentCounterStateValue: this.props.initialCounterValue,
    });
  };

  setCounterToRandomValue = () => {
    this.setState({
      currentCounterStateValue: Math.floor(Math.random() * 10) + 1,
    });
  };

  render() {
    const { currentCounterStateValue } = this.state;
    const {
      incrementCounter,
      decrementCounter,
      setCounterToRandomValue,
      resetCounterToInitialValue,
    } = this;
    return (
      <div className="app">
        <div className="counter">{currentCounterStateValue}</div>
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
