const bcrypt = require('bcrypt');

async function setHash(password) {
  return await bcrypt.hash(password, 10);
}


module.exports = setHash;
