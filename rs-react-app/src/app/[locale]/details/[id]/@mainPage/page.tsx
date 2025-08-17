import { MainPage } from "../../../../../components/Main/MainPage";
import StoreProvider from "../../../../../store/StoreProvider";


export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const { page = '1', search } = await searchParams;
  return (
    <StoreProvider>
      <MainPage page={page} search={search} />
    </StoreProvider>
  );
}
