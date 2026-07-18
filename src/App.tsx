
import { ThemeProvider } from "@/components/ui/darkmode/theme-provider"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/sidebar/app-sidebar"
import { Menu } from "@/components/ui/menu/menusup"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Outlet } from "react-router-dom"
function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="min-w-0 ">
            <Menu />
          
            <Outlet />
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default App
