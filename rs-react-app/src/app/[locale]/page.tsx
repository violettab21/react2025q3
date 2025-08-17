import { MainPage } from '../../components/Main/MainPage';
import StoreProvider from '../../store/StoreProvider';
export default function Page() {
  return (
    <StoreProvider>
      <MainPage />
    </StoreProvider>
  );
}
