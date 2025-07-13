import { Component } from 'react';
import './main.css';
import type { Character, CharactersResponse } from '../../types';
import { getStoredSearchTerm } from '../../helpers';
import { GENERIC_ERROR, NOT_FOUND_MESSAGE, url } from '../../constants';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { Search } from '../Search/Search';
import { Results } from '../Results/Results';
import { ErrorButton } from '../ErrorBoundary/ErrorButton';

export class Main extends Component {
  state: {
    results: Character[];
    isLoading: boolean;
    requestError: string;
  } = {
    results: [],
    isLoading: true,
    requestError: '',
  };

  async handleCharactersRequest(endpoint: string): Promise<void> {
    try {
      this.setState({ isLoading: true });
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
    } catch {
      this.setState({ requestError: GENERIC_ERROR });
    }
  }

  handleSearch = async (searchTerm: string) => {
    const urlForRequest = `${url}?name=${searchTerm}`;
    await this.handleCharactersRequest(urlForRequest);
  };

  async componentDidMount(): Promise<void> {
    const storedSearchValue = getStoredSearchTerm();
    const urlForRequest =
      storedSearchValue.length > 0 ? `${url}?name=${storedSearchValue}` : url;
    await this.handleCharactersRequest(urlForRequest);
  }

  render() {
    return (
      <main className="main">
        <ErrorBoundary fallback={GENERIC_ERROR}>
          <Search handleSearch={this.handleSearch} />
          <ErrorButton />
          <Results
            characters={this.state.results}
            isLoading={this.state.isLoading}
            error={this.state.requestError}
          />
        </ErrorBoundary>
      </main>
    );
  }
}
