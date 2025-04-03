import bcrypt from "bcrypt";
/**
 *
 * @param value password
 * @param numberOfRounds defualt 10
 * @returns {hashedPassword} hashed password
 */
export const hashValue = async (value: string, numberOfRounds: number = 10) =>
  await bcrypt.hash(value, numberOfRounds);

/**
 *
 * @param originalValue original password
 * @param hashedPassword hashed password stored in db collection
 * @returns {Boolean} Boolean
 */
export const comparePasswordValue = async (
  originalValue: string,
  hashedPassword: string
) => await bcrypt.compare(originalValue, hashedPassword);
