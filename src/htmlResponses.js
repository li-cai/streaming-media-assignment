const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const client2 = fs.readFileSync(`${__dirname}/../client/client2.html`);
const client3 = fs.readFileSync(`${__dirname}/../client/client3.html`);

const getPage = (request, response, page) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });

  let file;
  switch (page) {
    case 2:
      file = client2;
      break;

    case 3:
      file = client3;
      break;

    default:
      file = index;
      break;
  }

  response.write(file);
  response.end();
};

module.exports.getPage = getPage;
