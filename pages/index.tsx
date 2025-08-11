import { AuthenticatedLayout } from "@/components/layouts";
import DashboardComp from "@/components/pages/dashboard";

export default function Home() {
  let title = "Dashboard";

  return (
    <AuthenticatedLayout title={title}>
      <DashboardComp />
    </AuthenticatedLayout>
  );
}
