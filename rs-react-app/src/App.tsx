import { Component } from 'react';
import './App.css';
import { Results } from './Results';
import { Search } from './Search';
import type { Character, CharactersResponse } from './types';
import { getStoredSearchTerm } from './helpers';

const url = 'https://rickandmortyapi.com/api/character';

export class App extends Component {
  state: { results: Character[]; searchTerm: string; isLoading: boolean } = {
    results: [],
    searchTerm: getStoredSearchTerm(),
    isLoading: true,
  };

  async componentDidMount(): Promise<void> {
    const urlForRequest =
      this.state.searchTerm.length > 0
        ? `${url}?name=${this.state.searchTerm}`
        : url;
    const response = await fetch(urlForRequest);
    if (response.ok) {
      const resposeData: CharactersResponse = await response.json();
      this.setState({ results: resposeData.results });
      this.setState({ isLoading: false });
    }
  }

  handleSearch = async (searchTerm: string) => {
    const urlForRequest = `${url}?name=${searchTerm}`;
    this.setState({ isLoading: true });
    const response = await fetch(urlForRequest);
    if (response.ok) {
      const resposeData: CharactersResponse = await response.json();
      this.setState({ results: resposeData.results });
      this.setState({ isLoading: false });
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
          <Results
            characters={this.state.results}
            isLoading={this.state.isLoading}
          />
        </main>
      </>
    );
  }
}

export default App;
