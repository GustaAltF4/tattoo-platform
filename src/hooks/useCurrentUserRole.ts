import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"

import { supabase } from "@/lib/supabaseClient"

type CurrentUserRoleState = {
  user: User | null
  rol: string | null
  loading: boolean
}

export function useCurrentUserRole(): CurrentUserRoleState {
  const [user, setUser] = useState<User | null>(null)
  const [rol, setRol] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const loadUserRole = async () => {
      setLoading(true)

      const { data } = await supabase.auth.getUser()
      if (!isMounted) return

      const currentUser = data.user ?? null
      setUser(currentUser)

      if (!currentUser) {
        setRol(null)
        setLoading(false)
        return
      }

      const { data: roleData } = await supabase
        .from("usuarios")
        .select("rol")
        .eq("id", currentUser.id)
        .maybeSingle()

      if (!isMounted) return

      setRol(roleData?.rol ?? null)
      setLoading(false)
    }

    void loadUserRole()

    const { data: subscription } = supabase.auth.onAuthStateChange(() => {
      void loadUserRole()
    })

    return () => {
      isMounted = false
      subscription.subscription.unsubscribe()
    }
  }, [])

  return { user, rol, loading }
}
