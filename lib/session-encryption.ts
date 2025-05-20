import { SignJWT, jwtVerify } from 'jose'
import 'server-only'

// Make sure to add SESSION_SECRET to your .env file
// Generate with: openssl rand -base64 32
const secretKey = process.env.SESSION_SECRET
if (!secretKey) {
  throw new Error('SESSION_SECRET is not defined in environment variables')
}

const encodedKey = new TextEncoder().encode(secretKey)

export async function encryptSession(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decryptSession(token: string | undefined) {
  if (!token) return null
  
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.error('Failed to verify session token:', error)
    return null
  }
}