# Author: Jacob Bishop

ARG     NODE_IMAGE

# base
FROM    $NODE_IMAGE

# copy source code to workdir
COPY    . /app

# change the active directory
WORKDIR /app

# build app
RUN     yarn

