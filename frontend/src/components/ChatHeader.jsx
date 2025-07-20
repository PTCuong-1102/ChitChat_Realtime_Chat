import { X, Bot } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedContact, contactType, setSelectedContact } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              {contactType === "chatbot" ? (
                <div className="size-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Bot className="size-6 text-primary" />
                </div>
              ) : (
                <img 
                  src={selectedContact.profilePic || "/avatar.png"} 
                  alt={selectedContact.fullName} 
                />
              )}
            </div>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-medium">
              {contactType === "chatbot" ? selectedContact.name : selectedContact.fullName}
            </h3>
            <p className="text-sm text-base-content/70">
              {contactType === "chatbot" 
                ? `${selectedContact.model}${selectedContact.isDefault ? " • Default" : ""}`
                : onlineUsers.includes(selectedContact._id) ? "Online" : "Offline"
              }
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedContact(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
