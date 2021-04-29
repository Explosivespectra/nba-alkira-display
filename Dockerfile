 FROM node:12-alpine
 WORKDIR /nba-alkira-display
 ENV PATH /nba-alkira-display/node_modules/.bin:$PATH
 COPY package.json ./
 COPY yarn.lock ./
 COPY . ./
 RUN yarn install --save
 CMD ["yarn", "start"]