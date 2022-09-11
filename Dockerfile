#Start from the pre-existing official Node image
FROM node:18.9
#Specifies directory for all subsequent actions in image filesystem (never host's filesystem)
#"/usr/local/bin/" is what Heroku takes as the "root" folder. Files MUST be added here or they cannot be found!
WORKDIR /usr/local/bin/web
#Copies the app's source code into the image's filesystem
COPY . /usr/local/bin/web/
#Installs packages for Express framework. Runs in container root directory.
RUN npm install

#Runs the app when container launches. Same as running in console
CMD ["npm", "start"]