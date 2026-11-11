import React from 'react';
import { useForm, usePage } from '@inertiajs/react';

export default function Index({ vehiculos }) {
    const { errors, flash } = usePage().props;
    const { post, processing } = useForm();

    const handleRefrendar = (placa) => {
        post(route('vehiculos.refrendar', placa));
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Mis Vehículos y Refrenda</h1>

            {flash?.success && (
                <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
                    {flash.success}
                </div>
            )}

            {errors?.error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                    {errors.error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vehiculos && vehiculos.length > 0 ? (
                    vehiculos.map((v) => (
                        <div key={v.placa} className="border p-4 rounded-lg shadow-sm bg-white">
                            <h2 className="text-xl font-semibold">Placa: {v.placa}</h2>
                            <p className="text-gray-600">Modelo: {v.modelo}</p>
                            <p className="text-gray-600">Año: {v.anio}</p>
                            <p className="text-gray-600">Tipo: {v.tipo_vehiculo}</p>
                            <p className="text-gray-600">Estado: {v.estado}</p>
                            
                            <div className="mt-4">
                                {v.tiene_multas_pendientes ? (
                                    <div className="space-y-2">
                                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded-full">
                                            Trámite Bloqueado: Multas Pendientes
                                        </span>
                                        <button
                                            disabled
                                            className="w-full bg-gray-300 text-gray-500 py-2 rounded-md cursor-not-allowed"
                                        >
                                            Refrendar Tarjeta (Bloqueado)
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleRefrendar(v.placa)}
                                        disabled={processing}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors"
                                    >
                                        Procesar Refrenda
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No tienes vehículos registrados a tu nombre.</p>
                )}
            </div>
        </div>
    );
}