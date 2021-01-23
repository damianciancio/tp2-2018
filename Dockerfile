FROM node:12.18
WORKDIR /app
Add . /app
RUN npm install
EXPOSE 3000
CMD npm start
