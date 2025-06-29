import { DashboardNavbar, DashboardSidebar } from "@/components";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

interface Props {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className="flex flex-col h-screen w-screen bg-muted">
                <DashboardNavbar/>
                {children}
            </main>
        </SidebarProvider>
    )
}

export default Layout;
