import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabaseClient"
import { cn } from "@/lib/utils"
import { useCurrentUserRole } from "@/hooks/useCurrentUserRole"
import {
  BookOpen,
  LayoutDashboard,
  LogIn,
  LogOut,
} from "lucide-react"
import type { ComponentType } from "react"
import { NavLink, useNavigate } from "react-router-dom"

type RoleName = "visitante" | "Alumno" | "Prof"

type SidebarItem = {
  title: string
  href: string
  icon: ComponentType<{ className?: string }>
}

const studentItems: SidebarItem[] = [
  { title: "Mis cursos", href: "/cursos", icon: BookOpen },
]

const professorItems: SidebarItem[] = [
  { title: "Panel profesor", href: "/panelProf", icon: LayoutDashboard },
  { title: "Cursos", href: "/cursos", icon: BookOpen },
]

function getSidebarItems(role: RoleName) {
  if (role === "Prof") return professorItems
  if (role === "Alumno") return studentItems
  return []
}

function getRoleLabel(role: RoleName) {
  if (role === "Prof") return "Profesor"
  if (role === "Alumno") return "Alumno"
  return "Visitante"
}

export function AppSidebar() {
  const navigate = useNavigate()
  const { rol, loading } = useCurrentUserRole()
  const role = rol === "Prof" || rol === "Alumno" ? rol : "visitante"
  const items = getSidebarItems(role)
  const isAuthed = role !== "visitante"

  if (!loading && !isAuthed) {
    return null
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate("/login")
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border/70 bg-[linear-gradient(180deg,rgba(221,0,129,0.08),transparent)]">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              tooltip="Clases V Tattoo"
              className="rounded-lg"
            >
              <NavLink to="/" className="flex items-center gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#DD0081]/20 bg-[#DD0081]/10">
                  <img
                    src="/logo.png"
                    alt="Clases V Tattoo"
                    className="size-7 object-contain"
                  />
                </div>
                <div className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
                  <span className="truncate font-semibold text-sidebar-foreground">
                    HEXAGONIK
                  </span>
                  <span className="truncate text-sidebar-foreground/70">
                    Academia
                  </span>
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {loading ? (
          <SidebarGroup>
            <SidebarGroupLabel className="px-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-sidebar-foreground/55">
              Cargando
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {[1, 2, 3].map((item) => (
                  <SidebarMenuSkeleton key={item} showIcon />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : isAuthed ? (
          <>
            <SidebarGroup>
              <div className="mb-2 flex items-center justify-between px-2">
                <SidebarGroupLabel className="px-0 text-[11px] font-semibold uppercase tracking-[0.24em] text-sidebar-foreground/55">
                  Accesos
                </SidebarGroupLabel>
                <Badge
                  variant="outline"
                  className="border-[#DD0081]/20 bg-[#DD0081]/10 px-2 py-0 text-[10px] font-semibold text-[#DD0081] group-data-[collapsible=icon]:hidden"
                >
                  {getRoleLabel(role)}
                </Badge>
              </div>
              <SidebarGroupContent>
                <SidebarMenu className="gap-1">
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild tooltip={item.title} className="rounded-lg">
                        <NavLink
                          to={item.href}
                          end={item.href === "/"}
                          className={({ isActive }) =>
                            cn(
                              "flex items-center gap-2 rounded-lg px-3 py-2 transition-colors",
                              isActive
                                ? "bg-[#DD0081]/10 text-[#DD0081] shadow-[inset_0_0_0_1px_rgba(221,0,129,0.18)]"
                                : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            )
                          }
                        >
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator className="mx-2 my-2 bg-sidebar-border/70" />

            <SidebarGroup>
              <SidebarGroupLabel className="px-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-sidebar-foreground/55">
                Sesión
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-1">
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Cerrar sesión" className="rounded-lg">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      >
                        <LogOut className="size-4" />
                        <span>Cerrar sesión</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        ) : (
          <SidebarGroup>
            <SidebarGroupLabel className="px-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-sidebar-foreground/55">
              Acceso
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Ingresar" className="rounded-lg">
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-2 rounded-lg px-3 py-2 transition-colors",
                          isActive
                            ? "bg-[#DD0081]/10 text-[#DD0081] shadow-[inset_0_0_0_1px_rgba(221,0,129,0.18)]"
                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        )
                      }
                    >
                      <LogIn className="size-4" />
                      <span>Ingresar</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/70 bg-[#DD0081]/30 group-data-[collapsible=icon]:hidden">
        <div className="flex items-center gap-3 rounded-lg border border-[#DD0081]/15 bg-background px-3 py-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-[#DD0081]/20 text-sm font-semibold text-[#DD0081]">
            {getRoleLabel(role).slice(0, 1)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-sidebar-foreground">
              {getRoleLabel(role)}
            </p>
           
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
