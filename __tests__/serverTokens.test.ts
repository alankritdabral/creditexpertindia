process.env.HMAC_SECRET = 'test-hmac-secret-123';

import { issueOtpToken, verifyOtpToken, signToken, verifyToken, OTP_TOKEN_TTL_MS } from '@/lib/serverTokens';

describe('serverTokens', () => {
  const now = 1_700_000_000_000;

  it('accepts an OTP token for the same mobile number, however it is formatted', () => {
    const token = issueOtpToken('9876543210', now);
    expect(verifyOtpToken('9876543210', token, now + 1000)).toBe(true);
    expect(verifyOtpToken('+91 98765 43210', token, now + 1000)).toBe(true);
  });

  it('rejects a token for a different mobile number', () => {
    const token = issueOtpToken('9876543210', now);
    expect(verifyOtpToken('9876543211', token, now + 1000)).toBe(false);
  });

  it('rejects an expired token', () => {
    const token = issueOtpToken('9876543210', now);
    expect(verifyOtpToken('9876543210', token, now + OTP_TOKEN_TTL_MS + 1)).toBe(false);
  });

  it('rejects missing, malformed and tampered tokens', () => {
    const token = issueOtpToken('9876543210', now);
    expect(verifyOtpToken('9876543210', undefined, now)).toBe(false);
    expect(verifyOtpToken('9876543210', 'garbage', now)).toBe(false);
    const [exp] = token.split('.');
    expect(verifyOtpToken('9876543210', `${Number(exp) + 999999}.${token.split('.')[1]}`, now)).toBe(false);
    expect(verifyOtpToken('9876543210', `${exp}.${'0'.repeat(64)}`, now)).toBe(false);
  });

  it('does not let a token be reused across scopes', () => {
    const team = signToken('team', 'delhi', now + 60_000);
    expect(verifyToken('team', 'delhi', team, now)).toBe(true);
    expect(verifyToken('otp', 'delhi', team, now)).toBe(false);
    expect(verifyToken('team', 'rudrapur', team, now)).toBe(false);
  });
});
