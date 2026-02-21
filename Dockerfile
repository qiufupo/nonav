FROM node:22-alpine AS build  
LABEL "language"="nodejs"  
LABEL "framework"="static"  
WORKDIR /build  
COPY . .  
RUN npm install  
RUN npm run build  
RUN sed -i "s|fetch('data/links.yml')|fetch('links.json')|g" index.html  
FROM zeabur/caddy-static:latest  
COPY --from=build /build /usr/share/caddy  
EXPOSE 8080  
