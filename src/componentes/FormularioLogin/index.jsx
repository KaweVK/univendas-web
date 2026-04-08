import './FormularioLogin.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const labelClassName = 'mb-2 block text-sm font-medium text-slate-700'
const inputClassName =
    'w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-base text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#8a4d94] focus:ring-4 focus:ring-fuchsia-100'

export const FormularioLogin = ({ aoFazerLogin, href }) => {

    const [email, setEmail] = useState('') 
    const [senha, setSenha] = useState('') 

    const aoSalvar = (evento) => {
        evento.preventDefault()
        aoFazerLogin({
            email,
            senha
        })
        setEmail('')
        setSenha('')
    }

    return (
        <section className="h-full">
            <form
                onSubmit={aoSalvar}
                className="flex h-full flex-col justify-center rounded-[28px] bg-white/80 p-6 shadow-[0_24px_70px_-50px_rgba(68,18,74,0.45)] ring-1 ring-slate-200/80 backdrop-blur sm:p-8 lg:min-h-[560px] lg:p-10"
            >
                <div className="mb-8">
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#6b2e74]/70">
                        Acesso
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-[2rem]">
                        Entre na sua conta
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        Use seu email DCX e sua senha para acessar a plataforma.
                    </p>
                </div>

                <div className="space-y-5">
                    <div>
                        <label htmlFor="email" className={labelClassName}>
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            placeholder="Digite o email do login"
                            value={email}
                            onChange={(evento) => setEmail(evento.target.value)}
                            className={inputClassName}
                        />
                    </div>

                    <div>
                        <label htmlFor="senha" className={labelClassName}>
                            Senha
                        </label>
                        <input
                            id="senha"
                            name="senha"
                            type="password"
                            autoComplete="current-password"
                            required
                            placeholder="Digite a sua senha"
                            value={senha}
                            onChange={(evento) => setSenha(evento.target.value)}
                            className={inputClassName}
                        />
                    </div>
                </div>

                <div className="mt-8 space-y-4">
                    <button
                        type="submit"
                        className="w-full rounded-2xl bg-gradient-to-r from-[#47104C] to-[#6A2C70] px-5 py-4 text-base font-semibold text-white transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-fuchsia-200"
                    >
                        Login
                    </button>

                    <p className="text-center text-sm text-slate-500">
                        Ainda nao tem conta?{' '}
                        <Link
                            to={href}
                            className="font-semibold text-[#5a1f62] underline-offset-4 transition hover:underline"
                        >
                            Cadastrar-se
                        </Link>
                    </p>
                </div>
            </form>
        </section>
    )

}
