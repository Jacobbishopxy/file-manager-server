# Author: Jacob Bishop

# args from --build-arg
ARG     NODE_IMAGE

# base
FROM    $NODE_IMAGE

# make directory
RUN     mkdir /app

# copy package requirements to workdir
COPY    package.json /app
COPY    yarn.lock /app

# change the active directory
WORKDIR /app

# install packages
RUN     yarn

