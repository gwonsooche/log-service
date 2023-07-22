#!/bin/bash
#
# This script builds a docker image for the log service and uploads (pushes)
# the created image to the image hub (Docker Hub). That is, it is responsible
# for the whole build process of the log service.

docker build -t log-service .
docker image tag log-service gwonsooche/log-service:latest
# TODO: Handle the case of push failure (e.g., "net/http: TLS handshake
# timeout").
docker image push gwonsooche/log-service:latest