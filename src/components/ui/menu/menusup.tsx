import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "@/components/ui/darkmode/mode-toggle"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { useCurrentUserRole } from "@/hooks/useCurrentUserRole"
import { GraduationCap, Home, Package, User } from "lucide-react"
import type { ComponentType } from "react"
import { NavLink } from "react-router-dom"

type MenuItem = {
  title: string
  href: string
  icon: ComponentType<{ className?: string }>
}

const publicItems: MenuItem[] = [
  { title: "Inicio", href: "/", icon: Home },
  { title: "Cursos", href: "/cursoshome", icon: GraduationCap },
  { title: "Kits", href: "/kits", icon: Package },
  { title: "Login", href: "/login", icon: User },
]

function getRoleLabel(role: "visitante" | "Alumno" | "Prof") {
  if (role === "Prof") return "Profesor"
  if (role === "Alumno") return "Alumno"
  return "Visitante"
}

export function Menu() {
  const { rol, loading } = useCurrentUserRole()
  const role = rol === "Prof" || rol === "Alumno" ? rol : "visitante"
  const showSidebarToggle = role !== "visitante"

  const menuItems = publicItems.filter((item) => {
    if (item.href === "/login" && role !== "visitante") return false
    return true
})
return (
  <header className="sticky top-0 z-20 flex h-14 min-w-0 items-center gap-3 border-b border-[#DD0081]/15 bg-background/95 px-3 backdrop-blur supports-[backdrop-filter]:bg-background/85 md:px-4">
    <div className="flex shrink-0 items-center gap-2">
      {showSidebarToggle ? (
        <SidebarTrigger className="text-[#DD0081] hover:bg-[#DD0081]/10 hover:text-[#DD0081]" />
      ) : (
        <div className="h-5 w-px" />
      )}
    </div>

    <div className="min-w-0 flex-1 overflow-hidden">
      <NavigationMenu
        viewport={false}
        className="w-full justify-start overflow-x-auto"
      >
        <NavigationMenuList className="min-w-max gap-1">
          {loading
            ? [1, 2, 3, 4].map((item) => (
                <NavigationMenuItem key={item}>
                  <Skeleton className="h-8 w-20 rounded-lg" />
                </NavigationMenuItem>
              ))
            : menuItems.map((item) => (
              
                <NavigationMenuItem key={item.title} >
                  <NavigationMenuLink asChild className="rounded-lg">
                    <NavLink
                      to={item.href}
                      end={item.href === "/"}
                      className={({ isActive }) =>
                        cn(
                          navigationMenuTriggerStyle(),
                          "rounded-lg border border-transparent px-3 py-2 text-sm transition-colors",
                          isActive
                            ? "text-[#DD0081] shadow-sm"
                            : "text-muted-foreground hover:bg-[#DD0081]/8 hover:text-foreground"
                        )
                      }
                    >
                      <item.icon className="size-4 shrink-0" />
                      <span>{item.title}</span>
                    </NavLink>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
              ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>

    <div className="ml-auto flex shrink-0 items-center gap-2">
      <Badge
        variant="outline"
        className="border-[#DD0081]/20 bg-[#DD0081]/10 px-2 py-0 text-[5px] font-semibold uppercase tracking-[0.2em] text-[#DD0081] max-sm:hidden"
      >
        {getRoleLabel(role)}
      </Badge>

      <ModeToggle />
    </div>
  </header>
)
}
