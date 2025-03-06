"use client";

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import InformationSection from "@/components/inbox/InformationSection";
import ReceivedMessage from "@/components/inbox/ReceivedMessage";
import SentMessage from "@/components/inbox/SentMessage";
import MessageInput from "@/components/inbox/MessageInput";
import VendToutMessage from "@/components/inbox/VendToutMessage";

import { ProductType, ProductDefaultValues } from "@/types/ProductType";

import { useEffect, useState, use } from "react";
import { useAppSelector, useAppDispatch } from "@/app/redux/store";
import { removeProductID } from "@/app/redux/slices/messageInformation";

import {
  doc,
  collection,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/app/firebase/firebase";

const Inbox = ({ params }: { params: Promise<{ chatID: string }> }) => {
  
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.value);
  const storedProductID = useAppSelector((state) => state.messageInformation.productID);

  
  const { chatID } = use(params);
  const usersInChat = chatID.split("_");

  interface Message {
    imageUrl: string;
    seenBy: string[];
    senderID: string;
    text: string;
    timestamp: { seconds: number; nanoseconds: number };
  }

  const [messages, setMessages] = useState<Message[]>([]);
  const [chatPartner, setChatPartner] = useState<string | undefined>("");
  const [participants, setParticipants] = useState<
    { username: string; avatarUrl: string }[]
  >([]);
  const [isSeller, setIsSeller] = useState<boolean>(false);
  const [productID, setProductID] = useState<string>(storedProductID);
  const [product, setProduct] = useState<ProductType>(ProductDefaultValues);

  useEffect(() => {
    if (
      user.username &&
      usersInChat.includes(user.username) &&
      usersInChat.length === 2
    ) {
      // Récupération du pseudo du correspondant
      const partner = usersInChat.find(
        (username) => username !== user.username
      );
      setChatPartner(partner);

      // Création des chemins de firestore
      const docRef = doc(db, "chats", chatID);
      const messagesRef = collection(docRef, "messages");

      // Écoute les mises à jour de la conversation (participants)
      const unsubscribeChat = onSnapshot(docRef, async (docSnap) => {
        const chat = docSnap.data();
        if (chat) {
          setParticipants(chat.participants);
          setIsSeller(chat.seller === user.username);
          setProductID(chat.productID);
          if (!chat.lastMessageSeenBy.includes(user.username)) {
          await updateDoc(docRef, {
            lastMessageSeenBy : [...chat.lastMessageSeenBy, user.username],
          });
          }
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
    } else {
      setChatPartner("Accès non autorisé à cette conversation");
    }
  }, [user]);

  useEffect(() => {
    if (productID) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/${productID}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.result) {
            setProduct(data.productInfos);
            dispatch(removeProductID());
          }
        });
    }
  }, [productID]);

  return (
    <div>
      <Header />
      <div className="pt-32 w-screen h-[97vh] flex flex-col items-center">
        <div className="w-full max-w-screen-xl h-full flex flex-col justify-between">
          {/* Section informations */}
          <InformationSection chatPartner={chatPartner} product={product}/>

          {/* Section discussion */}
          <div className="flex-1 overflow-y-scroll flex flex-col-reverse ">
            <div className="w-full p-4 flex flex-col gap-3">
              {messages.map((message, index) => {
                if (message.senderID === user.username) {
                  return (
                    <SentMessage
                      message={message.text}
                      timestamp={message.timestamp}
                      key={index}
                    />
                  );
                } else if (message.senderID === "system"){
                  return (
                    <VendToutMessage message={message.text} timestamp={message.timestamp} isSeller={isSeller} key={index} userToken={user.token} productID={productID} chatID={chatID}/>
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
          <MessageInput chatID={chatID} chatPartner={chatPartner} productID={productID}/>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Inbox;
