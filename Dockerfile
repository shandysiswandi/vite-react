FROM node:22-alpine AS builder
LABEL stage="builder"
WORKDIR /app
COPY package.json package-lock.json
RUN npm ci
COPY . .
ARG VITE_BASE_API_URL
ARG VITE_ENV
ENV VITE_BASE_API_URL=${VITE_BASE_API_URL}
ENV VITE_ENV=${VITE_ENV}
RUN npm run build

FROM nginx:1.27-alpine
LABEL maintainer="shandysiswandi@gmail.com"
LABEL description="Production image for React frontend application."
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY ./.nginx/nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
RUN chown -R appuser:appgroup /usr/share/nginx/html 
RUN chmod -R 755 /usr/share/nginx/html
USER appuser
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
