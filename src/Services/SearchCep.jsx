// cepService.js
const fetchCepData = async (cep) => {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    if (data.cep) {
      return {
        street: data.logradouro,
        city: data.localidade,
        district: data.bairro,
        state: data.uf,
        phone: data.ddd,
      };
    } else {
      throw new Error('CEP não encontrado');
    }
  } catch (error) {
    console.error('Erro ao consultar CEP:', error);
    throw error;
  }
};

export default fetchCepData;
