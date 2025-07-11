import { Component, createRef } from 'react';
import './search.css';
import { saveToLocalStorage } from './helpers';

export class Search extends Component<{
  handleSearch: (searchTerm: string) => Promise<void>;
  searchTerm: string;
}> {
  inputRef = createRef<HTMLInputElement>();
  state: { currentSearchValue: string } = {
    currentSearchValue: this.props.searchTerm,
  };

  render() {
    return (
      <div className="searchContainer">
        <input
          className="searchInput"
          placeholder="Search"
          ref={this.inputRef}
          value={this.state.currentSearchValue}
          onChange={() => {
            if (this.inputRef.current) {
              this.setState({
                currentSearchValue: this.inputRef.current.value,
              });
            }
          }}
        ></input>
        <button
          className="searchButton"
          onClick={() => {
            let searchTerm = '';
            if (this.inputRef.current) {
              searchTerm = this.inputRef.current.value;
            }
            void this.props.handleSearch(searchTerm);
            saveToLocalStorage(searchTerm);
          }}
        >
          Search
        </button>
      </div>
    );
  }
}
