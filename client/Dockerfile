FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV VITE_API_BASE_URL=https://programresourcehub.com:442
ENV VITE_API_SECOND_URL=https://programresourcehub.com:441

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]