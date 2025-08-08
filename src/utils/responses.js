export const sendResponse = (res, code = 200, message = null, data = null) => {
  let success;
  if (code < 400) {
    success = true;
  } else {
    success = false;
  }

  if (code === 500 && !message) {
    message = "Something went wrong, try again later!";
  }

  return res.status(code).json({
    success,
    message,
    data,
  });
};
