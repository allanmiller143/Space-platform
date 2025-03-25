import { useContext } from 'react';
import {postData} from '../Api';
import NotificationContext from '../Notification/NotificationContext/NotificationContext';
 

export async function seeNotification(id, notifications, setNotifications) {
    const token = localStorage.getItem('token');
    try {
        const response = await postData(`notifications/${id}`, {}, token);
        if (response.status === 204) {
            // Atualizar o estado usando a função baseada no estado anterior
            setNotifications((prevNotifications) => {
                const newNotifications = prevNotifications.filter(
                    (notification) => notification.id !== id
                );
                return newNotifications;
            });
        }
    } catch (e) {
        console.log(e);
    }
}


export async function seeAppointmentNotification(id, notifications, setNotifications) {
    const token = localStorage.getItem('token');
    console.log(id);

    // Encontre a notificação específica com base no appointmentId
    const notification = notifications.find((notification) => notification.appointmentId === id);

    // Verifique se a notificação existe antes de tentar usar ela
    if (notification) {
        try {
            const response = await postData(`notifications/${notification.id}`, {}, token);
            if (response.status === 204) {
                // Atualizar o estado usando a função baseada no estado anterior
                setNotifications((prevNotifications) => {
                    const newNotifications = prevNotifications.filter(
                        (notification) => notification.id !== id
                    );
                    return newNotifications;
                });
            }
        } catch (e) {
            console.log(e);
        }
    } else {
        console.log('Notificação não encontrada para o appointmentId:', id);
    }
}

export async function seeSharedNotification(id, notifications, setNotifications) {
    const token = localStorage.getItem('token');
    console.log(id);

    // Encontre a notificação específica com base no appointmentId
    const notification = notifications.find((notification) => notification.sharedPropertyId === id);

    // Verifique se a notificação existe antes de tentar usar ela
    if (notification) {
        try {
            const response = await postData(`notifications/${notification.id}`, {}, token);
            if (response.status === 204) {
                // Atualizar o estado usando a função baseada no estado anterior
                setNotifications((prevNotifications) => {
                    const newNotifications = prevNotifications.filter(
                        (notification) => notification.id !== id
                    );
                    return newNotifications;
                });
            }
        } catch (e) {
            console.log(e);
        }
    } else {
        console.log('Notificação não encontrada para o sharedPropertyId:', id);
    }
}



