import { CharacterDetails } from '../../../components/CharacterDetails/CharacterDetails';
import { MainPage } from '../../../components/Main/MainPage';
import StoreProvider from '../../../store/StoreProvider';

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <StoreProvider>
      <MainPage></MainPage>
      <CharacterDetails params={Promise.resolve(params)} />
    </StoreProvider>
  );
}
