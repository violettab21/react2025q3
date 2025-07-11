import { Component } from 'react';
import './search.css';

export class Search extends Component {
  render() {
    return (
      <div className="searchContainer">
        <input className="searchInput" placeholder="Search"></input>
        <button className="searchButton">Search</button>
      </div>
    );
  }
}
