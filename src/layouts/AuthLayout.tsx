import Logo from "@/components/Logo";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {
  return (
    <>
      <div className="min-h-screen bg-auth-gradient flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center">
            <Logo className="w-36 h-auto" />
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <Outlet />
          </div>
        </div>
      </div>
      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </>
  )
}
