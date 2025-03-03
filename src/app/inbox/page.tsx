"use client";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ReceivedMessage from "@/components/inbox/ReceivedMessage";
import SentMessage from "@/components/inbox/SentMessage";
import MessageInput from "@/components/inbox/MessageInput";

import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  getFirestore,
  onSnapshot
} from "firebase/firestore";
import { db } from "@/app/firebase/firebase";

const inbox = () => {
  interface Message {
    imageUrl: string;
    seenBy: string[];
    senderID: string;
    text: string;
    timestamp: { seconds: number; nanoseconds: number };
  }

  const [messages, setMessages] = useState<Message[]>([]);
  const [participants, setParticipants] = useState<
    { username: string; avatarUrl: string }[]
  >([]);


  useEffect(() => {

    const docRef = doc(db, "chats", "lilou74_thomas");
    const messagesRef = collection(docRef, "messages");
  
    // Écoute les mises à jour de la conversation (participants)
    const unsubscribeChat = onSnapshot(docRef, (docSnap) => {
      const chat = docSnap.data();
      if (chat) {
        setParticipants(chat.participants);
      }
    });
  
    // Écoute les mises à jour des messages en temps réel
    const unsubscribeMessages = onSnapshot(messagesRef, (snapshot) => {
      const DbMessages: Message[] = snapshot.docs
        .map((doc) => doc.data() as Message)
        .filter((msg) => msg.timestamp?.seconds) 
        .sort((a, b) => a.timestamp.seconds - b.timestamp.seconds);
  
      setMessages(DbMessages);
    });
  
    // Nettoyage des écouteurs lors du démontage du composant
    return () => {
      unsubscribeChat();
      unsubscribeMessages();
    };
  }, []);

  return (
    <div>
      <Header />
      <div className="pt-32 w-screen h-[97vh] flex flex-col items-center">
        <div className="w-full max-w-screen-xl h-full flex flex-col justify-between">
          {/* Section informations */}
          <div className="p-4 flex justify-between border-b border-t border-gray-200">
            <ArrowLeftIcon className="h-5 w-5" />
            <span>Thomas</span>
            <InformationCircleIcon className="h-6 w-6" />
          </div>

          {/* Section discussion */}
          <div className="flex-1 overflow-y-scroll flex flex-col-reverse ">
            <div className="w-full p-4 flex flex-col gap-3">
              {messages.map((message, index) => {
                if (message.senderID === "thomas") {
                  return (
                    <SentMessage
                      message={message.text}
                      timestamp={message.timestamp}
                      key={index}
                    />
                  );
                } else {
                  return (
                    <ReceivedMessage
                      message={message.text}
                      timestamp={message.timestamp}
                      avatarURL={
                        participants.find(
                          (p) => p.username === message.senderID
                        )?.avatarUrl ||
                        "https://res.cloudinary.com/dkf48p2ah/image/upload/v1740500082/VendToutAvatars/cecvvkli3ze6sdqokb7r.jpg"
                      }
                      key={index}
                    />
                  );
                }
              })}
            </div>
          </div>

          {/* Section envoi de message*/}
          <MessageInput />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default inbox;
