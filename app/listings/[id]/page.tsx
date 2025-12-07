import { ListingsCardDetailSection } from "@/src/widgets/listingsSection";

export default function Page({ params }: { params: { id: string } }) {
  return <ListingsCardDetailSection id={params.id} />;
}
