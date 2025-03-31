import fetchCepData from "../../../../../../Services/SearchCep";

// Validação real de CPF usando o algoritmo oficial
export const isValidCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return "CPF inválido.";
  
    let sum = 0, rest;
  
    for (let i = 1; i <= 9; i++) sum += parseInt(cpf[i - 1]) * (11 - i);
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf[9])) return "CPF inválido.";
  
    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(cpf[i - 1]) * (12 - i);
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf[10])) return "CPF inválido.";
  
    return ""; // CPF válido
};
  
  // Validação básica de RG (Formato: apenas números, mínimo de 7 e máximo de 10)
export const isValidRG = (rg) => {
    rg = rg.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (rg.length < 7 || rg.length > 10) return "RG inválido.";
    return "";
};

// Validação de telefone (Formato esperado: (XX) 9XXXX-XXXX)
export const isValidPhone = (phone) => {
    const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    return phoneRegex.test(phone) ? "" : "Telefone inválido. Exemplo: (11) 91234-5678";
};

// Validação de email
export const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) ? "" : "E-mail inválido.";
};

// Validação de CEP (Formato: 00000-000 ou apenas números)
export const isValidCEP = (cep) => {
    cep = cep.replace(/\D/g, ""); // Remove caracteres não numéricos
    return cep.length === 8 ? "" : "CEP inválido. Exemplo: 12345-678";
};

export const handleCepChange = async (value,setHistory) => {
  const unmaskedValue = value.replace(/\D/g, ''); // Removes any non-numeric characters

  if (unmaskedValue.length === 8) {
    try {
      const cepData = await fetchCepData(unmaskedValue);
      console.log(cepData);
      const data = {
          cep: unmaskedValue,
          street: cepData.street,
          city: cepData.city,
          neighborhood: cepData.district,
          state: cepData.state
      }
  
      setHistory((prev) => ({
          ...prev,
          client:  data ,
        }));

    } catch (error) {
      setHistory((prev) => ({
          ...prev,
          client: {} ,
        }));

    }
  }
};

export const formatCPF = (value) => {
  if (!value) return '';
  const cleaned = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

  if (cleaned.length <= 3) {
    return cleaned;
  } else if (cleaned.length <= 6) {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
  } else if (cleaned.length <= 9) {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
  } else if (cleaned.length <= 11) {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9)}`;
  }

  return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
};


  