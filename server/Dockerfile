# build environment
FROM node:alpine
WORKDIR /app
COPY . ./
RUN yarn
ENV PORT 5000
ENV HOST 0.0.0.0
EXPOSE 5000
CMD ["node", "index.js"]