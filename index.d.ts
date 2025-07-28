declare module "otp-simple-generator" {
  export interface GenerateResult {
    success: boolean;
    message: string;
    otp?: string;
    expire?: string;
  }

  export interface GetResult {
    otp: string;
    expire: string;
  }

  export interface VerifyResult {
    success: boolean;
    message: string;
    arMessage: string;
  }

  const otp: {
    generate(phone: string, length?: number, expire?: number): GenerateResult;

    get(phone: string): GetResult | null;

    verify(phone: string, otpCode: string): VerifyResult;
  };

  export default otp;
}
