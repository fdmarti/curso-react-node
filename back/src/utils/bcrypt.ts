import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export const Bcryp = {
  async hashPassword (password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_ROUNDS)
  },
  async comparePassword (payload: string, password: string): Promise<boolean> {
    return await bcrypt.compare(payload, password)
  }
}
