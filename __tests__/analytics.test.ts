import { findPII, sanitizeParams } from "@/lib/analytics/pii";
import { contentGroupFor } from "@/lib/analytics/contentGroup";
import { sanitizeAttribution } from "@/lib/analytics/attribution";
import { bandAmount, bandRate, bandSavings, bandDuration } from "@/lib/analytics/events";
import { staticRoutes } from "@/lib/routes";
import { cities } from "@/lib/cities";
import { articles } from "@/content/articles";

describe("lib/analytics/pii", () => {
  it.each([
    ["9876543210"],
    ["+91 98765 43210"],
    ["919876543210"],
    ["ABCDE1234F"],
    ["abcde1234f"],
    ["a@b.co"],
    ["someone.else@example.co.in"],
    ["1234 5678 9012"],
    ["123456789012"],
  ])("flags %s as personal data", (value) => {
    expect(findPII(value).length).toBeGreaterThan(0);
  });

  it.each([["5-10L"], ["12-14"], ["home"], ["cta_click"], ["eligibility"], [""], ["48"]])(
    "does not flag %s as personal data",
    (value) => {
      expect(findPII(value)).toEqual([]);
    }
  );

  it("drops a parameter whose value looks like personal data, keeps the rest", () => {
    const out = sanitizeParams({
      form_id: "eligibility",
      error_field: "mobile",
      leaked_mobile: "9876543210",
      leaked_pan: "ABCDE1234F",
      leaked_email: "a@b.co",
    });
    expect(out.form_id).toBe("eligibility");
    expect(out.error_field).toBe("mobile");
    expect(out).not.toHaveProperty("leaked_mobile");
    expect(out).not.toHaveProperty("leaked_pan");
    expect(out).not.toHaveProperty("leaked_email");
  });

  it("passes through non-string values untouched", () => {
    const out = sanitizeParams({ tenure_months: 48, is_resend: false });
    expect(out).toEqual({ tenure_months: 48, is_resend: false });
  });
});

describe("lib/analytics/contentGroup", () => {
  it("maps the homepage to 'home'", () => {
    expect(contentGroupFor("/")).toBe("home");
  });

  it("maps every static route to a group", () => {
    for (const route of staticRoutes) {
      expect(typeof contentGroupFor(route.path || "/")).toBe("string");
    }
  });

  it("maps every city page to 'city'", () => {
    for (const city of cities) {
      expect(contentGroupFor(`/personal-loan-in-${city.slug}`)).toBe("city");
    }
  });

  it("maps every article to 'learning'", () => {
    for (const article of articles) {
      expect(contentGroupFor(`/learning-center/${article.slug}`)).toBe("learning");
    }
  });

  it("maps all three calculator routes to 'calculator'", () => {
    expect(contentGroupFor("/calculators/debt-consolidation-calculator")).toBe("calculator");
    expect(contentGroupFor("/personal-loan-emi-calculator")).toBe("calculator");
    expect(contentGroupFor("/emi-savings-calculator")).toBe("calculator");
  });
});

describe("lib/analytics/attribution sanitizeAttribution", () => {
  it("keeps only allowlisted keys", () => {
    const out = sanitizeAttribution({
      utm_source: "google",
      utm_medium: "cpc",
      mobile: "9876543210",
      password: "hunter2",
      __proto__: "x",
    });
    expect(out).toEqual({ utm_source: "google", utm_medium: "cpc" });
  });

  it("caps each value at 100 characters", () => {
    const long = "a".repeat(500);
    const out = sanitizeAttribution({ utm_campaign: long });
    expect(out.utm_campaign).toHaveLength(100);
  });

  it("returns an empty object for non-object input", () => {
    expect(sanitizeAttribution(null)).toEqual({});
    expect(sanitizeAttribution(undefined)).toEqual({});
    expect(sanitizeAttribution("x")).toEqual({});
  });

  it("ignores non-string values for allowlisted keys", () => {
    expect(sanitizeAttribution({ gclid: 12345 })).toEqual({});
  });
});

describe("lib/analytics/events banding helpers", () => {
  it("bands amounts at their edges", () => {
    expect(bandAmount(0)).toBe("<1L");
    expect(bandAmount(99_999)).toBe("<1L");
    expect(bandAmount(100_000)).toBe("1-3L");
    expect(bandAmount(5_000_000)).toBe("50L+");
    expect(bandAmount(10_000_000)).toBe("50L+");
  });

  it("bands rates at their edges", () => {
    expect(bandRate(9.99)).toBe("<10");
    expect(bandRate(10)).toBe("10-12");
    expect(bandRate(24)).toBe("24+");
    expect(bandRate(30)).toBe("24+");
  });

  it("bands savings at their edges", () => {
    expect(bandSavings(0)).toBe("0"); // no measurable savings
    expect(bandSavings(1)).toBe("<1k");
    expect(bandSavings(999)).toBe("<1k");
    expect(bandSavings(1_000)).toBe("1-3k");
    expect(bandSavings(15_000)).toBe("10k+");
  });

  it("bands durations at their edges", () => {
    expect(bandDuration(0)).toBe("<3s");
    expect(bandDuration(2999)).toBe("<3s");
    expect(bandDuration(3000)).toBe("3-10s");
    expect(bandDuration(45_000)).toBe("30s+");
  });
});
