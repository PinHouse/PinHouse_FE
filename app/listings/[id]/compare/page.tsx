import { ListingsCompareRoomPage } from "@/src/widgets/listingsSection";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ListingsCompareRoomPage id={id} />;
}
