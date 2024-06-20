export const generatePassword = (length: number) => {
  const specialChars = "!@#$%&*+?/";
  const numbers = "0123456789";
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const allChars = specialChars + numbers + lowerCaseLetters + upperCaseLetters;

  let password = "";
  password += specialChars.charAt(
    Math.floor(Math.random() * specialChars.length)
  );
  password += numbers.charAt(Math.floor(Math.random() * numbers.length));
  password += lowerCaseLetters.charAt(
    Math.floor(Math.random() * lowerCaseLetters.length)
  );
  password += upperCaseLetters.charAt(
    Math.floor(Math.random() * upperCaseLetters.length)
  );

  for (let i = 4; i < length; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
  return password;
};
