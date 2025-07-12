import { Component } from 'react';
import './App.css';
import { Results } from './Results';
import { Search } from './Search';
import type { Character, CharactersResponse } from './types';
import { getStoredSearchTerm } from './helpers';
import { url, GENERIC_ERROR, NOT_FOUND_MESSAGE } from './constants';

export class App extends Component {
  state: {
    results: Character[];
    searchTerm: string;
    isLoading: boolean;
    requestError: string;
  } = {
    results: [],
    searchTerm: getStoredSearchTerm(),
    isLoading: true,
    requestError: '',
  };

  async handleCharactersRequest(endpoint: string): Promise<void> {
    const response = await fetch(endpoint);
    this.setState({ isLoading: false });
    if (response.ok) {
      const resposeData: CharactersResponse = await response.json();
      this.setState({ results: resposeData.results });
      this.setState({ requestError: '' });
    } else {
      if (response.status === 404) {
        this.setState({ requestError: NOT_FOUND_MESSAGE });
      } else {
        {
          this.setState({ requestError: GENERIC_ERROR });
        }
      }
    }
  }

  handleSearch = async (searchTerm: string) => {
    const urlForRequest = `${url}?name=${searchTerm}`;
    await this.handleCharactersRequest(urlForRequest);
  };

  async componentDidMount(): Promise<void> {
    const urlForRequest =
      this.state.searchTerm.length > 0
        ? `${url}?name=${this.state.searchTerm}`
        : url;
    await this.handleCharactersRequest(urlForRequest);
  }

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
            error={this.state.requestError}
          />
        </main>
      </>
    );
  }
}

export default App;
