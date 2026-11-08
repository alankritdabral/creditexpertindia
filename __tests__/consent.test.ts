import { getConsent, setConsent, clearConsent, onConsentChange, toGtagConsent, NOTICE_VERSION } from "@/lib/consent";

/**
 * jest.config.js uses testEnvironment: 'node', so there is no real `window`
 * or `localStorage` by default. lib/consent.ts reads `window.localStorage`
 * fresh on every call (never caches it at import time), so installing or
 * removing `global.window` between tests is enough to switch between the
 * "storage unavailable" and "normal browser" paths — no module re-import
 * is needed.
 */

function installFakeLocalStorage() {
  const store = new Map<string, string>();
  const fakeStorage = {
    getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
    clear: () => store.clear(),
    key: (i: number) => Array.from(store.keys())[i] ?? null,
    get length() {
      return store.size;
    },
  } as Storage;
  (global as unknown as { window: Window }).window = { localStorage: fakeStorage } as unknown as Window;
  return fakeStorage;
}

function uninstallFakeWindow() {
  delete (global as { window?: Window }).window;
}

describe("lib/consent", () => {
  const unsubscribes: Array<() => void> = [];
  const subscribe = (cb: Parameters<typeof onConsentChange>[0]) => {
    const unsubscribe = onConsentChange(cb);
    unsubscribes.push(unsubscribe);
    return unsubscribe;
  };

  afterEach(() => {
    uninstallFakeWindow();
    unsubscribes.splice(0).forEach((unsubscribe) => unsubscribe());
  });

  it("returns null before any choice has been made (no window)", () => {
    expect(getConsent()).toBeNull();
  });

  it("setConsent never throws when storage is unavailable, and still notifies listeners", () => {
    const heard: Array<ReturnType<typeof getConsent>> = [];
    subscribe((s) => heard.push(s));
    expect(() => setConsent({ analytics: "granted", recordings: "denied" })).not.toThrow();
    expect(heard).toHaveLength(1);
    expect(heard[0]?.analytics).toBe("granted");
  });

  it("persists and reads back a choice when localStorage is available", () => {
    installFakeLocalStorage();
    expect(getConsent()).toBeNull();
    setConsent({ analytics: "granted", recordings: "granted" });
    const stored = getConsent();
    expect(stored).not.toBeNull();
    expect(stored?.analytics).toBe("granted");
    expect(stored?.recordings).toBe("granted");
    expect(stored?.noticeVersion).toBe(NOTICE_VERSION);
    expect(typeof stored?.ts).toBe("string");
  });

  it("clearConsent removes the stored choice and notifies listeners with null", () => {
    installFakeLocalStorage();
    setConsent({ analytics: "granted", recordings: "granted" });
    expect(getConsent()).not.toBeNull();

    const heard: Array<ReturnType<typeof getConsent>> = [];
    subscribe((s) => heard.push(s));
    clearConsent();
    expect(getConsent()).toBeNull();
    expect(heard).toEqual([null]);
  });

  it("ignores a malformed stored value instead of throwing", () => {
    const fake = installFakeLocalStorage();
    fake.setItem("cei_consent", "{not json");
    expect(getConsent()).toBeNull();
  });

  it("ignores a stored value missing required fields", () => {
    const fake = installFakeLocalStorage();
    fake.setItem("cei_consent", JSON.stringify({ analytics: "granted" }));
    expect(getConsent()).toBeNull();
  });

  it("toGtagConsent always denies ad storage/personalization regardless of analytics choice", () => {
    expect(toGtagConsent({ analytics: "granted" })).toEqual({
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "granted",
    });
    expect(toGtagConsent({ analytics: "denied" })).toEqual({
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
  });
});
