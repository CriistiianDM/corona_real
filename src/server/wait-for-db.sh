#!/bin/bash
# wait-for-db.sh

# Host y puerto de la base de datos
DB_HOST=junction.proxy.rlwy.net
DB_PORT=48935

sleep 5

# Intentar conectar con la base de datos
echo "Intentando conectar a la base de datos $DB_HOST:$DB_PORT"
until nc -z -v -w30 $DB_HOST $DB_PORT
do
  echo "Esperando a que la base de datos esté disponible..."
  sleep 5
done

echo "Base de datos disponible, iniciando el servidor Django..."
exec "$@"
