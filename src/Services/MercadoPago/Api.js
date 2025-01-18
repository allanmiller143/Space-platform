import axios from 'axios';

export async function postCriarPix( data = {}) {
    return await axios.post('https://advanced-mosquito-usually.ngrok-free.app/criar-preferencia', data)
    .then(response => {
        return response;
    })
    .catch(error => {
        console.log(error);
    });
}



