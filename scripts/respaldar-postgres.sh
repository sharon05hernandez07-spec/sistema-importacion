#!/usr/bin/env bash
set -euo pipefail

CARPETA="respaldos"
FECHA="$(date +%Y%m%d_%H%M%S)"
ARCHIVO="$CARPETA/sistema_importacion_$FECHA.dump"

mkdir -p "$CARPETA"

docker compose exec -T postgres pg_dump \
  -U importador -d sistema_importacion -Fc > "$ARCHIVO"

if [ ! -s "$ARCHIVO" ]; then
  echo "ERROR: el respaldo está vacío."
  rm -f "$ARCHIVO"
  exit 1
fi

echo "Respaldo creado: $ARCHIVO"

find "$CARPETA" -maxdepth 1 -type f \
  -name 'sistema_importacion_*.dump' -mtime +6 -delete

echo "Retención aplicada: se eliminan respaldos con más de 6 días completos."
