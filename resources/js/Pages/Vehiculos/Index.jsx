import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function Index({ vehiculos }) {
    const { errors, flash, auth } = usePage().props;
    const { post, processing } = useForm();

    const handleRefrendar = (placa) => {
        post(route('vehiculos.refrendar', placa));
    };

    const usuario = auth.user;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-slate-800">
                    Tarjeta de Circulación - Módulo de Vehículos
                </h2>
            }
        >
            <Head title="Mis Vehículos" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Alertas de Éxito o Error */}
                    {flash?.success && (
                        <div className="p-4 bg-emerald-100 text-emerald-800 rounded-xl border border-emerald-200 shadow-sm">
                            {flash.success}
                        </div>
                    )}

                    {errors?.error && (
                        <div className="p-4 bg-rose-100 text-rose-800 rounded-xl border border-rose-200 shadow-sm">
                            {errors.error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                        {vehiculos && vehiculos.length > 0 ? (
                            vehiculos.map((v) => (
                                <div key={v.placa} className="space-y-6">
                                    
                                    {/* ========================================= */}
                                    {/* 1. ANVERSO DE LA TARJETA DE CIRCULACIÓN   */}
                                    {/* ========================================= */}
                                    <div className="relative w-full max-w-xl mx-auto aspect-[1.586/1] bg-gradient-to-br from-white via-pink-50/70 to-rose-100/80 rounded-2xl shadow-2xl border border-slate-300 p-6 flex flex-col justify-between overflow-hidden">
                                        
                                        {/* Árbol de Maquulis optimizado */}
                                        <div className="absolute right-4 top-4 w-60 h-60 opacity-45 pointer-events-none flex items-center justify-center">
                                            <svg viewBox="0 0 300 300" className="w-full h-full text-pink-400 fill-current">
                                                <circle cx="120" cy="90" r="48" className="text-rose-300 fill-current" />
                                                <circle cx="180" cy="90" r="48" className="text-rose-300 fill-current" />
                                                <circle cx="150" cy="70" r="52" className="text-pink-300 fill-current" />
                                                <circle cx="100" cy="130" r="42" className="text-rose-400 fill-current" />
                                                <circle cx="200" cy="130" r="42" className="text-rose-400 fill-current" />
                                                <circle cx="150" cy="120" r="58" className="text-pink-200 fill-current" />
                                                <path d="M140,170 C140,140 145,110 150,90 C155,110 160,140 160,170 L168,230 C169,238 158,240 150,240 C142,240 131,238 132,230 Z" className="text-amber-900 fill-current" />
                                                <path d="M150,130 C130,110 110,100 95,90 C98,96 115,110 135,135 Z" className="text-amber-900 fill-current" />
                                                <path d="M150,130 C170,110 190,100 205,90 C202,96 185,110 165,135 Z" className="text-amber-900 fill-current" />
                                            </svg>
                                        </div>

                                        {/* Encabezado */}
                                        <div className="flex justify-between items-start relative z-10">
                                            <div>
                                                <h3 className="text-xl font-black tracking-tight text-slate-900 leading-tight font-sans">
                                                    Tarjeta de Circulación
                                                </h3>
                                                <p className="text-[11px] font-bold text-slate-600 tracking-wider uppercase mt-0.5">
                                                    República de El Salvador
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="px-3 py-1 text-[10px] font-black rounded-full uppercase bg-emerald-600 text-white shadow-md tracking-wider">
                                                    ACTIVO
                                                </span>
                                                <div className="w-11 h-11 rounded-full border-2 border-amber-600 bg-white flex flex-col items-center justify-center p-1 shadow-md relative">
                                                    <div className="absolute inset-1 rounded-full border border-dashed border-amber-500/80"></div>
                                                    <span className="text-[8px] font-black tracking-tighter text-amber-900 z-10">VMT</span>
                                                    <span className="text-[6px] font-bold text-amber-800 z-10 leading-none">SV</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Chip Inteligente Realista */}
                                        <div className="relative z-10 my-0.5">
                                            <div className="w-12 h-9 rounded bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 border border-amber-600 p-1 shadow-md flex flex-col justify-between overflow-hidden relative">
                                                <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-[1px] p-[2px] opacity-90">
                                                    <div className="bg-amber-200 border-[0.5px] border-amber-600 rounded-[1px]"></div>
                                                    <div className="bg-amber-300 border-[0.5px] border-amber-600 rounded-[1px]"></div>
                                                    <div className="bg-amber-200 border-[0.5px] border-amber-600 rounded-[1px]"></div>
                                                    <div className="bg-amber-300 border-[0.5px] border-amber-600 rounded-[1px]"></div>
                                                    <div className="bg-amber-200 border-[0.5px] border-amber-600 rounded-[1px]"></div>
                                                    <div className="bg-amber-300 border-[0.5px] border-amber-600 rounded-[1px]"></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Información central y datos */}
                                        <div className="relative z-10 flex justify-between items-end mt-1">
                                            <div className="space-y-0.5">
                                                <p className="text-xs font-black text-slate-900 uppercase tracking-tight">
                                                    {usuario?.name || 'JUAN PÉREZ LÓPEZ OBRADOR'}
                                                </p>
                                                <p className="text-3xl font-black tracking-widest text-slate-900 font-mono">
                                                    {v.placa}
                                                </p>
                                                <p className="text-xs font-bold text-slate-800 font-mono">
                                                    {usuario?.documento_identidad || '02124561-5'}
                                                </p>
                                                <p className="text-[9px] font-bold text-slate-700 uppercase tracking-wider">
                                                    SAN SALVADOR, EL SALVADOR
                                                </p>
                                            </div>

                                            <div className="flex flex-col items-end space-y-1.5">
                                                <div className="text-right font-mono text-[11px] leading-tight text-slate-900 font-bold">
                                                    <p>VTO {v.fecha_vencimiento}</p>
                                                    <p className="text-slate-600 text-[10px]">EMISIÓN {v.fecha_emision}</p>
                                                </div>
                                                <div className="w-14 h-14 bg-white p-1 border border-slate-300 rounded shadow-sm flex items-center justify-center">
                                                    <div className="w-full h-full bg-slate-900 grid grid-cols-5 gap-[1px] p-[1px]">
                                                        <div className="bg-slate-900"></div><div className="bg-white"></div><div className="bg-slate-900"></div><div className="bg-slate-900"></div><div class="bg-white"></div>
                                                        <div class="bg-white"></div><div className="bg-slate-900"></div><div class="bg-white"></div><div class="bg-slate-900"></div><div class="bg-slate-900"></div>
                                                        <div class="bg-slate-900"></div><div class="bg-white"></div><div class="bg-slate-900"></div><div class="bg-white"></div><div class="bg-slate-900"></div>
                                                        <div class="bg-white"></div><div class="bg-slate-900"></div><div class="bg-slate-900"></div><div class="bg-white"></div><div class="bg-white"></div>
                                                        <div class="bg-slate-900"></div><div class="bg-white"></div><div class="bg-slate-900"></div><div class="bg-slate-900"></div><div class="bg-slate-900"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    {/* ========================================= */}
                                    {/* 2. REVERSO DE LA TARJETA DE CIRCULACIÓN   */}
                                    {/* ========================================= */}
                                    <div className="relative w-full max-w-xl mx-auto aspect-[1.586/1] bg-white rounded-2xl shadow-2xl border border-slate-300 p-6 flex flex-col justify-between overflow-hidden">
                                        
                                        {/* Fila superior: Especificaciones y Serie */}
                                        <div className="flex justify-between items-start">
                                            <div className="grid grid-cols-3 gap-y-2 gap-x-3 text-xs font-mono flex-grow pr-2">
                                                <div>
                                                    <span className="text-[9px] text-slate-500 uppercase font-sans font-bold block">Año</span>
                                                    <span className="font-extrabold text-slate-900 text-sm">{v.anio}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[9px] text-slate-500 uppercase font-sans font-bold block">Marca</span>
                                                    <span className="font-extrabold text-slate-900 text-sm uppercase block truncate">{v.marca?.nombre_marca || 'MITSUBISHI'}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[9px] text-slate-500 uppercase font-sans font-bold block">Modelo</span>
                                                    <span className="font-extrabold text-slate-900 text-sm uppercase block truncate">{v.modelo}</span>
                                                </div>

                                                <div>
                                                    <span className="text-[9px] text-slate-500 uppercase font-sans font-bold block">Tipo</span>
                                                    <span className="font-extrabold text-slate-900 text-xs uppercase block truncate">{v.tipo_vehiculo}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[9px] text-slate-500 uppercase font-sans font-bold block">Clase</span>
                                                    <span className="font-extrabold text-slate-900 text-xs uppercase block truncate">{v.clase}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[9px] text-slate-500 uppercase font-sans font-bold block">Capacidad</span>
                                                    <span className="font-extrabold text-slate-900 text-xs uppercase">{v.capacidad}</span>
                                                </div>

                                                <div>
                                                    <span className="text-[9px] text-slate-500 uppercase font-sans font-bold block">Dominio</span>
                                                    <span className="font-extrabold text-slate-900 uppercase text-xs truncate block">{v.dominio}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[9px] text-slate-500 uppercase font-sans font-bold block">En Calidad</span>
                                                    <span className="font-extrabold text-slate-900 uppercase text-xs truncate block">{v.en_calidad}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[9px] text-slate-500 uppercase font-sans font-bold block">Color</span>
                                                    <span className="font-extrabold text-slate-900 uppercase text-xs truncate block">{v.color}</span>
                                                </div>
                                            </div>

                                            {/* Número de serie superior derecho exacto[cite: 8] */}
                                            <div className="text-right font-mono text-sm font-black text-slate-900 shrink-0 pt-0.5">
                                                361692555
                                            </div>
                                        </div>

                                        {/* Números de Serie (Chasis, Motor, VIN) */}
                                        <div className="space-y-0.5 font-mono text-[11px] border-t border-b border-slate-200 py-1.5 my-1">
                                            <div>
                                                <span className="text-[8px] text-slate-500 uppercase font-sans font-bold block">N.º Chasis</span>
                                                <span className="font-black text-slate-900 tracking-wider text-xs">{v.numero_chasis}</span>
                                            </div>
                                            <div>
                                                <span className="text-[8px] text-slate-500 uppercase font-sans font-bold block">N.º Motor</span>
                                                <span className="font-black text-slate-900 tracking-wider text-xs">{v.numero_motor}</span>
                                            </div>
                                            <div>
                                                <span className="text-[8px] text-slate-500 uppercase font-sans font-bold block">N.º VIN</span>
                                                <span className="font-black text-slate-900 tracking-wider text-xs">{v.vin}</span>
                                            </div>
                                        </div>

                                        {/* Firma, Sello Oficial y Código QR inferior */}
                                        <div className="flex justify-between items-end pb-4 pt-1">
                                            <div className="space-y-0.5">
                                                <div className="w-32 border-b border-slate-500 pb-0.5">
                                                    <p className="font-serif italic text-sm text-slate-900 font-bold">A. Supritiu</p>
                                                </div>
                                                <p className="text-[9px] font-black uppercase tracking-tight text-slate-900">
                                                    DIRECTOR GENERAL DE TRÁNSITO
                                                </p>
                                                <p className="text-[8px] text-slate-600 font-mono tracking-widest font-semibold">
                                                    2028 15610085 365485
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2.5">
                                                <div className="w-12 h-12 rounded-full border-2 border-slate-600 bg-slate-50 flex flex-col items-center justify-center p-0.5 shadow-sm relative">
                                                    <div className="absolute inset-0.5 rounded-full border border-dashed border-slate-400"></div>
                                                    <span className="text-[7px] font-black tracking-wider text-slate-800 z-10">SELLO</span>
                                                    <span className="text-[5px] font-bold text-slate-600 z-10">VMT</span>
                                                </div>
                                                <div className="w-14 h-14 bg-white p-1 border border-slate-300 rounded shadow-sm flex items-center justify-center">
                                                    <div className="w-full h-full bg-slate-900 grid grid-cols-5 gap-[1px] p-[1px]">
                                                        <div className="bg-slate-900"></div><div class="bg-white"></div><div class="bg-slate-900"></div><div class="bg-slate-900"></div><div class="bg-white"></div>
                                                        <div class="bg-white"></div><div class="bg-slate-900"></div><div class="bg-white"></div><div class="bg-slate-900"></div><div class="bg-slate-900"></div>
                                                        <div class="bg-slate-900"></div><div class="bg-white"></div><div class="bg-slate-900"></div><div class="bg-white"></div><div class="bg-slate-900"></div>
                                                        <div class="bg-white"></div><div class="bg-slate-900"></div><div class="bg-slate-900"></div><div class="bg-white"></div><div class="bg-white"></div>
                                                        <div class="bg-slate-900"></div><div class="bg-white"></div><div class="bg-slate-900"></div><div class="bg-slate-900"></div><div class="bg-slate-900"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Banda inferior oficial del reverso */}
                                        <div className="absolute bottom-0 left-0 right-0 h-5 bg-gradient-to-r from-rose-200 via-pink-200 to-rose-300 flex items-center px-4 justify-between border-t border-rose-300 shadow-inner">
                                            <span className="text-[9px] font-extrabold text-rose-950 uppercase tracking-wider">
                                                Viceministerio de Transporte • Dirección General de Tránsito
                                            </span>
                                            <div className="w-4 h-2 bg-rose-600 rounded-sm shadow-sm flex items-center justify-center">
                                                <div className="w-1.5 h-0.5 bg-white/60 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>


                                    {/* ========================================= */}
                                    {/* 3. BOTÓN DE ACCIÓN / REFRENDA             */}
                                    {/* ========================================= */}
                                    <div className="max-w-xl mx-auto pt-2">
                                        {v.tiene_multas_pendientes ? (
                                            <div className="space-y-2">
                                                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-semibold text-center">
                                                    ⚠️ Trámite bloqueado: Este vehículo posee multas pendientes de pago.
                                                </div>
                                                <button
                                                    disabled
                                                    className="w-full bg-slate-200 text-slate-400 py-3 rounded-xl font-bold text-sm cursor-not-allowed uppercase tracking-wider shadow-inner"
                                                >
                                                    Refrendar Tarjeta (Bloqueado)
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => handleRefrendar(v.placa)}
                                                disabled={processing}
                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-sm transition shadow-lg shadow-blue-600/20 uppercase tracking-wider flex items-center justify-center gap-2"
                                            >
                                                <span>Procesar Refrenda de Tarjeta</span>
                                            </button>
                                        )}
                                    </div>

                                </div>
                            ))
                        ) : (
                            <div className="col-span-2 text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-200">
                                <p className="text-slate-500 font-medium">No tienes vehículos registrados a tu nombre en el sistema.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
