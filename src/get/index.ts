import { db } from "../db";

export const get = (phone: string) => {
  const data = db.get(phone);

  return data || null;
};
