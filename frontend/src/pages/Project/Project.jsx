import { useState } from "react";
import { useLocation } from "react-router-dom";

const Project = () => {
  const location = useLocation();

  console.log(location);

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState([]);

  // Mock users data - replace with API call later
  const users = [
    { id: 1, name: "Ali Khan", email: "ali@gmail.com" },
    { id: 2, name: "Fatima Ahmed", email: "fatima@gmail.com" },
    { id: 3, name: "Hassan Ahmed", email: "hassan@gmail.com" },
    { id: 4, name: "Zainab Ali", email: "zainab@gmail.com" },
    { id: 5, name: "Omar Malik", email: "omar@gmail.com" },
    { id: 6, name: "Amira Khan", email: "amira@gmail.com" },
  ];

  const handleSelectUser = (userId) => {
    setSelectedUserId([...selectedUserId, userId]);
  };

  return (
    <main className="h-screen w-screen flex">
      <section className="left relative flex flex-col h-full min-w-96 bg-slate-300">
        <header className="flex justify-between items-center p-2 px-4 w-full bg-slate-100">
          <button
            onClick={() => setIsUserModalOpen(true)}
            className="flex gap-2 hover:bg-slate-200 p-2 rounded cursor-pointer transition"
          >
            <i className="ri-add-fill mr-1"></i>
            <p>Add Collaborator</p>
          </button>
          <button
            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
            className="p-2 cursor-pointer"
          >
            <i className="ri-group-fill"></i>
          </button>
        </header>

        <div className="conversation-area grow flex flex-col">
          <div className="message-box p-1 grow flex flex-col gap-1">
            <div className="message max-w-56 flex flex-col p-2 bg-slate-50 w-fit rounded-md">
              <small className="opacity-65 text-xs">example@gmail.com</small>
              <p className="text-sm">Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="ml-auto max-w-56 message flex flex-col p-2 bg-slate-50 w-fit rounded-md">
              <small className="opacity-65 text-xs">example@gmail.com</small>
              <p className="text-sm">Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
          <div className="inputField w-full flex">
            <input
              className="p-2 px-4 border-none outline-none bg-white grow"
              type="text"
              placeholder="Type your message here..."
            />
            <button className="cursor-pointer px-5 bg-slate-950 text-white">
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>

        <div
          className={`sidePanel w-full h-full flex flex-col gap-2 bg-slate-50 absolute transition-all ${isSidePanelOpen ? "translate-x-0" : "-translate-x-full"} top-0`}
        >
          <header className="flex justify-between items-center px-4 p-2 bg-slate-200">
            <button
              onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
              className="p-2 cursor-pointer"
            >
              <i className="ri-close-fill"></i>
            </button>
          </header>

          <div className="users flex flex-col gap-2">
            <div className="user cursor-pointer hover:bg-slate-200 p-2 flex items-center gap-2">
              <div className="aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600">
                <i className="ri-user-fill absolute"></i>
              </div>
              <h1 className="font-semibold text-lg">username</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Backdrop */}
      {isUserModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          {/* Modal Container */}
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-96 sm:max-h-125 flex flex-col relative">
            {/* Modal Header */}
            <header className="flex justify-between items-center p-4 sm:p-6 border-b border-slate-200">
              <h2 className="text-lg sm:text-2xl font-bold text-slate-900">
                Select User
              </h2>
              <button
                onClick={() => setIsUserModalOpen(false)}
                className="text-slate-500 hover:text-slate-900 transition text-2xl"
              >
                <i className="ri-close-fill"></i>
              </button>
            </header>

            {/* Modal Body - Users List */}
            <div className="users-list flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="space-y-2 sm:space-y-3">
                {users.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => handleSelectUser(user.id)}
                    className={`p-3 sm:p-4 rounded-lg cursor-pointer transition-all border-2 ${
                      selectedUserId === user.id
                        ? "bg-blue-50 border-blue-500"
                        : "bg-slate-50 border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      {/* User Avatar */}
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-sm sm:text-base ${
                          selectedUserId === user.id
                            ? "bg-blue-500"
                            : "bg-slate-600"
                        }`}
                      >
                        {user.name.charAt(0)}
                      </div>

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 text-sm sm:text-base truncate">
                          {user.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 truncate">
                          {user.email}
                        </p>
                      </div>

                      {/* Checkmark for Selected User */}
                      {selectedUserId === user.id && (
                        <div className="shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <i className="ri-check-line text-white text-sm"></i>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-4 sm:p-6 border-t border-slate-200 bg-slate-50">
              <button className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium text-sm sm:text-base">
                Add Collaborators
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Project;
