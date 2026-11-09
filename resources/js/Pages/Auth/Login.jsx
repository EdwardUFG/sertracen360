import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        documento_identidad: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#4a85f6]">
            <Head title="Iniciar Sesión | Sertracen" />

            {/* Contenedor tipo Tarjeta */}
            <div className="w-full max-w-md bg-[#f4f7fb] rounded-[2rem] shadow-2xl p-8 sm:p-10 mx-4 flex flex-col items-center">
                
                {/* Cuadro Azul Superior con Logos */}
                <div className="bg-[#3366d6] rounded-2xl w-full py-4 flex items-center justify-center shadow-inner mb-6">
                    <img 
                        src="/images/sertracen_vmt.png" 
                        alt="Logos VMT y Sertracen" 
                        /* El filtro brightness-0 invert convierte la imagen oscura en blanca automáticamente */
                        className="h-8 object-contain filter brightness-0 invert" 
                    />
                </div>

                {/* Títulos */}
                <h1 className="text-3xl font-bold text-[#3366d6] mb-1">Sertracen</h1>
                <p className="text-gray-500 font-medium mb-8 text-sm sm:text-base">Sistema de Exámenes de Manejo</p>

                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                <form onSubmit={submit} className="w-full">
                    {/* Campo Documento de Identidad (Reemplaza al Correo) */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2 pl-2 pr-1">
                            <label className="text-gray-800 font-bold text-sm" htmlFor="documento_identidad">
                                Documento de Identidad
                            </label>
                            
                            {/* Ícono de Ayuda (Tooltip) UX */}
                            <div className="group relative cursor-pointer flex items-center justify-center w-6 h-6 rounded-full hover:bg-blue-100 transition-colors">
                                <svg className="w-4 h-4 text-gray-500 group-hover:text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                                <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-gray-800 text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg leading-relaxed">
                                    Si eres persona natural, ingresa tu DUI. Si deseas consultar los trámites de una persona jurídica, ingresa el NIT empresarial.
                                </div>
                            </div>
                        </div>
                        <input
                            id="documento_identidad"
                            type="text"
                            value={data.documento_identidad}
                            onChange={(e) => setData('documento_identidad', e.target.value)}
                            className="w-full px-5 py-3 rounded-full border border-gray-200 focus:border-[#3366d6] focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-700 shadow-sm"
                            placeholder="Ej. 01234567-8 o NIT"
                            required
                        />
                        {errors.documento_identidad && (
                            <p className="text-red-500 text-xs mt-2 ml-4 font-medium">{errors.documento_identidad}</p>
                        )}
                    </div>

                    {/* Campo Contraseña */}
                    <div className="mb-8 relative">
                        <label className="block text-gray-800 font-bold text-sm mb-2 pl-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full px-5 py-3 rounded-full border border-gray-200 focus:border-[#3366d6] focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-700 shadow-sm pr-12"
                            placeholder="••••••••"
                            required
                        />
                        
                        {/* Botón de visibilidad de contraseña */}
                        <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-[38px] text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {showPassword ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                )}
                            </svg>
                        </button>
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-2 ml-4 font-medium">{errors.password}</p>
                        )}
                    </div>

                    {/* Botón de Inicio de Sesión */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-[#3366d6] hover:bg-[#254fb8] text-white font-bold py-3 px-4 rounded-full shadow-lg transition-all transform hover:scale-[1.02] disabled:opacity-75 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        Iniciar Sesión
                    </button>
                </form>

                {/* Enlaces de pie de página */}
                <div className="mt-8 flex flex-col items-center space-y-3 text-sm font-medium text-gray-500">
                    <Link href={route('register')} className="hover:text-[#3366d6] transition-colors">
                        ¿Primera vez? Crear cuenta nueva
                    </Link>
                    <Link href={route('password.request')} className="hover:text-[#3366d6] transition-colors">
                        Recuperar contraseña
                    </Link>
                </div>
            </div>
        </div>
    );
}