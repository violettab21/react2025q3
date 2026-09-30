'use server';
import type { Character } from '../../types';

export const prepareFile = async (characters: Character[]) => {
  const header = `name, gender, location, origin\n`;
  const contentString = characters
    .map((el) => {
      return {
        name: el.name,
        gender: el.gender,
        location: el.location.name,
        origin: el.origin.name,
      };
    })
    .map((element) => Object.values(element))
    .join('\n');
  const finalString = `${header}${contentString}`;

  return finalString;
};
