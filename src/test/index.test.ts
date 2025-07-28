import { test, expect, beforeEach } from "bun:test";
import SimpleDB from "simple-json-db";
import { init } from "..";

const db = new SimpleDB("./otp.json");
const otp = init(db);

const phone = "+964123456789";

beforeEach(() => {
  db.delete(phone);
});

test("generate stores OTP with correct length and expiry", () => {
  otp.generate(phone, 6, 5); // 6-digit OTP, expire in 5 minutes

  const data = db.get(phone);
  expect(data).not.toBeNull();
  expect(typeof data.otp).toBe("number");
  expect(data.otp.toString().length).toBe(6);

  // expire should be a date string in the future
  const expireDate = new Date(data.expire);
  expect(expireDate.getTime()).toBeGreaterThan(Date.now());
});

test("verify fails if no OTP data found", () => {
  const result = otp.verify(phone, "1234");
  expect(result.success).toBe(false);
  expect(result.message).toBe("OTP code not found");
});

test("verify fails and deletes OTP if expired", () => {
  const pastDate = new Date(Date.now() - 1000 * 60).toISOString();
  db.set(phone, { otp: "1234", expire: pastDate });

  const result = otp.verify(phone, "1234");
  expect(result.success).toBe(false);
  expect(result.message).toBe("OTP code has expired");
  expect(db.get(phone)).toBe(undefined);
});

test("verify fails if OTP incorrect but NOT deleted", () => {
  const futureDate = new Date(Date.now() + 1000 * 60 * 10).toISOString();
  db.set(phone, { otp: "1234", expire: futureDate });

  const result = otp.verify(phone, "0000");
  expect(result.success).toBe(false);
  expect(result.message).toBe("Incorrect OTP");
  expect(db.get(phone)).not.toBeNull();
});

test("verify succeeds and deletes OTP if correct and not expired", () => {
  const futureDate = new Date(Date.now() + 1000 * 60 * 10).toISOString();
  db.set(phone, { otp: "1234", expire: futureDate });

  const result = otp.verify(phone, "1234");
  expect(result.success).toBe(true);
  expect(result.message).toBe("OTP code verified successfully");
  expect(db.get(phone)).toBe(undefined);
});
