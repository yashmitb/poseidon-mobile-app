// Password policy, mirrored on the server (backend academyAuth.js):
// 8+ characters, at least one uppercase letter, at least one symbol.
export function passwordError(pw: string): string | null {
  if (pw.length < 8) return 'Password must be at least 8 characters.'
  if (!/[A-Z]/.test(pw)) return 'Password must include an uppercase letter.'
  if (!/[^A-Za-z0-9]/.test(pw)) return 'Password must include a symbol.'
  return null
}
