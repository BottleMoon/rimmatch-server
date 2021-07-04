const { rejects } = require("assert");
const crypto = require("crypto");

const encrypt = async (password, salt) => {
  // in sign up
  if (salt == null) {
    salt = (await crypto.randomBytes(64)).toString("base64");
  }

  const pbkdf2 = () => {
    return new Promise((resolve, rejects) => {
      crypto.pbkdf2(password, salt, 123123, 64, "sha512", (err, key) => {
        if (err) {
          console.log(err);
        } else {
          resolve(key.toString("base64"));
        }
      });
    });
  };
  const key = await pbkdf2();

  return { key, salt };
};

module.exports = encrypt;
