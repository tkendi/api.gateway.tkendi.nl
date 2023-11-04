#!/bin/bash
BASEDIR=$(dirname "$0")

echo Run MongoDB
chmod +x ${BASEDIR}/mongo/run.sh
${BASEDIR}/mongo/run.sh


# echo Wait For MongoDB
# until docker container exec -it finace-user mongo; do
#     >&2 echo "Postgres is not ready - waiting for it..."
# sleep 2
# done

# echo Run lorlmonte/backend
# docker-compose -f docker-compose.yml up -d --build