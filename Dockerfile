FROM node:24-alpine
WORKDIR /app
COPY package.json ./
COPY server.mjs ./
COPY data ./data
COPY public ./public
COPY Mallas ./Mallas
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.mjs"]
