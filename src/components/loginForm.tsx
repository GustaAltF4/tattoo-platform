import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/lib/supabaseClient"
import { toast } from "sonner"
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react"

import { Popover, PopoverDescription, PopoverTrigger } from "./ui/popover"
import { PopoverContent } from "./ui/popover"


export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [email, setEmail] = useState("") // Estado para almacenar el usuario autenticado
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()

        try {
            setLoading(true)

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            })

            if (error) {
                toast.error(error.message)
                return
            }

            toast.success("Inicio de sesión exitoso")

            const user = data.user

            const { data: usuarios, error: roleError } = await supabase
                .from("usuarios")
                .select(`
                    rol
                `)
                .eq("id", user.id)
                .single()

            if (roleError || !usuarios) {
                toast.error("Error al obtener el rol del usuario")
                return
            }

            if (usuarios.rol === "Alumno") {
                navigate("/cursos")
            }

            if (usuarios.rol === "Prof") {
                navigate("/panelProf")
            }


        } finally {
            setLoading(false)
        }
    }
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8" onSubmit={handleLogin}>
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold text-[#DD0081]">Iniciar Sesión</h1>
                                <p className="text-balance text-primary">
                                    Ingresa a tu cuenta para poder acceder a la plataforma
                                </p>
                            </div>
                            <Field>
                                <FieldLabel htmlFor="email" className="text-[#DD0081]">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password" className="text-[#DD0081]">Contraseña</FieldLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button
                                                type="button"
                                                className="ml-auto text-sm underline-offset-2 hover:underline"
                                            >
                                                ¿Olvidaste tu contraseña?
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="text-center w-50">
                                            <PopoverDescription>Contactanos por Whatsapp y te ayudaremos a recuperar tu contraseña.</PopoverDescription>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="relative group">
                                    <Input id="password" type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}

                                        required />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4.5 top-1/2 -translate-y-1/2 text-muted-foreground opacity-30 hover:opacity-100 transition-opacity focus:outline-none"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </Field>
                            <Field>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    // El botón sí mantiene su sombreado y color para destacar
                                    className="w-full h-8 rounded-lg text-[11px] font-black uppercase tracking-[0.3em]  transition-all active:scale-95 group relative overflow-hidden"
                                >
                                    {loading ? (
                                        <Loader2 className="animate-spin" size={18} />
                                    ) : (
                                        <div className="flex items-center justify-center gap-2.5">
                                            Iniciar Sesión<ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform shrink-0" />
                                        </div>
                                    )}
                                </Button>
                            </Field>
                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">

                            </FieldSeparator>

                            <FieldDescription className="text-center">
                                ¿No tienes una cuenta y quieres acceder a nuestros cursos?<br />
                                <a href="/cursoshome">Click aqui</a>
                            </FieldDescription>
                        </FieldGroup>
                    </form>
                    <div className="relative hidden bg-muted md:block">
                        <img
                            src="https://images.unsplash.com/photo-1564426622559-5af68da63b96?q=80&w=700"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.5]  "
                        />
                    </div>
                </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">

            </FieldDescription>
        </div>
    )
}
