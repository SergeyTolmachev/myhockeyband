const bcrypt = require('bcrypt');

async function getHash(password, hash) {
  if (!password){
    password = 'UnvalidPasword';
  }
  return await bcrypt.compare(password, hash);
}


module.exports = getHash;
