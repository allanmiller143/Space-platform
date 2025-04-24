/* eslint-disable no-unused-vars */
import { postData } from "../../../../Services/Api";

export async function openNewChat(socket, email) {
  const token = localStorage.getItem('token');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  try {
    const response = await postData(`chat/${email}`, {}, token);
    let chatId;
    if (response.status === 200 || response.status === 201) {
      chatId = response.data.id;
      localStorage.setItem('chatId', chatId);
    } else {
      console.log(`ocorreu um erro: ${response}`);
    }

    const data = {
      email: currentUser.email,
      chatId: chatId
    };

    // eslint-disable-next-line no-unused-vars
    const list = await new Promise((resolve, reject) => {
      socket.emit('open_chat', data, (msg) => {
        resolve(msg);
      });
    });

    return list;

  } catch (error) {
    console.log(error);
  }
}
