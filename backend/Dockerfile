# Use this image to save time so you don't have to rebuild gcc from scratch
# FROM postera/gcc 
FROM continuumio/miniconda3

# Make sure we have gcc installed
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && \
    apt-get -y install gcc mono-mcs iputils-ping && \
    rm -rf /var/lib/apt/lists/*

WORKDIR  /app

RUN yes | conda create --name postera python=3.8
RUN conda init bash

# Copy Fastapi code over
COPY . .

ENTRYPOINT [ "./entrypoint.sh" ]