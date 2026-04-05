import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.SESSION_SECRET!);
const MAGIC_LINK_EXPIRY = 15 * 60; // 15 minutes in seconds

interface MagicLinkPayload {
  email: string;
  customerId: string;
  name: string;
}

export async function createMagicLinkToken(payload: MagicLinkPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAGIC_LINK_EXPIRY}s`)
    .sign(secret);
}

export async function verifyMagicLinkToken(token: string): Promise<MagicLinkPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return {
      email: payload.email as string,
      customerId: payload.customerId as string,
      name: payload.name as string,
    };
  } catch {
    return null;
  }
}
