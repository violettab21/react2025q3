import { Component } from 'react';
import './results.css';
import type { Character } from './types';
import { CharacterCard } from './CharacterCard';

export class Results extends Component<{ characters: Character[] }> {
  render() {
    return (
      <div className="resultsContainer">
        {this.props.characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    );
  }
}
