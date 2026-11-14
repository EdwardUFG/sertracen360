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

const services = [
    {
        title: 'Pago de multas',
        icon: (
            <>
                <rect x="4" y="5" width="16" height="14" rx="2" />
                <path d="M8 9h8M8 12h5M8 15h3" />
            </>
        ),
    },
    {
        title: 'Consulta de placas',
        icon: (
            <>
                <circle cx="10.8" cy="10.8" r="6.3" />
                <path d="m16 16 4 4M8 10.8h5.6M10.8 8v5.6" />
            </>
        ),
    },
    {
        title: 'Agendar cita',
        icon: (
            <>
                <rect x="4" y="5" width="16" height="15" rx="2" />
                <path d="M8 3v4M16 3v4M4 10h16M8 14h2M14 14h2M8 17h2" />
            </>
        ),
    },
    {
        title: 'Renovación de licencia',
        icon: (
            <>
                <path d="M20 11a8 8 0 0 0-14.8-4L4 9" />
                <path d="M4 4v5h5M4 13a8 8 0 0 0 14.8 4L20 15" />
                <path d="M20 20v-5h-5" />
            </>
        ),
    },
    {
        title: 'Historial de trámites',
        icon: (
            <>
                <circle cx="12" cy="12" r="8" />
                <path d="M12 8v4l2.5 1.5M9 3h6" />
            </>
        ),
    },
];

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

            <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
                <section className="overflow-hidden rounded-2xl bg-gradient-to-r from-blue-100 via-sky-50 to-blue-200 px-6 py-8 sm:px-10 sm:py-10">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-800">
                        Bienvenido a
                    </p>
                    <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        SERTRACEN
                    </h1>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-slate-700 sm:text-base">
                        Consulta y gestiona tus servicios de tránsito de forma
                        rápida y segura.
                    </p>
                </section>

               <section aria-label="Servicios principales">
    <div className="grid gap-4 md:grid-cols-3">
        <Link
            href={route('vehiculos.index')}
            className="group flex min-h-32 flex-col justify-between rounded-2xl bg-blue-50 p-4 text-slate-800 transition hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            aria-label="Ir al módulo de Vehículos"
        >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                <Icon>
                    <path d="M5 16v-3l1.5-5h11L19 13v3" />
                    <path d="M4 16h16M7 16v2m10-2v2M7 12h.01M17 12h.01" />
                    <path d="M6.5 8h11" />
                </Icon>
            </div>
            <div className="flex items-end justify-between gap-3">
                <div>
                    <h2 className="text-lg font-bold">Vehículos</h2>
                    <p className="mt-1 text-sm text-slate-600">
                        Consulta, registra y gestiona la información de tus vehículos.
                    </p>
                </div>
                <span className="mb-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 transition group-hover:translate-x-1">
                    <Icon className="h-4 w-4">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                    </Icon>
                </span>
            </div>
        </Link>

        <Link
            href={route('licencias.index')}
            className="group flex min-h-32 flex-col justify-between rounded-2xl bg-emerald-50 p-4 text-slate-800 transition hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
            aria-label="Ir al módulo de Licencias"
        >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <Icon>
                    <rect x="5" y="3.5" width="14" height="17" rx="2" />
                    <path d="M9 8h6M9 12h6M9 16h3" />
                </Icon>
            </div>
            <div className="flex items-end justify-between gap-3">
                <div>
                    <h2 className="text-lg font-bold">Licencias</h2>
                    <p className="mt-1 text-sm text-slate-600">
                        Revisa el estado de tu licencia y gestiona renovaciones.
                    </p>
                </div>
                <span className="mb-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 transition group-hover:translate-x-1">
                    <Icon className="h-4 w-4">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                    </Icon>
                </span>
            </div>
        </Link>

        <div className="flex min-h-32 flex-col justify-between rounded-2xl bg-amber-50 p-4 text-slate-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                <Icon>
                    <path d="M6 4h12v16l-6-3-6 3V4Z" />
                    <path d="M9 8h6M9 11h6M9 14h4" />
                </Icon>
            </div>
            <div>
                <h2 className="text-lg font-bold">Trámites</h2>
                <p className="mt-1 text-sm text-slate-600">
                    Realiza tus trámites en línea de forma fácil y segura.
                </p>
            </div>
        </div>
    </div>
</section>
                <section aria-labelledby="services-heading">
                    <h2
                        id="services-heading"
                        className="text-lg font-bold text-slate-900"
                    >
                        Servicios más utilizados
                    </h2>
                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                        {services.map((service) => (
                            <div
                                key={service.title}
                                className="flex min-h-28 flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-center text-sm font-medium text-slate-700"
                            >
                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                                    <Icon className="h-5 w-5">{service.icon}</Icon>
                                </span>
                                <span>{service.title}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}