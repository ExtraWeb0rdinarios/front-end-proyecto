'use client' 
import styles from './SignInForm.module.css'
import { useSearchParams } from 'next/navigation'
// IMPORTACIÓN DIRECTA: Modifica la ruta si tu estructura es distinta
import { login } from '../../Login/actions' 

export default function SignInForm() { // <-- Ya no recibe props
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Logo institución"
          src='/imagenes/aca-logo.jpeg'
          className="mx-auto h-30 w-auto"
        />
        <h2 className="mt-3 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Inicia sesión
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {/* Error de credenciales */}
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Apunta directamente a la función importada */}
        <form action={login} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Correo electrónico
            </label>
            <div className="mt-2">
              <input
                id="email" name="email" type="email"
                required autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Contraseña
              </label>
              <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <div className="mt-2">
              <input
                id="password" name="password" type="password"
                required autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          ¿No estás registrado?{' '}
          <a href="/registro" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Regístrate ahora
          </a>
        </p>
      </div>
    </div>
  )
}