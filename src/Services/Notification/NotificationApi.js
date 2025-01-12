/* eslint-disable no-unused-vars */

export async function openNotification(socket, email) {
  try {
    const data = {
      email: email,
    };
    
    const list = await new Promise((resolve, reject) => {
      socket.emit('open_notification', data, (msg) => {
        resolve(msg);
      });
    });

    return list;

  } catch (error) {
    console.log(error);
  }
}
