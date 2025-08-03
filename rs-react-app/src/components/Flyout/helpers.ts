import type { Character } from '../../types';

export const prepareFile = (characters: Character[]) => {
  const header = `name, gender, location, origin\n`;
  const contentString = characters
    .map((el) => transformObject(el))
    .map((element) => Object.values(element))
    .join('\n');
  const finalString = `${header}${contentString}`;
  const file = new Blob([finalString], { type: 'text/csv' });
  const url = URL.createObjectURL(file);
  return url;
};

const transformObject = (character: Character) => {
  return {
    name: character.name,
    gender: character.gender,
    location: character.location.name,
    origin: character.origin.name,
  };
};
