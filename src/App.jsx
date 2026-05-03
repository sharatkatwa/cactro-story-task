import React, { useEffect, useState } from "react";
import data from "./utils/stories.json";

const App = () => {
  const users = data;
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentStory, setCurrentStory] = useState(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || loading || !currentUser) return;

    const timer = setTimeout(() => {
      if (currentStoryIndex < currentUser.stories.length - 1) {
        const nextIndex = currentStoryIndex + 1;
        setLoading(true);
        setCurrentStoryIndex(nextIndex);
        setCurrentStory(currentUser.stories[nextIndex].image);
      } else if (currentUserIndex < users.length - 1) {
        const nextUserIndex = currentUserIndex + 1;
        setLoading(true);
        setCurrentUser(users[nextUserIndex]);
        setCurrentUserIndex(nextUserIndex);
        setCurrentStoryIndex(0);
        setCurrentStory(users[nextUserIndex].stories[0].image);
      } else {
        setIsOpen(false);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isOpen, loading, currentStoryIndex, currentUser, currentUserIndex, users]);

  const showStory = (user, userIndex) => {
    setIsOpen(true);
    setLoading(true);
    setCurrentUser(user);
    setCurrentUserIndex(userIndex);
    setCurrentStoryIndex(0);
    setCurrentStory(user.stories[0].image);
  };

  const closeStory = () => {
    setIsOpen(false);
    // clearTimeout(timer)
  };

  const nextStory = () => {
    if (currentStoryIndex < currentUser.stories.length - 1) {
      const nextIndex = currentStoryIndex + 1;
      setLoading(true);
      setCurrentStoryIndex(nextIndex);
      setCurrentStory(currentUser.stories[nextIndex].image);
    } else if (currentUserIndex < users.length - 1) {
      const nextUserIndex = currentUserIndex + 1;
      setLoading(true);
      setCurrentUser(users[nextUserIndex]);
      setCurrentUserIndex(nextUserIndex);
      setCurrentStoryIndex(0);
      setCurrentStory(users[nextUserIndex].stories[0].image);
    } else {
      setIsOpen(false);
    }
  };
  const prevStory = () => {
    if (currentStoryIndex > 0) {
      const prevIndex = currentStoryIndex - 1;
      setLoading(true);
      setCurrentStoryIndex(prevIndex);
      setCurrentStory(currentUser.stories[prevIndex].image);
    }
  };

  return (
    <>
      <div className="w-full max-w-120 h-full antialiased mx-auto shadow-xl">
        {/* story container */}
        {users.length > 0 && (
          <div className="h-30 w-full bg-zinc-200 p-3 flex gap-2 items-center overflow-x-auto">
            {users.map((user, index) => {
              return (
                <div
                  onClick={() => showStory(user, index)}
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
          <div className=" fixed inset-0 w-full max-w-120 h-full bg-zinc-700/50 z-[99] flex mx-auto">
            <button
              onClick={closeStory}
              className="absolute right-5 top-5 text-white shadow-md bg-zinc-800/50 rounded-full w-10 h-10 z-[999] "
            >
              X
            </button>
            {loading && <p className="m-auto text-white">Loading...</p>}
            {!loading && (
              <div className="absolute left-5 top-5 h-12 w-12 shrink-0 rounded-full border-3 border-blue-400 overflow-hidden flex items-center gap-3">
                <img className="object-cover object-center" src={currentUser.avatar} alt="dp" />
              </div>
            )}
            <img
              className={`object-cover object-center ${loading ? "hidden" : "block"}`}
              src={currentStory}
              alt="story image"
              onLoad={() => setLoading(false)}
            />
            <div onClick={() => prevStory()} className="absolute w-1/2 left-0 h-full "></div>
            <div onClick={() => nextStory()} className="absolute w-1/2 right-0 h-full "></div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
