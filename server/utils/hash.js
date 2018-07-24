const bcrypt = require('bcrypt');

module.exports.getHash = async (password, hash) => {
  if (!password){
    password = 'UnvalidPasword';
  }
  return await bcrypt.compare(password, hash);
}


module.exports.setHash = async (password) => {
  return await bcrypt.hash(password, 10);
}
