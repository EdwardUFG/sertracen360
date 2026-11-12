
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function Index({
    auth,
    licencia,
    tipoPersona,
    tieneMultasPendientes
}) {

    const { post, processing } = useForm();
    const { flash = {} } = usePage().props;

    // Verificar si la refrenda fue aprobada
    const refrendaAprobada = flash.estadoRefrenda === 'Aprobada';

    // Formatear fechas correctamente
    const fecha = (valor) => {
        if (!valor) return 'No disponible';

        const fechaLimpia = String(valor).substring(0, 10);
        const partes = fechaLimpia.split('-');

        if (partes.length !== 3) return 'No disponible';

        const [anio, mes, dia] = partes.map(Number);
        const fechaCorrecta = new Date(anio, mes - 1, dia);

        if (Number.isNaN(fechaCorrecta.getTime())) {
            return 'No disponible';
        }

        return fechaCorrecta.toLocaleDateString('es-SV', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

    // Estado de la licencia
    const estado = licencia?.estado ?? 'Sin registro';

    const colorEstado = {
        Vigente: 'bg-green-100 text-green-700',
        Vencida: 'bg-red-100 text-red-700',
        Suspendida: 'bg-yellow-100 text-yellow-700',
    };

    // Identificar tipo de persona
    const esPersonaNatural = tipoPersona === 'Natural';
    const esPersonaJuridica = tipoPersona === 'Juridica';

    // Determinar si puede solicitar la refrenda
    const puedeContinuar =
        esPersonaNatural &&
        !tieneMultasPendientes &&
        licencia?.estado === 'Vigente' &&
        !refrendaAprobada;

    // Enviar solicitud de refrenda
    const solicitarRefrenda = () => {
        if (!puedeContinuar || processing) return;

        const confirmar = window.confirm(
            '¿Deseás confirmar la refrenda de tu licencia? La nueva vigencia será de cinco años.'
        );

        if (confirmar) {
            post('/licencias/refrenda');
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold text-gray-800">
                    Módulo de Licencias
                </h2>
            }
        >
            <Head title="Mis Licencias" />

            <div className="min-h-screen bg-gray-100 py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    {/* Encabezado */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Consulta de licencias
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Consultá la información y vigencia de tu licencia de conducir.
                        </p>
                    </div>

                    {/* Información del titular */}
                    <div className="mb-6 rounded-xl bg-blue-700 p-6 text-white shadow-lg">
                        <p className="text-sm text-blue-100">
                            Titular de la licencia
                        </p>

                        <h2 className="mt-2 text-2xl font-bold">
                            {auth.user.name}
                        </h2>

                        <p className="mt-1 text-sm text-blue-100">
                            Documento: {auth.user.documento_identidad}
                        </p>

                        <p className="mt-1 text-sm text-blue-100">
                            Tipo de persona: {tipoPersona ?? 'No identificado'}
                        </p>
                    </div>

                    {/* Información de la licencia */}
                    {licencia ? (
                        <div className="overflow-hidden rounded-xl bg-white shadow-sm">

                            <div className="flex flex-wrap items-center justify-between gap-4 border-b p-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">
                                        Información de la licencia
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Datos registrados en el sistema
                                    </p>
                                </div>

                                <span
                                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                                        colorEstado[estado] ??
                                        'bg-gray-100 text-gray-700'
                                    }`}
                                >
                                    {estado}
                                </span>
                            </div>

                            <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">

                                {/* Tipo de licencia */}
                                <div className="rounded-lg bg-gray-50 p-5">
                                    <p className="text-sm text-gray-500">
                                        Tipo de licencia
                                    </p>

                                    <p className="mt-2 text-xl font-bold text-gray-800">
                                        {licencia.tipo_licencia}
                                    </p>
                                </div>

                                {/* Fecha de emisión */}
                                <div className="rounded-lg bg-gray-50 p-5">
                                    <p className="text-sm text-gray-500">
                                        Fecha de emisión
                                    </p>

                                    <p className="mt-2 font-semibold text-gray-800">
                                        {fecha(licencia.fecha_emision)}
                                    </p>
                                </div>

                                {/* Fecha de vencimiento */}
                                <div className="rounded-lg bg-gray-50 p-5">
                                    <p className="text-sm text-gray-500">
                                        Fecha de vencimiento
                                    </p>

                                    <p className="mt-2 font-semibold text-gray-800">
                                        {fecha(licencia.fecha_vencimiento)}
                                    </p>
                                </div>

                            </div>
                        </div>
                    ) : (

                        /* Cuando no existe una licencia */
                        <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center shadow-sm">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
                                <span aria-hidden="true">📄</span>
                            </div>

                            <h3 className="mt-5 text-xl font-bold text-gray-800">
                                No tenés licencias registradas
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-gray-500">
                                Actualmente no encontramos una licencia asociada
                                a tu documento de identidad.
                            </p>

                        </div>
                    )}

                    {/* Resultado de la refrenda */}
                    {flash.mensajeRefrenda && (
                        <div className={`mt-6 rounded-xl border p-6 shadow-sm ${
                            flash.estadoRefrenda === 'Aprobada'
                                ? 'border-green-200 bg-green-50'
                                : 'border-red-200 bg-red-50'
                        }`}>
                            <h3 className={`text-lg font-bold ${
                                flash.estadoRefrenda === 'Aprobada'
                                    ? 'text-green-800'
                                    : 'text-red-800'
                            }`}>
                                Refrenda {flash.estadoRefrenda}
                            </h3>

                            <p className={`mt-2 ${
                                flash.estadoRefrenda === 'Aprobada'
                                    ? 'text-green-700'
                                    : 'text-red-700'
                            }`}>
                                {flash.mensajeRefrenda}
                            </p>
                        </div>
                    )}

                    {/* Validaciones para refrenda */}
                    {esPersonaJuridica ? (

                        <div className="mt-6 rounded-xl border border-yellow-300 bg-yellow-50 p-6 shadow-sm">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">⚠️</span>

                                <div>
                                    <h3 className="text-lg font-bold text-yellow-800">
                                        Refrenda no disponible
                                    </h3>

                                    <p className="mt-2 text-yellow-700">
                                        La refrenda de licencia es exclusiva
                                        para personas naturales. Las personas
                                        jurídicas no pueden realizar este trámite.
                                    </p>
                                </div>
                            </div>
                        </div>

                    ) : esPersonaNatural && tieneMultasPendientes ? (

                        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">🚫</span>

                                <div>
                                    <h3 className="text-lg font-bold text-red-800">
                                        Refrenda no disponible
                                    </h3>

                                    <p className="mt-2 text-red-700">
                                        No podés realizar la refrenda porque
                                        tenés multas pendientes de pago.
                                        Debés regularizar tu situación antes
                                        de continuar.
                                    </p>
                                </div>
                            </div>
                        </div>

                    ) : esPersonaNatural && !licencia ? (

                        <div className="mt-6 rounded-xl border border-yellow-200 bg-yellow-50 p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-yellow-800">
                                No es posible realizar la refrenda
                            </h3>

                            <p className="mt-2 text-yellow-700">
                                No tenés una licencia registrada para iniciar
                                este proceso.
                            </p>
                        </div>

                    ) : esPersonaNatural && licencia.estado !== 'Vigente' ? (

                        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-red-800">
                                Refrenda no disponible
                            </h3>

                            <p className="mt-2 text-red-700">
                                Tu licencia no se encuentra en estado vigente.
                                Debés revisar tu situación antes de continuar.
                            </p>
                        </div>

                    ) : refrendaAprobada ? (

                        /* Cuando la refrenda ya fue aprobada */
                        <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-green-800">
                                ¡Refrenda realizada exitosamente!
                            </h3>

                            <p className="mt-2 text-green-700">
                                Tu licencia ya fue refrendada y su fecha de
                                vencimiento ha sido actualizada.
                            </p>

                            <p className="mt-2 text-sm text-green-700">
                                No necesitás realizar otra solicitud en este momento.
                            </p>
                        </div>

                    ) : puedeContinuar ? (

                        <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-green-800">
                                Validaciones superadas
                            </h3>

                            <p className="mt-2 text-green-700">
                                Tu cuenta es de persona natural, tu licencia
                                está vigente y no se encontraron multas pendientes.
                                Ya podés solicitar la refrenda.
                            </p>

                            <button
                                type="button"
                                onClick={solicitarRefrenda}
                                disabled={processing}
                                className="mt-5 rounded-lg bg-green-700 px-6 py-3 font-semibold text-white shadow transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {processing
                                    ? 'Procesando refrenda...'
                                    : 'Solicitar refrenda'}
                            </button>

                            <p className="mt-3 text-sm text-green-700">
                                La refrenda aprobada actualizará la vigencia
                                de tu licencia por cinco años.
                            </p>
                        </div>

                    ) : (

                        <div className="mt-6 rounded-xl border border-gray-300 bg-gray-50 p-6">
                            <h3 className="font-bold text-gray-700">
                                Tipo de persona no identificado
                            </h3>

                            <p className="mt-2 text-gray-600">
                                No podemos determinar si tu cuenta está habilitada
                                para realizar una refrenda.
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
