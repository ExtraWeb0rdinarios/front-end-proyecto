import SignInForm from "../Components/SignIn/SignInForm";
import { Suspense } from 'react'

export default function Login() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <SignInForm />
    </Suspense>
  )
}