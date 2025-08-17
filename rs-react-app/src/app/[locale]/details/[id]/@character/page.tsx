import { Character } from '../../../../../types';
import { CharacterDetails } from '../../../../components/CharacterDetails/CharacterDetails';
import { url } from '../../../../../constants';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetch(`${url}/${id}f`);
  if (!response.ok) {
    return { message: response.status };
  }

  const responseData: Character = await response.json();

  return <CharacterDetails character={responseData} />;
}
