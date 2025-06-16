// src/services/validationService.js

export const validateCedula = (cedula) => {
    if (!/^\d{10}$/.test(cedula)) return false;
    const digits = cedula.split('').map(Number);
    const province = parseInt(cedula.substring(0, 2), 10);
    const thirdDigit = digits[2];
    if (province < 1 || province > 24 || thirdDigit >= 6) return false;
  
    const coef = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    const verifier = digits[9];
    const total = digits.slice(0, 9).reduce((sum, digit, index) => {
      let mult = digit * coef[index];
      if (mult > 9) mult -= 9;
      return sum + mult;
    }, 0);
    const checkDigit = (10 - (total % 10)) % 10;
    return checkDigit === verifier;
  };
  
  export const validatePhone = (phone) => /^\d{9}$/.test(phone);
  
  export const handleLetterInput = (e) => {
    const key = e.key;
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/.test(key)) {
      e.preventDefault();
    }
  };
  
  export const handleUppercaseChange = (e, onChange) => {
    const { name, value } = e.target;
    onChange({ target: { name, value: value.toUpperCase() } });
  };
  