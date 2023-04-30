import { constant } from "../constants/constant.js";

const errorHandler = (err, req, res, next) => {
  const code = res.statusCode ? res.statusCode : 500;
  switch (code) {
    case constant.VALIDATION_ERROR:
      res.json({
        title: "Validation Failure",
        messsage: err.messsage,
        stackTrace: err.stack,
      });
      break;

    case constant.UNAUTHORISED:
      res.json({
        title: "Unauthorised",
        messsage: err.messsage,
        stackTrace: err.stack,
      });
      break;

    case constant.FORBIDDEN:
      res.json({
        title: "forbidden",
        messsage: err.messsage,
        stackTrace: err.stack,
      });
      break;

    case constant.NOT_FOUND:
      res.json({
        title: "Not Found",
        messsage: err.messsage,
        stackTrace: err.stack,
      });
      break;

    case constant.SERVER_ERROR:
      res.json({
        title: "Server Error",
        messsage: err.messsage,
        stackTrace: err.stack,
      });
      break;

    default:
      console.log("All fields are filled");
      break;
  }
};

export default errorHandler;
