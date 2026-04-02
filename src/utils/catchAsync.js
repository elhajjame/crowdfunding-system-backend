const catchAsync = fn => (req, res, next) => {
  fn(req, res, next).catch(err => next(err))
}

const add = (n1, n2) => n1 + n2

export default catchAsync