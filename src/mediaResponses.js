const fs = require('fs');
const path = require('path');

const CLIENT_PATH = '../client/';
const VIDEO_TYPE = 'video/mp4';
const AUDIO_TYPE = 'audio/mpeg';

const loadFile = (request, response, pathStr, fileType) => {
  const file = path.resolve(__dirname, pathStr);

  fs.stat(file, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        response.writeHead(404);
      }
      return response.end(err);
    }

    const range = request.headers.range;

    if (!range) {
      return response.writeHead(416);
    }

    const positions = range.replace(/bytes=/, '').split('-');

    let start = parseInt(positions[0], 10);

    const total = stats.size;
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1;

    if (start > end) {
      start = end - 1;
    }

    const chunksize = (end - start) + 1;

    response.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': fileType,
    });

    const stream = fs.createReadStream(file, { start, end });

    stream.on('open', () => {
      stream.pipe(response);
    });

    stream.on('error', (streamErr) => {
      response.end(streamErr);
    });

    return stream;
  });
};

const getParty = (request, response) => {
  loadFile(request, response, `${CLIENT_PATH}party.mp4`, VIDEO_TYPE);
};

const getBling = (request, response) => {
  loadFile(request, response, `${CLIENT_PATH}bling.mp3`, AUDIO_TYPE);
};

const getBird = (request, response) => {
  loadFile(request, response, `${CLIENT_PATH}bird.mp4`, VIDEO_TYPE);
};

module.exports.getParty = getParty;
module.exports.getBling = getBling;
module.exports.getBird = getBird;
