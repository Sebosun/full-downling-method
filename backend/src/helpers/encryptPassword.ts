import bcrypt from 'bcrypt'

export async function encryptPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export async function comparePasswds(password: string, passwordHashed: string): Promise<boolean> {
  return await bcrypt.compare(password, passwordHashed)
}
