#!/usr/bin/env bash
# author: Jacob Bishop

source ../resources/docker.env
docker build \
    -t ${APP_IMAGE_NAME}:${APP_IMAGE_VERSION} \
    --build-arg NODE_IMAGE=${NODE_IMAGE} \
    -f ../docker-app/Dockerfile ..

