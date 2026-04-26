import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  axiosInstance,
  initializeSocket,
  receiveMessage,
  sendMessage,
} from "../../config";
import { UserContext } from "../../context/user.context";

const Project = () => {
  const location = useLocation();

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(new Set());
  const [users, setUsers] = useState([]);
  const [project, setProject] = useState(location.state.project);
  const [message, setMessage] = useState("");
  const messageBox = React.createRef();

  const { user } = useContext(UserContext);

  const selectedUserIdArray = Array.from(selectedUserId);

  const handleSelectUser = (userId) => {
    setSelectedUserId((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  function addCollaborators() {
    axiosInstance
      .put("/projects/add-user", {
        projectId: location.state.project._id,
        users: selectedUserIdArray,
      })
      .then((res) => {
        console.log(res.data);
        setIsUserModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const send = () => {
    sendMessage("project-message", {
      message,
      sender: user,
    });

    appendOutgoingMessage(message);

    setMessage("");
  };

  useEffect(() => {
    initializeSocket(project._id);

    receiveMessage("project-message", (data) => {
      console.log(data);
      appendIncomingMessage(data);
    });

    axiosInstance
      .get(`/projects/get-project/${location.state.project._id}`)
      .then((res) => {
        console.log(res.data.project);
        setProject(res.data.project);
      });

    axiosInstance
      .get("/users/all")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function appendIncomingMessage(messageObject) {
    const messageBox = document.querySelector(".message-box");
    const message = document.createElement("div");
    message.classList.add(
      "message",
      "max-w-56",
      "flex",
      "flex-col",
      "p-2",
      "bg-slate-50",
      "w-fit",
      "rounded-md",
    );
    message.innerHTML = `
      <small class="opacity-65 text-xs">${messageObject.sender.email}</small>
      <p class="text-sm">${messageObject.message}</p>
    `;

    messageBox.appendChild(message);

    scrollToBottom();
  }

  function appendOutgoingMessage(message) {
    const messageBox = document.querySelector(".message-box");

    const newMessage = document.createElement("div");
    newMessage.classList.add(
      "message",
      "ml-auto",
      "max-w-56",
      "flex",
      "flex-col",
      "p-2",
      "bg-slate-50",
      "w-fit",
      "rounded-md",
    );
    newMessage.innerHTML = `
      <small class="opacity-65 text-xs">${user.email}</small>
      <p class="text-sm">${message}</p>
    `;
    messageBox.appendChild(newMessage);

    scrollToBottom();
  }

  function scrollToBottom() {
    messageBox.current.scrollTop = messageBox.current.scrollHeight;
  }

  return (
    <main className="h-screen w-screen flex">
      <section className="left relative flex flex-col h-screen min-w-96 bg-slate-300">
        <header className="flex justify-between items-center p-2 px-4 w-full bg-slate-100 absolute z-10 top-0">
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

        <div className="conversation-area pt-14 pb-10 grow flex flex-col h-full relative">
          <div
            ref={messageBox}
            className="message-box p-1 grow flex flex-col gap-1 overflow-auto max-h-full scrollbar-hide"
          ></div>
          <div className="inputField w-full flex absolute bottom-0">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-2 px-4 border-none outline-none bg-white grow"
              type="text"
              placeholder="Type your message here..."
            />
            <button
              onClick={send}
              className="cursor-pointer px-5 bg-slate-950 text-white"
            >
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>

        <div
          className={`sidePanel w-full h-full flex flex-col gap-2 bg-slate-50 absolute transition-all ${isSidePanelOpen ? "translate-x-0" : "-translate-x-full"} top-0`}
        >
          <header className="flex justify-between items-center px-4 p-2 bg-slate-200">
            <h1 className="font-semibold text-lg">Collaborators</h1>
            <button
              onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
              className="p-2 cursor-pointer"
            >
              <i className="ri-close-fill"></i>
            </button>
          </header>

          <div className="users flex flex-col gap-2">
            {project.users &&
              project.users.map((user, index) => {
                return (
                  <div
                    key={index}
                    className="user cursor-pointer hover:bg-slate-200 p-2 flex items-center gap-2"
                  >
                    <div className="aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600">
                      <i className="ri-user-fill absolute"></i>
                    </div>
                    <h1 className="font-semibold text-lg">{user.email}</h1>
                  </div>
                );
              })}
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
                {users.map((user, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectUser(user._id)}
                    className={`p-3 sm:p-4 rounded-lg cursor-pointer transition-all border-2 ${
                      selectedUserIdArray.includes(user._id)
                        ? "bg-blue-50 border-blue-500"
                        : "bg-slate-50 border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-slate-900 font-semibold truncate">
                          {user?.email || "No email"}
                        </p>
                      </div>

                      {/* Checkmark for Selected User */}
                      {selectedUserIdArray.includes(user._id) && (
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
              <button
                onClick={addCollaborators}
                className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium text-sm sm:text-base"
              >
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
