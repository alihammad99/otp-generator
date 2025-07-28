# otp-simple-generator

A simple and lightweight OTP (One-Time Password) generator, retriever, and verifier for JavaScript projects. Works with any JavaScript framework or library (React, Vue, Angular, Node.js, etc.).

## Installation

```bash
npm install otp-simple-generator
```

## Usage

Import the package:

```js
import otp from "otp-simple-generator";
```

The package provides three main methods:

### `otp.generate(phone, length = 4, expire = 10)`

Generates an OTP for the given phone number.

- `phone` (string): Phone number to associate with the OTP.
- `length` (number, optional): Length of the OTP (default is 4 digits).
- `expire` (number, optional): Expiration time in minutes (default is 10 minutes).

Returns an object containing success status, message, and the OTP data.

### `otp.get(phone)`

Retrieves the OTP data stored for the given phone number.  
Returns the OTP data object or `null` if none found.

### `otp.verify(phone, otp)`

Verifies the provided OTP for the given phone number.  
Returns an object with success status and messages in both English and Arabic.

## Example

```js
const generated = otp.generate("+964123456789", 6, 5);
console.log(generated);

const data = otp.get("+964123456789");
console.log(data);

const verified = otp.verify("+964123456789", "123456");
console.log(verified);
```

### Output Example

#### `otp.generate("+964123456789", 6, 5)`

```json
{
  "success": true,
  "message": "OTP generated successfully",
  "data": {
    "otp": 123456,
    "expire": "2025-07-28T12:34:56.789Z",
    "phone": "+964123456789"
  }
}
```

#### `otp.get("+964123456789")`

```json
{
  "otp": 123456,
  "expire": "2025-07-28T12:34:56.789Z",
  "phone": "+964123456789"
}
```

#### `otp.verify("+964123456789", "123456")`

```json
{
  "success": true,
  "message": "OTP code verified successfully",
  "arMessage": "تم التحقق من رمز التأكيد بنجاح"
}
```

## How It Works

This package uses [simple-json-db](https://www.npmjs.com/package/simple-json-db) as a local JSON key-value store for OTP data.

## License

MIT © Ali Hammad
