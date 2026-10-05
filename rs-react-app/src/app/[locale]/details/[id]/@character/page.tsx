import { CharacterDetails } from "../../../../../components/CharacterDetails/CharacterDetails";
import { url } from "../../../../../constants";
import { Character } from "../../../../../types";


export default async function CharacterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetch(`${url}/${id}`, {
    method: 'GET',
    cache: 'force-cache',
    next: {
      tags: [`character-${id}`],
    },
  });
  if (!response.ok) {
    return { message: response.status };
  }

  const responseData: Character = await response.json();

  return <CharacterDetails character={responseData} />;
}
