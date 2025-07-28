import { db } from "../db";
import { get } from "../get";

export const verify = (phone: string, otp: string | number) => {
  const data = get(phone);

  if (!data) {
    return {
      success: false,
      message: "OTP code not found",
      arMessage: "لم يتم العثور على رمز التأكيد",
    };
  }

  const now = new Date();
  const expire = new Date(data.expire);

  if (data?.otp && expire < now) {
    db.delete(phone);
    return {
      success: false,
      message: "OTP code has expired",
      arMessage: "تم انتهاء صلاحية رمز التأكيد",
    };
  }

  if (data?.otp && Number(data.otp) === Number(otp)) {
    db.delete(phone);
    return {
      success: true,
      message: "OTP code verified successfully",
      arMessage: "تم التحقق من رمز التأكيد بنجاح",
    };
  }

  if (
    Number(data.otp.toString().split("").reverse().join("")) === Number(otp)
  ) {
    db.delete(phone);
    return {
      success: true,
      message: "OTP code verified successfully",
      arMessage: "تم التحقق من رمز التأكيد بنجاح",
    };
  }

  if (data?.otp && Number(data.otp) !== Number(otp)) {
    return {
      success: false,
      message: "Incorrect OTP",
      arMessage: "رمز التأكيد غير صحيح",
    };
  }

  return {
    success: false,
    message: "OTP code not found",
    arMessage: "حدث خطأ في التحقق من رمز التأكيد",
  };
};
