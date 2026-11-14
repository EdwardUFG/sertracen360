import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, vehiculos }) {
    // Obtenemos los mensajes de sesión (como el success del controlador)
    const { flash } = usePage().props;

    // Configuramos el formulario con Inertia
    const { data, setData, post, processing, errors, reset } = useForm({
        placa: '',
        nuevo_propietario: '',
    });

    const submit = (e) => {
        e.preventDefault();
        // Enviamos la petición POST a la ruta de traspasos
        post(route('traspasos.store'), {
            onSuccess: () => reset('nuevo_propietario'), // Limpiamos el input si es exitoso
        });
    };

    return (
        <AuthenticatedLayout
            user={auth?.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Traspaso de Dominio</h2>}
        >
            <Head title="Traspaso de Dominio" />

            <div className="max-w-4xl mx-auto py-10 sm:px-6 lg:px-8">
                {/* Alerta de Éxito */}
                {flash?.success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        {flash.success}
                    </div>
                )}

                {/* Alerta de Error de Regla de Negocio (Multas o Bloqueos) */}
                {errors.error_tramite && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <strong>¡Trámite Rechazado!</strong> {errors.error_tramite}
                    </div>
                )}

                <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
                    <form onSubmit={submit}>
                        {/* Select de Vehículos */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Seleccione el vehículo a traspasar
                            </label>
                            <select
                                value={data.placa}
                                onChange={(e) => setData('placa', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            >
                                <option value="">-- Elija un vehículo --</option>
                                {vehiculos.map((vehiculo) => (
                                    <option key={vehiculo.placa} value={vehiculo.placa}>
                                        Placa: {vehiculo.placa} - {vehiculo.modelo} ({vehiculo.anio})
                                        {vehiculo.tiene_multas_pendientes ? ' [Con multas pendientes]' : ''}
                                    </option>
                                ))}
                            </select>
                            {errors.placa && (
                                <p className="mt-2 text-sm text-red-600">{errors.placa}</p>
                            )}
                        </div>

                        {/* Input de Nuevo Propietario */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Documento del Nuevo Propietario (DUI o NIT)
                            </label>
                            <input
                                type="text"
                                value={data.nuevo_propietario}
                                onChange={(e) => setData('nuevo_propietario', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Ej. 123456789 sin guiones"
                                required
                            />
                            {errors.nuevo_propietario && (
                                <p className="mt-2 text-sm text-red-600">{errors.nuevo_propietario}</p>
                            )}
                        </div>

                        {/* Botón de Enviar */}
                        <div className="flex items-center justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                                    processing ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                {processing ? 'Procesando...' : 'Confirmar Traspaso'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}