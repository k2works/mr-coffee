exports.basUrl = () => {
  const local = 'http://localhost:5000';
  const production = process.env.API_URL || local;

  if (process.env.NODE_ENV !== 'production') {
    return local;
  } else {
    return production;
  }
};

