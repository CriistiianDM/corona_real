# --- Vite Builder ---
FROM node:19-alpine3.16 AS vite-builder
WORKDIR /frontend
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci --silent
COPY ./ ./
RUN npm run build

# --- Apache ---
FROM httpd:latest
COPY --from=vite-builder /frontend/dist/ /usr/local/apache2/htdocs/
RUN sed -i 's/80/3000/g' /usr/local/apache2/conf/httpd.conf
EXPOSE 3000