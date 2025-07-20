import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  chatbots: [],
  selectedContact: null,
  contactType: "user", // "user" or "chatbot"
  isUsersLoading: false,
  isMessagesLoading: false,
  isChatbotsLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getChatbots: async () => {
    set({ isChatbotsLoading: true });
    try {
      const res = await axiosInstance.get("/chatbots");
      set({ chatbots: res.data });
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to fetch chatbots");
    } finally {
      set({ isChatbotsLoading: false });
    }
  },

  getMessages: async (contactId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${contactId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedContact, contactType, messages } = get();
    try {
      if (contactType === "chatbot") {
        const res = await axiosInstance.post(`/chatbots/send/${selectedContact._id}`, messageData);
        set({ messages: [...messages, res.data.userMessage, res.data.aiMessage] });
      } else {
        const res = await axiosInstance.post(`/messages/send/${selectedContact._id}`, messageData);
        set({ messages: [...messages, res.data] });
      }
    } catch (error) {
      toast.error(error.response?.data?.error || error.response?.data?.message || "Failed to send message");
    }
  },

  sendMessageToBot: async (messageData) => {
    const { selectedContact, messages } = get();
    try {
      const res = await axiosInstance.post(`/chatbots/send/${selectedContact._id}`, messageData);
      set({ messages: [...messages, res.data.userMessage, res.data.aiMessage] });
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to send message to chatbot");
    }
  },

  createChatbot: async (chatbotData) => {
    try {
      const res = await axiosInstance.post("/chatbots/create", chatbotData);
      const { chatbots } = get();
      set({ chatbots: [...chatbots, res.data] });
      toast.success("Chatbot created successfully!");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to create chatbot");
      throw error;
    }
  },

  deleteChatbot: async (chatbotId) => {
    try {
      await axiosInstance.delete(`/chatbots/${chatbotId}`);
      const { chatbots, selectedContact } = get();
      const updatedChatbots = chatbots.filter(bot => bot._id !== chatbotId);
      set({ chatbots: updatedChatbots });
      
      // Clear selection if deleted chatbot was selected
      if (selectedContact?._id === chatbotId) {
        set({ selectedContact: null, contactType: "user" });
      }
      
      toast.success("Chatbot deleted successfully!");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to delete chatbot");
    }
  },

  subscribeToMessages: () => {
    const { selectedContact, contactType } = get();
    if (!selectedContact) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageFromSelectedContact = 
        (contactType === "user" && newMessage.senderId === selectedContact._id) ||
        (contactType === "chatbot" && (newMessage.senderId === selectedContact._id || newMessage.receiverId === selectedContact._id));
      
      if (!isMessageFromSelectedContact) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedContact: (contact, type = "user") => {
    set({ 
      selectedContact: contact, 
      contactType: type,
      messages: [] // Clear messages when switching contacts
    });
  },

  // Legacy support - can be removed later
  setSelectedUser: (selectedUser) => set({ 
    selectedContact: selectedUser, 
    contactType: "user",
    messages: []
  }),
}));
