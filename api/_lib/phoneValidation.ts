export interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
  placeholder: string;
  regex: RegExp;
  errorMsg: string;
}

export const COUNTRIES: Country[] = [
  {
    code: "CY",
    name: "Cyprus",
    flag: "🇨🇾",
    dialCode: "+357",
    placeholder: "99 123456",
    regex: /^[97]\d{7}$/,
    errorMsg: "Cyprus number must be 8 digits (excluding leading zero)."
  },
  {
    code: "CH",
    name: "Switzerland",
    flag: "🇨🇭",
    dialCode: "+41",
    placeholder: "79 123 45 67",
    regex: /^[1-9]\d{8}$/,
    errorMsg: "Swiss number must be 9 digits (excluding leading zero)."
  },
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    dialCode: "+1",
    placeholder: "201 555 0123",
    regex: /^[2-9]\d{9}$/,
    errorMsg: "US number must be 10 digits."
  },
  {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    dialCode: "+44",
    placeholder: "7700 900077",
    regex: /^7\d{9}$/,
    errorMsg: "UK mobile number must be 10 digits starting with 7."
  },
  {
    code: "DE",
    name: "Germany",
    flag: "🇩🇪",
    dialCode: "+49",
    placeholder: "170 1234567",
    regex: /^[1-9]\d{9,11}$/,
    errorMsg: "German mobile number must be 10 to 12 digits."
  },
  {
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    dialCode: "+91",
    placeholder: "98765 43210",
    regex: /^[6-9]\d{9}$/,
    errorMsg: "Indian number must be 10 digits starting with 6-9."
  },
  {
    code: "FR",
    name: "France",
    flag: "🇫🇷",
    dialCode: "+33",
    placeholder: "6 12 34 56 78",
    regex: /^[67]\d{8}$/,
    errorMsg: "French mobile number must be 9 digits starting with 6 or 7."
  },
  {
    code: "BE",
    name: "Belgium",
    flag: "🇧🇪",
    dialCode: "+32",
    placeholder: "470 12 34 56",
    regex: /^[4-9]\d{8}$/,
    errorMsg: "Belgium mobile number must be 9 digits (excluding leading zero)."
  },
  {
    code: "IT",
    name: "Italy",
    flag: "🇮🇹",
    dialCode: "+39",
    placeholder: "312 345 6789",
    regex: /^3[1-9]\d{8}$/,
    errorMsg: "Italian mobile number must be 10 digits starting with 3."
  },
  {
    code: "ES",
    name: "Spain",
    flag: "🇪🇸",
    dialCode: "+34",
    placeholder: "612 34 56 78",
    regex: /^[67]\d{8}$/,
    errorMsg: "Spanish mobile number must be 9 digits starting with 6 or 7."
  },
  {
    code: "NL",
    name: "Netherlands",
    flag: "🇳🇱",
    dialCode: "+31",
    placeholder: "6 12345678",
    regex: /^6[1-9]\d{7}$/,
    errorMsg: "Dutch mobile number must be 9 digits starting with 6."
  },
  {
    code: "AT",
    name: "Austria",
    flag: "🇦🇹",
    dialCode: "+43",
    placeholder: "664 1234567",
    regex: /^6[1-9]\d{8,9}$/,
    errorMsg: "Austrian mobile number must be 9 or 10 digits starting with 6."
  },
  {
    code: "SE",
    name: "Sweden",
    flag: "🇸🇪",
    dialCode: "+46",
    placeholder: "70 123 45 67",
    regex: /^7[02369]\d{7}$/,
    errorMsg: "Swedish mobile number must be 9 digits starting with 7."
  },
  {
    code: "GEN",
    name: "Other",
    flag: "🌐",
    dialCode: "",
    placeholder: "+357 99 123456",
    regex: /^\+?[1-9]\d{6,14}$/,
    errorMsg: "Please enter a valid phone number with dial code (7 to 15 digits)."
  }
];

export const getCountry = (code: string): Country => {
  return COUNTRIES.find((c) => c.code === code) || COUNTRIES[0];
};

export const validatePhoneNumber = (val: string, countryCode: string): string | undefined => {
  const cleanPhone = val.replace(/\s+/g, "").replace(/[-()]/g, "");
  if (!cleanPhone) return undefined; // Make phone optional as requested

  const country = getCountry(countryCode);
  
  if (country.code === "GEN") {
    if (!country.regex.test(cleanPhone)) {
      return country.errorMsg;
    }
    return undefined;
  }

  let nationalNumber = cleanPhone;
  const dialCodeNoPlus = country.dialCode.replace("+", "");
  
  if (nationalNumber.startsWith(country.dialCode)) {
    nationalNumber = nationalNumber.slice(country.dialCode.length);
  } else if (nationalNumber.startsWith(dialCodeNoPlus)) {
    nationalNumber = nationalNumber.slice(dialCodeNoPlus.length);
  } else if (nationalNumber.startsWith("00" + dialCodeNoPlus)) {
    nationalNumber = nationalNumber.slice(("00" + dialCodeNoPlus).length);
  } else if (nationalNumber.startsWith("0")) {
    nationalNumber = nationalNumber.slice(1);
  }

  if (!country.regex.test(nationalNumber)) {
    return country.errorMsg;
  }

  return undefined;
};

export const formatFullPhoneNumber = (val: string, countryCode: string): string => {
  const cleanPhone = val.replace(/\s+/g, "").replace(/[-()]/g, "");
  if (!cleanPhone) return "";
  const country = getCountry(countryCode);
  if (country.code === "GEN" || cleanPhone.startsWith("+")) {
    return cleanPhone;
  }
  let nationalNumber = cleanPhone;
  const dialCodeNoPlus = country.dialCode.replace("+", "");
  if (nationalNumber.startsWith(country.dialCode)) {
    return nationalNumber;
  }
  if (nationalNumber.startsWith(dialCodeNoPlus)) {
    return "+" + nationalNumber;
  }
  if (nationalNumber.startsWith("00" + dialCodeNoPlus)) {
    return "+" + nationalNumber.slice(2);
  }
  if (nationalNumber.startsWith("0")) {
    nationalNumber = nationalNumber.slice(1);
  }
  return country.dialCode + nationalNumber;
};
