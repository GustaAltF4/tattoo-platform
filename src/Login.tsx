import { LoginForm } from "@/components/loginForm"


export default function Login() {
    return (
         <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <img
              src="https://images.unsplash.com/photo-1564426622559-5af68da63b96?q=80&w=700"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover brightness-[0.5] dark:brightness-[0.2] z-1 md:hidden" 
            />
            
            <div className="w-full max-w-sm  md:max-w-4xl z-2">
                <LoginForm />
            </div>
        </div>

    )
}