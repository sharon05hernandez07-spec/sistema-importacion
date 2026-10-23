#!/usr/bin/env bash
# Respaldo de PostgreSQL para sistema-importacion.
# Uso: bash scripts/respaldar.sh
# Para conservar solo 3 respaldos: RETENCION=3 bash scripts/respaldar.sh

set -euo pipefail

PROYECTO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROYECTO"

SERVICIO="${SERVICIO:-postgres}"
DB_USER="${DB_USER:-importador}"
DB_NAME="${DB_NAME:-sistema_importacion}"
DESTINO="${DESTINO:-respaldos}"
RETENCION="${RETENCION:-7}"

if ! [[ "$RETENCION" =~ ^[1-9][0-9]*$ ]]; then
  echo "ERROR: RETENCION debe ser un entero mayor que cero." >&2
  exit 1
fi

mkdir -p "$DESTINO"
archivo="$DESTINO/${DB_NAME}-$(date +%Y%m%d-%H%M%S).dump"

docker compose exec -T "$SERVICIO" \
  pg_dump -U "$DB_USER" -Fc "$DB_NAME" > "$archivo"

if [ ! -s "$archivo" ]; then
  echo "ERROR: respaldo vacío: $archivo" >&2
  rm -f "$archivo"
  exit 1
fi

if ! docker compose exec -T "$SERVICIO" pg_restore --list < "$archivo" > /dev/null; then
  echo "ERROR: pg_restore no pudo leer el respaldo: $archivo" >&2
  rm -f "$archivo"
  exit 1
fi

mapfile -t archivos < <(
  find "$DESTINO" -maxdepth 1 -type f \
    -name "${DB_NAME}-*.dump" -printf '%T@ %p\n' |
    sort -rn |
    cut -d' ' -f2-
)

for ((i=RETENCION; i<${#archivos[@]}; i++)); do
  rm -f -- "${archivos[$i]}"
done

echo "OK: $archivo ($(du -h "$archivo" | cut -f1))"
echo "Respaldos conservados: $(find "$DESTINO" -maxdepth 1 -type f -name "${DB_NAME}-*.dump" | wc -l) de máximo $RETENCION"
