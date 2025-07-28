import { db } from "../db";

export const generate = (phone: string, length = 4, expire = 10) => {
  const otp = Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
  ).toString();

  const data = {
    otp: Number(otp),
    expire: new Date(Date.now() + expire * 60 * 1000),
    phone,
  };

  db.set(phone, data);

  console.log(data);

  return {
    success: true,
    message: "OTP generated successfully",
    data,
  };
};
