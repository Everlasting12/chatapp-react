import React, { useEffect, useRef } from "react";
import useLoginStore from "../store/login.store";
import ChatDialog from "./chatdialog";
import ChatMessage from "./chatmessage";
import UserInformation from "./userinformation";

const UserDashboard = () =>
{
  return (
    <div className="w-full h-[calc(100vh-50px)] flex">
      <ChatDialog />
      <ChatMessage />
      <UserInformation />
    </div>
  );
};

export default UserDashboard;
