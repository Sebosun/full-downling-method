interface JWTTokenType {
  iat: number
  exp: number
  userId: number
}
// https://stackoverflow.com/a/65248576
/**
 * Returns a JS object representation of a Javascript Web Token from its common encoded
 * string form.
 *
 * @template T the expected shape of the parsed token
 * @param {string} token a Javascript Web Token in base64 encoded, `.` separated form
 * @returns {(T | undefined)} an object-representation of the token
 * or undefined if parsing failed
 */
export function decodeJWT<T extends JWTTokenType>(
  token: string,
): T | undefined {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  }
  catch {
    return undefined
  }
}
