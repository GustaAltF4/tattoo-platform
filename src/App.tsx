import { ThemeProvider, useTheme } from "@/components/ui/darkmode/theme-provider"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/sidebar/app-sidebar"
import { Menu } from "@/components/ui/menu/menusup"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Outlet } from "react-router-dom"
import ShapeGrid from "./components/ShapeGrid"

function AppShell() {
  const { theme } = useTheme()
  const systemPrefersDark =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  const isDark = theme === "dark" || (theme === "system" && systemPrefersDark)

  const borderColor = isDark
    ? "rgba(196, 196, 196, 0.22)"
    : "rgba(74, 66, 78, 0.14)"
  const hoverFillColor = isDark
    ? "rgba(221, 0, 129, 0.28)"
    : "rgba(221, 0, 129, 0.12)"
  const fadeColor = isDark ? "#120F17" : "rgba(250, 250, 250, 0.9)"

  return (
    <div className="relative isolate min-h-screen bg-background">
      <div className="fixed inset-0 z-0 overflow-hidden">
        <ShapeGrid
          speed={0.2}
          squareSize={40}
          direction="diagonal"
          borderColor={borderColor}
          hoverFillColor={hoverFillColor}
          fadeColor={fadeColor}
          shape="hexagon"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_center,rgba(221,0,129,0.06)_0%,transparent_55%)] dark:bg-[radial-gradient(circle_at_center,rgba(221,0,129,0.12)_0%,transparent_55%)]"
      />

      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="relative z-10 min-w-0 bg-transparent">
          <Menu />
          <main className="relative z-10">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <TooltipProvider>
        <AppShell />
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default App
