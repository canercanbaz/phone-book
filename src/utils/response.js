'use strict';

class HttpResponse {
  // 200 OK
  success(res, data) {
    return res.status(200).json(data);
  };

  // 500 Internal Server Error
  serverError(res, error) {
    return res.status(500).json(error);
  };

  // 400 Bad Request Error
  validationError(res, error) {
    return res.status(400).json(error);
  };

  // 404 Not Found Error
  notFoundError(res, error) {
    return res.status(404).json(error);
  };
}

module.exports = new HttpResponse();
