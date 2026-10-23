#!/usr/bin/env bash
set -euo pipefail

DB="sistema_importacion"

echo "=== VALIDACIONES DE MIGRACION ==="

docker compose exec -T postgres psql \
  -U importador -d "$DB" -v ON_ERROR_STOP=1 <<'SQL'
DO $$
BEGIN
    IF (SELECT count(*) FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name IN ('proveedores', 'productos',
                           'importaciones', 'detalle_importacion')) <> 4 THEN
        RAISE EXCEPTION 'FALLO: faltan tablas';
    END IF;
    RAISE NOTICE 'OK 1: existen las cuatro tablas';
END $$;

DO $$
BEGIN
    IF (SELECT count(*) FROM proveedores) <> 1
       OR (SELECT count(*) FROM productos) <> 1
       OR (SELECT count(*) FROM importaciones) <> 1
       OR (SELECT count(*) FROM detalle_importacion) <> 1 THEN
        RAISE EXCEPTION 'FALLO: conteos inesperados';
    END IF;
    RAISE NOTICE 'OK 2: los conteos de registros son correctos';
END $$;

DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM importaciones i
        LEFT JOIN proveedores p ON p.id_proveedor = i.id_proveedor
        WHERE p.id_proveedor IS NULL
    ) OR EXISTS (
        SELECT 1 FROM detalle_importacion d
        LEFT JOIN importaciones i ON i.id_importacion = d.id_importacion
        LEFT JOIN productos p ON p.id_producto = d.id_producto
        WHERE i.id_importacion IS NULL OR p.id_producto IS NULL
    ) THEN
        RAISE EXCEPTION 'FALLO: hay relaciones sin correspondencia';
    END IF;
    RAISE NOTICE 'OK 3: las relaciones entre tablas son válidas';
END $$;

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM detalle_importacion
               WHERE cantidad <= 0 OR costo_unitario < 0) THEN
        RAISE EXCEPTION 'FALLO: hay valores fuera de las reglas';
    END IF;
    RAISE NOTICE 'OK 4: se cumplen las reglas de cantidad y costo';
END $$;
SQL

echo "=== PRUEBA DE ROLLBACK ==="

docker compose exec -T postgres psql \
  -U importador -d "$DB" -v ON_ERROR_STOP=1 <<'SQL'
BEGIN;
INSERT INTO proveedores (nombre, pais, correo)
VALUES ('Proveedor temporal rollback', 'Prueba', 'rollback@ejemplo.local');
ROLLBACK;

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM proveedores
               WHERE correo = 'rollback@ejemplo.local') THEN
        RAISE EXCEPTION 'FALLO: el rollback no revirtió el registro';
    END IF;
    RAISE NOTICE 'OK: rollback comprobado; el registro temporal no existe';
END $$;
SQL

echo "=== RESULTADO: validaciones y rollback completados ==="
