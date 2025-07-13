import { Component } from 'react';
import './search.css';
import { getStoredSearchTerm, saveToLocalStorage } from '../../helpers';

export class Search extends Component<{
  handleSearch: (searchTerm: string) => Promise<void>;
}> {
  state: { currentSearchValue: string } = {
    currentSearchValue: getStoredSearchTerm(),
  };

  render() {
    return (
      <div className="searchContainer">
        <p className="searchLabel">Search for Rick and Morty character:</p>
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
            const search = this.state.currentSearchValue.trim();
            void this.props.handleSearch(search);
            saveToLocalStorage(search);
          }}
        >
          Search
        </button>
      </div>
    );
  }
}
