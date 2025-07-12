import { Component } from 'react';

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
          onClick={() => {
            this.setState({ isErrorClicked: true });
          }}
        >
          Error
        </button>
      </div>
    );
  }
}
