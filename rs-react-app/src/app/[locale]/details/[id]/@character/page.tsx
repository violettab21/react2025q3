import { Character } from '../../../../../types';
import { CharacterDetails } from '../../../../../components/CharacterDetails/CharacterDetails';
import { url } from '../../../../../constants';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetch(`${url}/${id}`);
  const responseData: Character = await response.json();
  return <CharacterDetails character={responseData} />;
}

/*export default async function Page() {
  return <p>Character</p>;
}*/
