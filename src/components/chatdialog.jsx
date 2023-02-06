import React, { useEffect, useRef, useState } from "react";
import ProfileImage from "../assets/profile.jpg"
import useConversationStore from "../store/conversation.store";
import useLoginStore from "../store/login.store";
import { BiMessageRoundedAdd } from "react-icons/bi";
import useMessagesStore from "../store/message.store";



const ChatDialog = () =>
{
  const user = useLoginStore((state) => state.user);
  const getCurrentUserConversations = useConversationStore(state => state.getCurrentUserConversations)
  const currentUserConversations = useConversationStore(state => state.currentUserConversations)
  const setConversationId = useMessagesStore(state => state.setConversationId)
  const currentConversation = useMessagesStore(state => state.currentConversation)
  const divRef = useRef()
  useEffect(() =>
  {
    getCurrentUserConversations(user._id);
  }, [])


  return (
    <div className="w-1/4 h-full overflow-y-scroll border-r-2 p-2 scrollbar">
      <div className="h-14 flex justify-between items-center">
        <input type="text" name="search" id="search" className="h-[90%] px-2 w-[80%] outline-transparent" placeholder="New conversation..." />
        <BiMessageRoundedAdd size={50} className="p-2 hover:bg-blue-100 hover:cursor-pointer rounded-full" />
      </div>
      <hr />
      <span className="text-slate-400 mx-3">conversations...</span>
      <div ref={divRef}>
        {currentUserConversations?.map(c => (
          <button
            key={c._id}
            id={c._id}
            className={`w-full h-14 ${ currentConversation._id === c._id ? "bg-blue-400" : "bg-gray-200" } my-2 flex items-center rounded-full overflow-clip hover:cursor-pointer transition `}
            onClick={() =>
            {
              setConversationId(c);
            }}
          >
            <img src={"https://loremflickr.com/320/320?random=" + Math.random()} alt="ProfileImage" className="w-16 rounded-full object-cover border-4 border-white" />
            <div className="px-4">
              {
                c.membersData.map((md, index) => <span className="font-bold" key={index}>
                  {user._id !== md._id ? `${ md.firstname } ${ md.lastname }` : null}
                </span>)
              }
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatDialog;
