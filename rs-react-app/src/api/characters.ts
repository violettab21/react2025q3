import type { CharactersResponse } from '../types';

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
