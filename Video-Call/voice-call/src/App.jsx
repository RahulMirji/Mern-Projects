import React, { useEffect, useRef } from "react";
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function App() {
  const zpRef = useRef(null);
  const userID = "user" + Math.floor(Math.random() * 1000);
  const userName = "Rahul_" + userID;
  const appID = 1690842373;
  const serverSecret = "c82705ffa00dba4b0d14a54cec54575f";

  const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    "room123",
    userID,
    userName
  );

  useEffect(() => {
    const zp = ZegoUIKitPrebuilt.create(TOKEN);
    zpRef.current = zp;
    zp.addPlugins({ ZIM });
  }, [TOKEN]);

  function invite(callType) {
    const targetUser = {
      userID: prompt("Enter the target's User ID"),
      userName: prompt("Enter the target's User Name"),
    };

    zpRef.current
      .sendCallInvitation({
        callees: [targetUser],
        callType,
        timeout: 60,
      })
      .then((res) => console.warn("Success:", res))
      .catch((err) => console.warn("Error:", err));
  }

  return (
    <div className="w-full h-screen bg-gradient-to-b from-[#1a2229] to-black flex items-center justify-center px-4">
      <div className="w-[500px] h-[420px] bg-[#0d1014] border border-gray-700 rounded-2xl shadow-lg p-[20px] flex flex-col justify-between items-center">
        <div className="text-white text-center">
          <h2 className="text-xl mb-2">
            <span className="text-blue-500">UserName: </span>
            {userName}
          </h2>
          <h2 className="text-xl">
            <span className="text-blue-500">UserID: </span>
            {userID}
          </h2>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <button
            onClick={() => invite(ZegoUIKitPrebuilt.InvitationTypeVoiceCall)}
            className="w-[200px] h-[50px] rounded-2xl bg-blue-500 hover:bg-blue-600 transition text-white text-lg font-semibold"
          >
            Voice Call
          </button>

          <button
            onClick={() => invite(ZegoUIKitPrebuilt.InvitationTypeVideoCall)}
            className="w-[200px] h-[50px] rounded-2xl bg-green-500 hover:bg-green-600 transition text-white text-lg font-semibold"
          >
            Video Cal
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
