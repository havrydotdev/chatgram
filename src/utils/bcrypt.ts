import * as bcrypt from 'bcrypt';

export const encodePassword = (raw: string): string => {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hashSync(raw, SALT);
};

export const comparePasswords = (raw: string, hash: string): boolean => {
  return bcrypt.compareSync(raw, hash);
};
