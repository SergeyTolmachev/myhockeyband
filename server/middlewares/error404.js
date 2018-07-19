const express = require('express');

function error404(req, res) {
  const dataToSend = {
    message: 'Page not found',
    url: `${req.host}${req.url}`,
  };
  res.status(404).json(dataToSend);
}

module.exports = error404;
