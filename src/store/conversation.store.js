import { create } from "zustand";
import { conversationURL } from "../utils/endpoints";
import axios from "axios";

const useConversationStore = create((set) => ({
    currentUserConversations: [],
    currentUserConversationCount: 0,

    getCurrentUserConversations: async (user) =>
    {
        const response = await axios.get(conversationURL + user);
        set({
            currentUserConversations: response?.data?.conversations,
            currentUserConversationCount: response?.data?.count,
        })
    }
}));

export default useConversationStore;