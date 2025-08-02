import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // You can add sidebar, header, etc. here
  return (
    <div className="dashboard-layout bg-blue-50">
      {/* Dashboard navigation/sidebar can go here */}
      <main>{children}</main>
    </div>
  );
}
