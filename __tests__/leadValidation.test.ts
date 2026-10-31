import { validateLead, normaliseMobile, isValidIndianMobile, createRateLimiter, LOW_INCOME_TAG_BELOW } from '@/lib/leadValidation';

const good = { need: 'Credit card debt', monthlyIncome: '55,000', mobile: '+91 98765 43210', consent: true };

describe('validateLead', () => {
  it('accepts a complete lead and normalises it', () => {
    const r = validateLead(good);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.lead.mobile).toBe('9876543210');
      expect(r.lead.monthlyIncome).toBe(55000);
      expect(r.lead.segment).toBe('standard');
    }
  });

  it('keeps low-income visitors and tags them instead of rejecting', () => {
    const r = validateLead({ ...good, monthlyIncome: String(LOW_INCOME_TAG_BELOW - 1) });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.lead.segment).toBe('below_income_guideline');
  });

  it('requires explicit consent, a known need, an income and a valid mobile', () => {
    const r = validateLead({ need: 'x', monthlyIncome: 'abc', mobile: '12345', consent: false });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(Object.keys(r.errors).sort()).toEqual(['consent', 'mobile', 'monthlyIncome', 'need']);
  });

  it('does not treat missing or string consent as consent', () => {
    expect(validateLead({ ...good, consent: undefined }).ok).toBe(false);
    expect(validateLead({ ...good, consent: 'true' }).ok).toBe(false);
  });

  it('flags the honeypot as a bot without field errors', () => {
    const r = validateLead({ ...good, website: 'http://spam' });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.bot).toBe(true);
  });

  it('rejects markup in the name', () => {
    expect(validateLead({ ...good, name: '<script>' }).ok).toBe(false);
  });
});

describe('mobile helpers', () => {
  it('strips +91 and punctuation', () => {
    expect(normaliseMobile('+91-98765-43210')).toBe('9876543210');
    expect(normaliseMobile('09876543210')).toBe('09876543210');
  });
  it('accepts only numbers starting 6-9 with 10 digits', () => {
    expect(isValidIndianMobile('9876543210')).toBe(true);
    expect(isValidIndianMobile('5876543210')).toBe(false);
    expect(isValidIndianMobile('987654321')).toBe(false);
  });
});

describe('createRateLimiter', () => {
  it('blocks after the limit and recovers after the window', () => {
    const allow = createRateLimiter(2, 1000);
    expect(allow('ip', 0)).toBe(true);
    expect(allow('ip', 10)).toBe(true);
    expect(allow('ip', 20)).toBe(false);
    expect(allow('other', 20)).toBe(true);
    expect(allow('ip', 1100)).toBe(true);
  });
});
