import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useLoginStore from "../store/login.store";
import useMessagesStore from "../store/message.store";
import { format } from "timeago.js";

import io from 'socket.io-client';

const socket = io('http://localhost:8000', { transports: ['websocket'] });

const ChatMessage = () =>
{
  const user = useLoginStore((state) => state.user);
  const scrollRef = useRef()
  const { register, handleSubmit, setValue } = useForm({});
  const currentUserMessages = useMessagesStore(state => state.currentUserMessages)
  const currentUserMessagesCount = useMessagesStore(state => state.currentUserMessagesCount)
  const getCurrentConversationMessages = useMessagesStore(state => state.getCurrentConversationMessages)
  const currentConversation = useMessagesStore(state => state.currentConversation)
  const addMessage = useMessagesStore(state => state.addMessage)
  const setMessege = useMessagesStore(state => state.setMessege)
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() =>
  {
    if (!socket)
    {
      return;
    }
    if (user)
    {
      socket.on("connection")
      socket.emit("add_user", user._id);
      socket.on("chat_message", data =>
      {
        console.log("🥽🥽 DATA aagaya ", data)
        setArrivalMessage({
          sender: data.senderid,
          text: data.text,
          created_at: data.date
        })
      });
    }

  }, [])

  useEffect(() =>
  {
    arrivalMessage && currentConversation?.members.includes(arrivalMessage.sender) && setMessege(arrivalMessage)

  }, [arrivalMessage])

  useEffect(() =>
  {
    if (currentConversation._id)
    {
      getCurrentConversationMessages(currentConversation?._id)
    }
  }, [currentConversation]);

  useEffect(() =>
  {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentUserMessages])

  const sendMessage = (data) =>
  {
    if (data.message)
    {
      let payload = {
        "conversation_id": currentConversation._id,
        "text": data.message,
        "sender": user._id
      };
      addMessage(payload);

      const receiverid = currentConversation.members.find(m => m !== user._id)
      const date = new Date()
      socket.emit("chat_message", {
        senderid: user._id,
        receiverid,
        text: data.message,
        date
      });

      setMessege({
        sender: user._id,
        text: data.message,
        created_at: date
      })

      setValue("message", "")
    }
  };

  return currentConversation?._id ? <div className="w-2/4 p-2 h-full ">
    <div className="w-full h-[90%] p-4 bg-slate-50 flex flex-col overflow-y-scroll scrollbar">
      {currentUserMessages?.map((m, i) => (
        <div
          key={i}
          ref={scrollRef}
          className={`max-w-xs flex flex-col items-end shadow-lg ${ m.sender === user._id ? "self-end bg-blue-800 text-white message-tile-own" : "self-start bg-slate-800 text-white message-tile-other" } m-2 rounded-lg py-2 px-3  `}
        >
          <pre className="text-md font-sans whitespace-pre-line">
            {m.text}
          </pre>
          <span className="font-light text-x-small select-none">
            {format(m.created_at)}
          </span>
        </div>
      ))}
    </div>
    <div className="h-[10%] w-full border-2 rounded-lg  overflow-clip">
      <form
        onSubmit={handleSubmit(sendMessage)}
        className="w-full h-full overflow-clip flex items-center"
      >
        <textarea
          {...register("message", { required: true })}
          placeholder="Type message here..."
          className="h-full w-[80%] outline-none border-0 p-3 resize-none"
        ></textarea>
        <input
          type="submit"
          value="Send"
          className="h-full w-[22%] bg-blue-600 outline-none text-white font-bold"
        />
      </form>
    </div>
  </div>
    : <div className="w-2/4 p-2 h-full">
      Select Conversation
    </div>
}
export default ChatMessage;





