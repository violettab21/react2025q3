import { Component } from 'react';
import './App.css';
import { Results } from './Results';
import { Search } from './Search';
import type { Character, CharactersResponse } from './types';
import { getStoredSearchTerm } from './helpers';

const url = 'https://rickandmortyapi.com/api/character?page=1&limit=30';

export class App extends Component {
  state: { results: Character[]; searchTerm: string } = {
    results: [],
    searchTerm: getStoredSearchTerm(),
  };

  async componentDidMount(): Promise<void> {
    const urlForRequest =
      this.state.searchTerm.length > 0
        ? `${url}&name=${this.state.searchTerm}`
        : url;
    const response = await fetch(urlForRequest);
    if (response.ok) {
      const resposeData: CharactersResponse = await response.json();
      this.setState({ results: resposeData.results });
    }
  }

  handleSearch = async (searchTerm: string) => {
    const url = `https://rickandmortyapi.com/api/character?page=1&limit=30&name=${searchTerm}`;
    const response = await fetch(url);
    if (response.ok) {
      const resposeData: CharactersResponse = await response.json();
      this.setState({ results: resposeData.results });
    }
  };

  render() {
    return (
      <>
        <main className="main">
          <Search
            handleSearch={this.handleSearch}
            searchTerm={this.state.searchTerm}
          />
          <Results characters={this.state.results} />
        </main>
      </>
    );
  }
}

export default App;
