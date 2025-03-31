import { isValidCPF, isValidRG, isValidPhone, isValidEmail, isValidCEP } from "./Validations";

export const validateClientInfo = (client) => {
    const errors = {};
  
    if (!client.fullName) errors.fullName = "Campo obrigatório";
    if (!client.maritalStatus) errors.maritalStatus = "Campo obrigatório";
    if (!client.profession) errors.profession = "Campo obrigatório";
    
    if (!client.rg) {
        errors.rg = "Campo obrigatório";
    } else {
        const rgError = isValidRG(client.rg);
        if (rgError) errors.rg = rgError;
    }
    
    if (!client.cpf) {
        errors.cpf = "Campo obrigatório";
    } else {
        const cpfError = isValidCPF(client.cpf);
        if (cpfError) errors.cpf = cpfError;
    }
    
    if (!client.phone) {
        errors.phone = "Campo obrigatório";
    } else {
        const phoneError = isValidPhone(client.phone);
        if (phoneError) errors.phone = phoneError;
    }
    
    if (!client.email) {
        errors.email = "Campo obrigatório";
    } else {
        const emailError = isValidEmail(client.email);
        if (emailError) errors.email = emailError;
    }
    
    if (!client.cep) {
        errors.cep = "Campo obrigatório";
    } else {
        const cepError = isValidCEP(client.cep);
        if (cepError) errors.cep = cepError;
    }
    
    if (!client.street) errors.street = "Campo obrigatório";
    if (!client.number) errors.number = "Campo obrigatório";
    if (!client.neighborhood) errors.neighborhood = "Campo obrigatório";
    if (!client.city) errors.city = "Campo obrigatório";
    if (!client.state) errors.state = "Campo obrigatório";
  
    return errors;
};
