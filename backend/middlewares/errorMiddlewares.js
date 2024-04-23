const notFound = (req, res, next) => {
  const err = new Error("Not found-", req.orginalUrl);
  res.status(404);
  next(err);
};
const errorHandler = (err, req, res, next) => {
  const status = req.statuscode === 200 ? 500 : res.statuscode;
  res.status(status);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
  next();
};
module.exports = { notFound, errorHandler };
