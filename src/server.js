const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const mediaHandler = require('./mediaResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  console.log(request.url);

  switch (request.url) {
    case '/':
      htmlHandler.getPage(request, response, 1);
      break;

    case '/page2':
      htmlHandler.getPage(request, response, 2);
      break;

    case '/page3':
      htmlHandler.getPage(request, response, 3);
      break;

    case '/party.mp4':
      mediaHandler.getParty(request, response);
      break;

    case '/bling.mp3':
      mediaHandler.getBling(request, response);
      break;

    case '/bird.mp4':
      mediaHandler.getBird(request, response);
      break;

    default:
      htmlHandler.getPage(request, response, 1);
      break;
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1:${port}`);
