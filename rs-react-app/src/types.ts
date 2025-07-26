export interface Character {
  id: number;
  name: string;
  species: string;
  gender: string;
  image: string;
  status: string;
  location: {
    name: string;
  };
}

export interface CharactersResponse {
  info: {
    count: number;
    pages: number;
  };
  results: Character[];
}
