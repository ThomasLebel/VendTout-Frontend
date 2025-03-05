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
import { useAppSelector } from "@/app/redux/store";

const MessageInput = ({
  chatID,
  chatPartner,
  productID,
}: {
  chatID: string;
  chatPartner: string | undefined;
  productID: string;
}) => {
  const user = useAppSelector((state) => state.user.value);

  const [message, setMessage] = useState<string>("");

  const handleSendMessage = async () => {
    if (
      chatPartner !== "Accès non autorisé à cette conversation" &&
      message !== "" &&
      chatID !== "" &&
      user.username
    ) {
      const chatRef = doc(db, "chats", chatID);
      const chatSnap = await getDoc(chatRef);

      const partnerAvatarUrl = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/profilePicture/${chatPartner}`
      ).then((res) => res.json());

      if (!chatSnap.exists()) {
        await setDoc(chatRef, {
          participants: [
            {
              username: user.username,
              avatarUrl: user.profilePicture,
            },
            {
              username: chatPartner,
              avatarUrl: partnerAvatarUrl.profilePicture,
            },
          ],
          productID : productID,
          participantsUsername : [user.username, chatPartner],
          buyer : user.username,
          seller : chatPartner,
          lastMessage: message,
          lastMessageSeenBy: [user.username],
          lastMessageTimestamp: serverTimestamp(),
        });
      }

      await addDoc(collection(db, `chats/${chatID}/messages`), {
        senderID: user.username,
        text: message,
        timestamp: serverTimestamp(),
        seenBy: [user.username],
      });

      await updateDoc(chatRef, {
        lastMessage: message,
        lastMessageTimestamp: serverTimestamp(),
        lastMessageSeenBy: [user.username],
      });

      setMessage("");
    }
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
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
