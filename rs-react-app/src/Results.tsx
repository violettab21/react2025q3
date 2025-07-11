import { Component } from 'react';
import './results.css';

export class Results extends Component {
  render() {
    return (
      <div className="resultsContainer">
        <div className="resultHeader">
          <p className="columnName">Name</p>
          <p className="columnDescription">Description</p>
        </div>
        <div className="resultRows"></div>
      </div>
    );
  }
}
