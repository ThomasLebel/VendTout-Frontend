import { ArrowRightIcon } from "@heroicons/react/24/outline";

import {
  doc,
  collection,
  addDoc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/app/firebase/firebase";

import { useState } from "react";

const MessageInput = () => {
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = async () => {
    const chatId = "lilou74_thomas";
    const chatRef = doc(db, "chats", chatId);

    const chatSnap = await getDoc(chatRef);

    if (!chatSnap.exists()) {
      await setDoc(chatRef, {
        participants: [
          {
            username: "thomas",
            avatarUrl:
              "https://res.cloudinary.com/dkf48p2ah/image/upload/v1740500082/VendToutAvatars/cecvvkli3ze6sdqokb7r.jpg",
          },
          {
            username: "lilou74",
            avatarUrl:
              "https://res.cloudinary.com/dkf48p2ah/image/upload/v1740500082/VendToutAvatars/cecvvkli3ze6sdqokb7r.jpg",
          },
        ],
        lastMessage: message,
        lastMessageTimestamp: serverTimestamp(),

      });
    }

    await addDoc(collection(db, `chats/${chatId}/messages`),{
        senderID: "thomas",
        text: message,
        timestamp : serverTimestamp(),
        seenBy: ["thomas"]
    })

    await updateDoc(chatRef, {
      lastMessage: message,
      lastMessageTimestamp: serverTimestamp(),
    });

    setMessage("");
  };

  return (
    <div className="p-4 flex justify-between border-b border-t border-gray-200">
      <div className="w-full p-3 bg-lightGrey rounded-lg flex justify-between items-center">
        <input
          type="text"
          placeholder="Envoyer un message"
          className="flex-1 outline-none bg-lightGrey"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <ArrowRightIcon
          className={`h-5 w-5 ${
            message && "text-mainColor"
          } text-darkGrey cursor-pointer`}
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default MessageInput;
