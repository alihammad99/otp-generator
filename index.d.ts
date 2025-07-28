export interface OtpData {
  otp: number;
  expire: Date;
  phone: string;
}

export interface OtpResponseSuccess {
  success: true;
  message: string;
  data?: OtpData;
  arMessage?: string;
}

export interface OtpResponseFailure {
  success: false;
  message: string;
  arMessage?: string;
}

export interface OtpService {
  generate(phone: string, length?: number, expire?: number): OtpResponseSuccess;
  verify(
    phone: string,
    otp: string | number
  ): OtpResponseSuccess | OtpResponseFailure;
}

export function init(db: {
  set(key: string, value: any): void;
  get(key: string): any;
  delete(key: string): void;
}): OtpService;
