"use client";

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ConversationItem from "@/components/inbox/ConversationItem";

import { useAppSelector } from "../redux/store";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/app/firebase/firebase";

const Inbox = () => {
  const user = useAppSelector((state) => state.user.value);

  interface Chat {
    lastMessage: string;
    lastMessageTimestamp: {
      nanoseconds : number,
      seconds: number
    }
    lastMessageSeenBy : string[]
    participants: {
      username: string;
      avatarUrl: string;
    }[];
    participantsUsername: string[];
  }

  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    if (user.username) {
      const querySnapshot = query(
        collection(db, "chats"),
        where("participantsUsername", "array-contains", user.username),
      );
      const unsubscribeChats = onSnapshot(querySnapshot, (snapshot) => {
        const chatsOfUser : Chat[] = snapshot.docs.map((doc) => doc.data() as Chat)
        chatsOfUser.sort((a : Chat, b : Chat) => b.lastMessageTimestamp.seconds - a.lastMessageTimestamp.seconds)
        setChats(chatsOfUser)
      })
      
      return () => {
        unsubscribeChats();
      }
    }
  }, [user]);

  return (
    <div>
      <Header />
      <div className="pt-32 w-screen h-[97vh] flex flex-col items-center">
        <div className="w-full max-w-screen-xl h-full flex flex-col">
          {/* Section informations */}
          <div className="p-4 border-b border-t lg:border-t-0 border-gray-200">
            <span className="font-medium">Messages</span>
          </div>

          {/* Section conversation */}
          <div className="flex-1 flex flex-col overflow-y-scroll">
            {chats.map((chat, index) => (
              <ConversationItem
                key={index}
                chatPartner={chat.participants.filter((participant) => participant.username !== user.username)[0]}
                lastMessage={chat.lastMessage}
                lastMessageTimestamp={chat.lastMessageTimestamp.seconds}
                lastMessageSeen={chat.lastMessageSeenBy.includes(user.username || "")}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Inbox;
