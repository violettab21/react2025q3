import { Component } from 'react';
import './search.css';
import { saveToLocalStorage } from './helpers';

export class Search extends Component<{
  handleSearch: (searchTerm: string) => Promise<void>;
  searchTerm: string;
}> {
  state: { currentSearchValue: string } = {
    currentSearchValue: this.props.searchTerm,
  };

  render() {
    return (
      <div className="searchContainer">
        <p className="searchLabel">Search for Rick and Morty character</p>
        <input
          className="searchInput"
          placeholder="Search"
          value={this.state.currentSearchValue}
          onChange={(e) => {
            this.setState({
              currentSearchValue: e.target.value,
            });
          }}
        ></input>
        <button
          className="searchButton"
          onClick={() => {
            void this.props.handleSearch(this.state.currentSearchValue);
            saveToLocalStorage(this.state.currentSearchValue);
          }}
        >
          Search
        </button>
      </div>
    );
  }
}
