const port = 9999;

exports.port = () => {
  return port;
};

exports.url = (path) => {
  return `http://localhost:${port}/${path}`;
};

