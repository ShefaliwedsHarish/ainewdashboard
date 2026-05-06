import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface MainLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function MainLayout({ children, title, subtitle }: MainLayoutProps) {
  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Topbar title={title} subtitle={subtitle} />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
}
