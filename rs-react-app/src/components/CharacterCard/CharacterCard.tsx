import { Component } from 'react';
import type { Character } from '../../types';
import './characterCard.css';

export class CharacterCard extends Component<{ character: Character }> {
  render() {
    return (
      <div data-testid="card" className="cardContainer">
        <div className="characterImageContainer">
          <img
            className="characterImage"
            src={this.props.character.image}
            alt="character image"
          ></img>
        </div>
        <div className="characterInfo">
          <p>Name: {this.props.character.name}</p>
          <p>Gender: {this.props.character.gender}</p>
          <p>Species: {this.props.character.species}</p>
        </div>
      </div>
    );
  }
}
