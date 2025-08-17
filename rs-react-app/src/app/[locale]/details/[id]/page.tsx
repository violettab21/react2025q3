import { CharacterDetails } from '../../../../components/CharacterDetails/CharacterDetails';
import { url } from '../../../../constants';
import { Character } from '../../../../types';

export default async function CharacterDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetch(`${url}/${id}`);
  const responseData: Character = await response.json();
  return <CharacterDetails character={responseData} />;
}
