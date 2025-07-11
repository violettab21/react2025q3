import { Component } from 'react';
import './results.css';
import type { CharactersResponse, Character } from './types';
import { CharacterCard } from './CharacterCard';

const url = 'https://rickandmortyapi.com/api/character?page=1&limit=30';

export class Results extends Component {
  state: { results: Character[] } = {
    results: [],
  };

  async componentDidMount(): Promise<void> {
    const response = await fetch(url);
    if (response.ok) {
      const resposeData: CharactersResponse = await response.json();
      this.setState({ results: resposeData.results });
    }
  }

  render() {
    return (
      <div className="resultsContainer">
        {this.state.results.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    );
  }
}
