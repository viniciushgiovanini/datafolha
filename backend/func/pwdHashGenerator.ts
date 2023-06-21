const bt = require("bcrypt");

const hashPWD = async (pwdOri: string): Promise<string> => {
  const hashGenerator = await bt.hash(pwdOri, 10);

  return hashGenerator;
};

const compareHash = async (hash: string, noHash: string): Promise<boolean> => {
  const isMatch = await bt.compare(noHash, hash);

  return isMatch;
};

export { hashPWD, compareHash };
