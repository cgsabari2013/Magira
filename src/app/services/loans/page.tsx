import { getService } from "@/config/services";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { pageMeta } from "@/lib/seo";

const service = getService("loans");

export const metadata = pageMeta(service.seoTitle, service.seoDescription, service.href);

export default function Page() {
  return <ServiceDetail service={service} />;
}
