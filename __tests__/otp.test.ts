import { generateOtp, storeOtp, verifyStoredOtp, canRequestOtp } from "../lib/otpStore";

describe("OTP Service and Store", () => {
  const testMobile = "9876543210";

  it("should generate a 4-digit numeric OTP", () => {
    const otp = generateOtp(4);
    expect(otp).toHaveLength(4);
    expect(/^\d{4}$/.test(otp)).toBe(true);
  });

  it("should store and successfully verify a valid OTP", async () => {
    const mobile = "9112233445";
    const otp = "4321";
    await storeOtp(mobile, otp, 60);

    const result = await verifyStoredOtp(mobile, otp);
    expect(result.success).toBe(true);

    // Replay attempt should fail
    const replayResult = await verifyStoredOtp(mobile, otp);
    expect(replayResult.success).toBe(false);
  });

  it("should reject an invalid OTP and track attempts", async () => {
    const mobile = "9988776655";
    const otp = "7890";
    await storeOtp(mobile, otp, 60);

    const wrongResult = await verifyStoredOtp(mobile, "0000");
    expect(wrongResult.success).toBe(false);
    expect(wrongResult.error).toContain("Incorrect");

    // Correct OTP should still succeed while attempts < 5
    const correctResult = await verifyStoredOtp(mobile, otp);
    expect(correctResult.success).toBe(true);
  });

  it("should enforce cooldown on repeated OTP requests", async () => {
    const mobile = "9555444333";
    await storeOtp(mobile, "1111", 60, 30);

    const check = await canRequestOtp(mobile, 30);
    expect(check.allowed).toBe(false);
  });
});
