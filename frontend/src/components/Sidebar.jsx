import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Bot } from "lucide-react";

const Sidebar = () => {
  const { 
    getUsers, 
    users, 
    getChatbots,
    chatbots,
    selectedContact, 
    setSelectedContact, 
    contactType,
    isUsersLoading,
    isChatbotsLoading 
  } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    if (activeTab === "users") {
      getUsers();
    } else {
      getChatbots();
    }
  }, [activeTab, getUsers, getChatbots]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  const isLoading = activeTab === "users" ? isUsersLoading : isChatbotsLoading;

  if (isLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        {/* Tab Navigation */}
        <div className="flex tabs tabs-boxed mb-4 hidden lg:flex">
          <button
            onClick={() => setActiveTab("users")}
            className={`tab flex-1 ${activeTab === "users" ? "tab-active" : ""}`}
          >
            <Users className="size-4 mr-1" />
            Users
          </button>
          <button
            onClick={() => setActiveTab("chatbots")}
            className={`tab flex-1 ${activeTab === "chatbots" ? "tab-active" : ""}`}
          >
            <Bot className="size-4 mr-1" />
            Bots
          </button>
        </div>

        {/* Mobile tab icons */}
        <div className="flex lg:hidden justify-center gap-4 mb-4">
          <button
            onClick={() => setActiveTab("users")}
            className={`p-2 rounded ${activeTab === "users" ? "bg-primary text-primary-content" : ""}`}
          >
            <Users className="size-6" />
          </button>
          <button
            onClick={() => setActiveTab("chatbots")}
            className={`p-2 rounded ${activeTab === "chatbots" ? "bg-primary text-primary-content" : ""}`}
          >
            <Bot className="size-6" />
          </button>
        </div>

        {/* Online filter - only for users */}
        {activeTab === "users" && (
          <div className="mt-3 hidden lg:flex items-center gap-2">
            <label className="cursor-pointer flex items-center gap-2">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="checkbox checkbox-sm"
              />
              <span className="text-sm">Show online only</span>
            </label>
            <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
          </div>
        )}
      </div>

      <div className="overflow-y-auto w-full py-3">
        {activeTab === "users" ? (
          <>
            {filteredUsers.map((user) => (
              <button
                key={user._id}
                onClick={() => setSelectedContact(user, "user")}
                className={`
                  w-full p-3 flex items-center gap-3
                  hover:bg-base-300 transition-colors
                  ${selectedContact?._id === user._id && contactType === "user" ? "bg-base-300 ring-1 ring-base-300" : ""}
                `}
              >
                <div className="relative mx-auto lg:mx-0">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.name}
                    className="size-12 object-cover rounded-full"
                  />
                  {onlineUsers.includes(user._id) && (
                    <span
                      className="absolute bottom-0 right-0 size-3 bg-green-500 
                      rounded-full ring-2 ring-zinc-900"
                    />
                  )}
                </div>

                {/* User info - only visible on larger screens */}
                <div className="hidden lg:block text-left min-w-0">
                  <div className="font-medium truncate">{user.fullName}</div>
                  <div className="text-sm text-zinc-400">
                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                  </div>
                </div>
              </button>
            ))}

            {filteredUsers.length === 0 && (
              <div className="text-center text-zinc-500 py-4">No online users</div>
            )}
          </>
        ) : (
          <>
            {chatbots.map((chatbot) => (
              <button
                key={chatbot._id}
                onClick={() => setSelectedContact(chatbot, "chatbot")}
                className={`
                  w-full p-3 flex items-center gap-3
                  hover:bg-base-300 transition-colors
                  ${selectedContact?._id === chatbot._id && contactType === "chatbot" ? "bg-base-300 ring-1 ring-base-300" : ""}
                `}
              >
                <div className="relative mx-auto lg:mx-0">
                  <div className="size-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Bot className="size-7 text-primary" />
                  </div>
                  {chatbot.isDefault && (
                    <span className="absolute -top-1 -right-1 size-4 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">✓</span>
                    </span>
                  )}
                </div>

                {/* Chatbot info - only visible on larger screens */}
                <div className="hidden lg:block text-left min-w-0">
                  <div className="font-medium truncate">{chatbot.name}</div>
                  <div className="text-sm text-zinc-400">
                    {chatbot.model} {chatbot.isDefault && "• Default"}
                  </div>
                </div>
              </button>
            ))}

            {chatbots.length === 0 && (
              <div className="text-center text-zinc-500 py-4">
                <Bot className="size-8 mx-auto mb-2 opacity-50" />
                No chatbots available
              </div>
            )}
          </>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
