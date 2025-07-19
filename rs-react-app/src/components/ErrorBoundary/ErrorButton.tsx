import { Component } from 'react';
import './errorBoundary.css';

export class ErrorButton extends Component {
  state = {
    isErrorClicked: false,
  };

  componentDidUpdate(): void {
    if (this.state.isErrorClicked) throw new Error('Test Error');
  }

  render() {
    return (
      <div className="errorButtonContainer">
        <button
          className="errorButton"
          onClick={() => {
            this.setState({ isErrorClicked: true });
          }}
        >
          Emulate Error
        </button>
      </div>
    );
  }
}
