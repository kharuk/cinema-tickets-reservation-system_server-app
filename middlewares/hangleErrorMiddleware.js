const handleError = (err, req, res, next) => {
  console.log('err');
  console.error(err);

  //errir is not send ???
  res.status(err.statusCode || 500).send(err);
};

module.exports = { handleError };