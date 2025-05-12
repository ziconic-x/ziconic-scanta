import { customAlphabet } from 'nanoid'

// Using a custom alphabet for better readability while maintaining security
// Excluding similar-looking characters like 1/I, 0/O
const generateSecureToken = customAlphabet(
  '23456789ABCDEFGHJKLMNPQRSTUVWXYZ',
  16, // length of the token
)

export { generateSecureToken }
