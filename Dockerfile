FROM node:10

# Create app directory
WORKDIR /home/ubuntu/sportify-svc

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Map Jenkins port 8080 to application port 3001
EXPOSE 8080:3001

CMD [ "node", "index.js" ]