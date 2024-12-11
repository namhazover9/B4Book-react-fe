import { axiosClient } from '../ApiConfig/apiConfig';

const CHAT_API_ENDPOINT = '/chat';

const chatApi = {
    getAllChats: (id) => {
        const url = CHAT_API_ENDPOINT + `/getAllChatById/${id}`;
        return axiosClient.get(url,{});
    },

    getChatById: (id) => {
        const url = CHAT_API_ENDPOINT + `/getChatById/${id}`;
        return axiosClient.get(url,{});
    },

    sendMessage: (id,userId, data ) => {
        const url = CHAT_API_ENDPOINT + `/updateChat/${id}/${userId}`;
        return axiosClient.put(url, data);
    },

    createChat: (id) => {
        const url = CHAT_API_ENDPOINT + `/createChat/${id}`;
        return axiosClient.post(url);
    },
}

export default chatApi;