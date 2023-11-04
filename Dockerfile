# !/bin/bash
## transform ts -> js
## base image node 16
FROM node:latest AS builder

LABEL "com.centurylinklabs.watchtower"="true"

## 프로젝트의 모든 파일을 WORKDIR(/app)로 복사한다
RUN apt-get install python3 make g++\
    && rm -rf /var/cache/apk/*
WORKDIR /app
COPY . .

## Nest.js project를 build 한다
RUN yarn install
RUN yarn run build

## nest running alphine
## base image for Step 2: Node latest(light weight)
FROM node:latest AS runner
## transoform base image gettings
WORKDIR /app
COPY --from=builder /app ./

## application 실행
CMD ["yarn", "run", "start"]