import SignInForm from "../Components/SignIn/SignInForm";
import { Suspense } from 'react'
import { login } from "./actions"

export default function Login(){
    return (
        <Suspense>
            <SignInForm action={login}/>
        </Suspense>
)
}