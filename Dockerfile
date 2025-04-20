FROM node:23 AS build
WORKDIR /app
COPY package.json ./
RUN npm  i
COPY . .
RUN npm run build

# Production stage
FROM node:23
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package.json ./
RUN npm install --production
CMD ["node", "dist/main"]