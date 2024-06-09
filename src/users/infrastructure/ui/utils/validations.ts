const validateName = (name: string) => {
  const regex = /^[a-zA-Z]+$/;
  return regex.test(name);
};

const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validatePassword = (password: string) => {
  const regex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
  return regex.test(password);
};

export {validateName, validateEmail, validatePassword};
