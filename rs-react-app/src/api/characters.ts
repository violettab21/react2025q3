import { url } from '../constants';
import type { Character, CharactersResponse } from '../types';

export async function getCharacters(
  endpoint: string
): Promise<CharactersResponse> {
  let responseData: CharactersResponse;
  const response = await fetch(endpoint);

  if (response.ok) {
    responseData = await response.json();
  } else {
    throw new Error(`${response.status}`);
  }
  return responseData;
}

export async function getCharacter(id: string): Promise<Character> {
  let responseData: Character;
  const response = await fetch(`${url}/${id}`);

  if (response.ok) {
    responseData = await response.json();
  } else {
    throw new Error(`${response.status}`);
  }
  return responseData;
}
