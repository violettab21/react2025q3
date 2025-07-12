import { Component } from 'react';
import './results.css';
import type { Character } from './types';
import { CharacterCard } from './CharacterCard';

export class Results extends Component<{
  characters: Character[];
  isLoading: boolean;
  error: string;
}> {
  render() {
    if (this.props.error) return <p>{this.props.error}</p>;
    return (
      <div className="resultsContainer">
        {this.props.isLoading ? (
          <span className="loader"></span>
        ) : (
          this.props.characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))
        )}
      </div>
    );
  }
}
