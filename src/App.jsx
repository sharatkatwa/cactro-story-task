import React, { useEffect, useState } from "react";
import data from "./utils/stories.json";

const App = () => {
  const users = data;
  const [isOpen, setIsOpen] = useState(false);
  const [currentStory, setCurrentStory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if(!isOpen) return;

    const timer = setTimeout(() => setIsOpen(false), 5000);
    
    return () => clearTimeout(timer)
  },[isOpen])

  const showStory = (user) => {
    setIsOpen(true);
    setLoading(true);
    setCurrentStory(user.stories[0].image);
    
  };

  const closeStory = () => {
    setIsOpen(false)
    // clearTimeout(timer)
  };

  return (
    <>
      <div className="w-full h-full antialiased">
        {/* story container */}
        {users.length > 0 && (
          <div className="h-30 w-full bg-red-300 p-3 flex gap-2 items-center overflow-x-auto">
            {users.map((user) => {
              return (
                <div
                  onClick={() => showStory(user)}
                  key={user.id}
                  className="h-20 w-20 shrink-0 rounded-full border-3 border-blue-400 overflow-hidden"
                >
                  <img className="object-cover object-center" src={user.avatar} alt="dp" />
                </div>
              );
            })}
          </div>
        )}
        {isOpen && (
          <div className=" fixed inset-0 w-full h-full bg-zinc-700/50 z-[99] flex">
            <button
              onClick={closeStory}
              className="absolute right-10 top-8 text-white shadow-md bg-zinc-800/50 rounded-full w-10 h-10  "
            >
              X
            </button>
            {loading && <p className="m-auto text-white">Loading...</p>}
            <img
              className={`object-cover object-center ${loading ? "hidden" : "block"}`}
              src={currentStory}
              alt="story image"
              onLoad={() => setLoading(false)}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default App;
