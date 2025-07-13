export interface Character {
  id: number;
  name: string;
  species: string;
  gender: string;
  image: string;
}

export interface CharactersResponse {
  info: {
    count: number;
    pages: number;
  };
  results: Character[];
}
