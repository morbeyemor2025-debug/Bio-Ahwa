import { notFound } from "next/navigation";
import { CLINICS } from "@/lib/demo-data";
import JoinForm from "@/components/JoinForm";

export default async function JoinPage({
  params,
}: {
  params: Promise<{ clinic: string }>;
}) {
  const { clinic } = await params;
  if (!CLINICS[clinic]) notFound();
  return <JoinForm clinicSlug={clinic} />;
}
