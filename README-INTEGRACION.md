# Módulo de Esquelas — integración local

Este paquete contiene los archivos del módulo preparados para la rama `luis-esquelas`.
Se conservaron Laravel + Inertia + React + Tailwind y el layout existente.

## Aplicación

Copiá los archivos manteniendo sus rutas dentro del repositorio:

- `app/Http/Controllers/EsquelaController.php` (nuevo)
- `app/Http/Controllers/PagoEsquelaController.php` (nuevo)
- `app/Models/Multa.php` (reemplazar)
- `database/migrations/2026_11_13_000001_add_payment_details_to_multas_table.php` (nuevo)
- `database/seeders/MultaSeeder.php` (reemplazar)
- `resources/js/Pages/Esquelas/Index.jsx` (reemplazar)
- `routes/web.php` (reemplazar)

No se modifica `Dashboard.jsx`, `AuthenticatedLayout.jsx`, `LicenciaController.php` ni los módulos de otros integrantes.

## Comandos

```bash
git switch luis-esquelas
php artisan migrate
php artisan db:seed --class=MultaSeeder
php artisan route:list --name=esquelas
npm run build
php artisan test
```

## Consideraciones

- Los registros del seeder son ejemplos de demostración vinculados a placas y usuarios que ya aparecen en los seeders del repositorio.
- El formulario de tarjeta es una simulación académica. No existe integración con banco ni se almacenan número de tarjeta o CVV.
- La referencia `DEMO-...` no es un NPE oficial.
- Los bloqueos de refrenda ya consultan la tabla `multas` en `LicenciaController`. El controlador actual de Traspasos no tiene una operación de traspaso implementada; este paquete no modifica el módulo de otro integrante.
- Antes de ejecutar el seeder en una base compartida, respaldá los datos de prueba existentes.
- Revisá y probá el resultado en tu entorno local: desde esta sesión GitHub rechazó las operaciones de escritura con HTTP 403, por lo que no se pudo ejecutar la suite ni publicar commits directamente.
