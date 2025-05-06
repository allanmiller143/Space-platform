export const isValidName = (name) => {
    return name.trim().length > 0;
  };
  
  export const isValidCPF = (cpf) => {
    if (!cpf) return false;
  
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
  
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false; // Verifica se tem 11 dígitos e não é repetido
  
    let sum = 0, remainder;
  
    // Calcula o primeiro dígito verificador
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf[i]) * (10 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf[9])) return false;
  
    sum = 0;
    
    // Calcula o segundo dígito verificador
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf[i]) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf[10])) return false;
  
    return true;
  };
  
  
  export const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  

  
  export const isValidDuration = (duration) => {
    return [7, 15, 30].includes(Number(duration));
  };
  
  export const isValidImage = (image) => {
    return image && image.length > 0;
  };
  
  export const isFormValid = (form) => {
      return (
        isValidName(form.name) &&
        isValidCPF(form.cpf) &&
        isValidEmail(form.email) &&
        isValidDuration(form.duration)
      );
  
  };
  