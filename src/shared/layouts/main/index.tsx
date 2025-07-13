import { useEffect } from "react";
import { APP_ROUTES } from "@app/constant";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";
import { Loading } from "@shared/components/loading";
import { ModeToggle } from "@shared/components/mode-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@shared/components/ui/breadcrumb";
import { Separator } from "@shared/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@shared/components/ui/sidebar";
import { AppSidebar } from "@shared/layouts/main/app-sidebar";
import { useAuthStore } from "@shared/stores/auth";

export default function MainLayout() {
  const { isAuthorized, hydrated, loadAuthFromCookie } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    loadAuthFromCookie();
  }, [loadAuthFromCookie]);

  useEffect(() => {
    if (hydrated && !isAuthorized) {
      navigate(APP_ROUTES.LOGIN, { replace: true });
    }
  }, [hydrated, isAuthorized, navigate]);

  if (!hydrated) return <Loading />;

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="px-4">
            <ModeToggle />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
