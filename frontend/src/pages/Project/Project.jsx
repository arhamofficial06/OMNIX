import { useLocation } from "react-router-dom";

const Project = () => {
  const location = useLocation();

  return (
    <main className="h-screen w-screen flex">
      <section className="left flex flex-col h-full min-w-60 bg-slate-300">
        <header className="flex justify-end p-2 px-4 w-full bg-slate-100">
          <button className="p-2 cursor-pointer">
            <i className="ri-group-fill"></i>
          </button>
        </header>

        <div className="conversation-area grow flex flex-col">
            <div className="message-box grow flex flex-col"></div>
            <div className="inputField w-full flex">
                <input className="p-2 px-4 border-none outline-none bg-white" type="text" placeholder="Type your message here..."/>
                <button className="grow cursor-pointer px-3">
                    <i className="ri-send-plane-fill"></i>
                </button>
            </div>
        </div>
      </section>
    </main>
  );
};

export default Project;
