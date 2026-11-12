import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

function Icon({ children, className = 'h-6 w-6' }) {
    return (
        <svg
            aria-hidden="true"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
        >
            {children}
        </svg>
    );
}

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Inicio
                </h2>
            }
        >
            <Head title="Inicio" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Módulos del Sistema</h3>
                        
                        <div className="grid gap-4 md:grid-cols-3">
                            {/* Tarjeta de Traspaso de Dominio */}
                            <div className="flex min-h-32 flex-col justify-between rounded-2xl bg-blue-50 p-4 text-slate-800 border border-blue-100">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                                    <Icon>
                                        <path d="M5 16v-3l1.5-5h11L19 13v3" />
                                        <path d="M4 16h16M7 16v2m10-2v2M7 12h.01M17 12h.01" />
                                        <path d="M6.5 8h11" />
                                    </Icon>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold">Traspaso de Dominio</h4>
                                    <p className="mt-1 text-sm text-slate-600">
                                        Gestiona el traspaso de propiedad de tus vehículos de forma segura.
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <Link
                                        href={route('traspasos.index')}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700"
                                    >
                                        Ir a Traspasos
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}