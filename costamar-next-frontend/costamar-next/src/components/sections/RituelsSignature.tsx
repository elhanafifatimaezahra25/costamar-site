import { getServicesSafe } from "@/lib/getServices";
import RituelsSignatureClient from "./RituelsSignatureClient";

export default async function RituelsSignature() {
  const { services } = await getServicesSafe();

  return <RituelsSignatureClient services={services} />;
}
