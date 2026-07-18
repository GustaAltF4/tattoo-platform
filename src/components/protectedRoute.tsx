import { Navigate, Outlet } from "react-router-dom"
import { supabase } from "@/lib/supabaseClient"
import { useEffect, useState } from "react"

export type ProtectedOutletContext = {
    user: any
    rol: string | null
}


export function ProtectedRoute({allowedRoles}: {allowedRoles?: string[]}) {
    const [user, setUser] = useState<any>(null)
    const [rol, setRol] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {


            const { data } = await supabase.auth.getUser()

            if (!data.user) {
                setLoading(false)
                return
            }

            setUser(data.user)

            const { data: rolData } = await supabase
                .from("usuarios")
                .select(`rol`)
                .eq("id", data.user.id)
                .single()

            setRol(rolData?.rol)
            setLoading(false)
        }

        load()
    }, [])

    if (loading) return null

    if (!user) return <Navigate to="/Unauthenticated" /> 

    if (allowedRoles && !allowedRoles.includes(rol)) {
        return <Navigate to="/unauthorized" />
    }

    const outletContext: ProtectedOutletContext = { user, rol }

    return <Outlet context={outletContext} />
}
