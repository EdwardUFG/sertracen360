import { Head, Link } from '@inertiajs/react';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-white font-sans overflow-hidden">
            <Head title="Bienvenidos | Sertracen en Línea" />

            {/* Header / Navbar con imagen combinada - Logo más pequeño */}
            <nav className="flex items-center px-4 sm:px-6 lg:px-8 py-3 border-b border-gray-200">
                <img 
                    src="/images/sertracen.png" 
                    alt="Logos Sertracen y VMT" 
                    className="h-8 w-auto object-contain" 
                />
            </nav>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-12 flex flex-col lg:flex-row items-start justify-between relative">
                
                {/* Columna Izquierda - Textos y Botones */}
                <div className="w-full lg:w-1/2 space-y-6 z-10 lg:pt-8">
                    <h1 className="text-3xl sm:text-4xl lg:text-[42px] text-gray-800 leading-tight">
                        Hola bienvenido(a) a <br />
                        <span className="text-[#0f2d5c] font-semibold tracking-wide">SERTRACEN</span>{' '}
                        <span className="inline-block bg-[#3b82f6] text-white px-3 py-1 rounded-lg font-semibold text-2xl sm:text-3xl lg:text-[38px] ml-1 shadow-sm">
                            EN LÍNEA.
                        </span>
                    </h1>
                    
                    <h2 className="text-3xl lg:text-4xl font-bold text-[#0f2d5c] mt-2">
                        Ahora más rápido, fácil y seguro
                    </h2>

                    <p className="text-gray-700 text-lg max-w-lg mt-6 leading-relaxed">
                        Nuestro sitio web sigue habilitado, haz clic en <span className="font-bold">continuar en nuestro sitio WEB</span> o inicia sesión para realizar trámites fuera de este portal.
                    </p>

                    {/* Contenedor flex en fila para evitar que el botón se estire */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6">
                        <a 
                            href="https://www.sertracen.com.sv/index.php" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#1e3863] hover:bg-[#0f2d5c] text-white text-center font-bold py-3 px-5 sm:px-8 rounded-[2rem] transition-colors duration-300 flex items-center justify-center leading-tight shadow-md whitespace-nowrap"
                        >
                            Continuar en nuestro<br/>sitio WEB
                        </a>
                        
                        <Link 
                            href={route('login')} 
                            className="border-[1.5px] border-[#1e3863] text-[#1e3863] hover:bg-blue-50 text-center font-semibold py-3 px-5 sm:px-8 rounded-[2rem] transition-colors duration-300 flex items-center justify-center leading-tight whitespace-nowrap"
                        >
                            <span className="font-bold mr-1">Login</span> Ingreso de<br/>trámite
                        </Link>
                    </div>
                </div>

                {/* Columna Derecha - Imagen y Fondo Curvo */}
                {/* Se agregó lg:-mt-24 y transform -translate-y-8 para forzar a la chica a subir al área celeste */}
                <div className="order-first lg:order-last w-full lg:w-1/2 mb-6 lg:mb-0 relative flex justify-center lg:justify-end lg:-mt-24 lg:-translate-y-4">
                    
                    {/* Fondo azul claro asimétrico (Blob) */}
                    <div className="absolute w-[90%] h-[110%] bg-[#edf3ff] rounded-tl-[100px] rounded-br-[150px] rounded-tr-[50px] rounded-bl-[200px] -z-10 top-0 right-0 transform -rotate-6"></div>
                    
                    {/* Imagen de la chica */}
                    <img 
                        src="/images/chica-sertracen.png" 
                        alt="Usuario Sertracen" 
                        className="w-auto max-w-full h-[min(35vh,280px)] sm:h-[min(45vh,360px)] lg:h-[580px] object-cover object-top drop-shadow-2xl rounded-b-3xl"
                    />
                </div>
            </main>

            {/* Icono de Chatbot Flotante */}
            <div className="fixed bottom-8 right-8 z-50">
                <button className="bg-[#0f2d5c] p-3 rounded-2xl shadow-xl hover:bg-[#1e3863] transition-colors">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
}