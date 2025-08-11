"use client";
import React, { FC } from "react";
import DashboardComp from "@/components/pages/dashboard";
import { AuthenticatedLayout, GeneralLayout } from "@/components/layouts";

const Dashboard: FC = () => {
  let title = "Dashboard";

  return (
    <AuthenticatedLayout title={title}>
      <DashboardComp />
    </AuthenticatedLayout>
  );
};

export default Dashboard;
