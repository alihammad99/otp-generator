export function init(db: any) {
  return {
    generate(phone: string, length = 4, expire = 10) {
      const otp = Math.floor(
        Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
      ).toString();

      const data = {
        otp: Number(otp),
        expire: new Date(Date.now() + expire * 60 * 1000),
        phone,
      };

      db.set(phone, data);

      return {
        success: true,
        message: "OTP generated successfully",
        data,
      };
    },

    verify(phone: string, otp: string | number) {
      const data = db.get(phone);

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
    },
  };
}
