import { create } from "zustand";
import { messageURL } from "../utils/endpoints";
import axios from "axios";

const useMessagesStore = create((set) => ({
    currentConversation: {},
    currentUserMessages: [],
    currentUserMessagesCount: 0,

    setConversationId: (conversation) =>
    {
        set({
            currentConversation: conversation
        })
    },

    getCurrentConversationMessages: async (conversationid) =>
    {
        const response = await axios.get(messageURL + conversationid);
        set({
            currentUserMessages: response?.data,
            currentUserMessagesCount: response?.data?.count,
        })
    },

    addMessage: async (payload) =>
    {
        await axios.post(messageURL, payload)
    },
    setMessege: async (data) =>
    {
        set((state) => ({
            currentUserMessages: [...state.currentUserMessages, data]
        }))
    }
}));

export default useMessagesStore;