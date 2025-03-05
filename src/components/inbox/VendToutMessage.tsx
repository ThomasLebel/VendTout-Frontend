import Button from "../ui/Button";
import moment from "moment";
import "moment/locale/fr";

import {
  doc,
  collection,
  addDoc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/app/firebase/firebase";

import { useEffect, useState } from "react";
import { time } from "console";

const VendToutMessage = ({
  isSeller,
  message,
  timestamp,
  userToken,
  productID,
  chatID,
}: {
  isSeller: boolean;
  message: string;
  timestamp: { seconds: number; nanoseconds: number };
  userToken: string | null;
  productID: string;
  chatID : string
}) => {
  const messageTime = moment.unix(timestamp.seconds + 5);

  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [buttonText, setButtonText] = useState<string>("");

  useEffect(() => {
    switch (message) {
      case "Vendu":
        if (isSeller) {
          setTitle("Vendu !");
          setText(
            `L'acheteur a déjà réglé les frais de port. Tu peux dès maintenant envoyer le colis. Dès que l'acheteur validera la réception de l'article, tu recevras le paiement.`
          );
          setButtonText("Confirmer l'envoi");
        } else {
          setTitle("Achat confirmé !");
          setText(
            "Le vendeur a été informé de votre commande et va préparer l'envoi. Vous serez notifié dès qu'il aura expédié l'article."
          );
        }
        break;
      case "Envoyé":
        if (isSeller) {
          setTitle("Article envoyé !");
          setText("L'envoi de ton article a bien été pris en compte. L'acheteur a été notifié de l'envoi, une fois la réception validée, tu recevras le paiement.");
        } else {
          setTitle("Article envoyé !");
          setText("Le vendeur a confirmé l'envoi du colis. Confirme la réception une fois que tu auras reçu ton article.");
          setButtonText("Confirmer la réception");
        }
        break;
      case "Terminé":
        if (isSeller){
          setTitle("Transaction terminé !");
          setText("L'acheteur a confirmé la réception de ton article.");
        } else {
          setTitle("Transaction terminé !");
          setText("Merci de ton achat sur VendTout");
        }
        break;
    }
  }, [message]);

  const handleButtonClick = async () => {
    if (buttonText === "Confirmer l'envoi") {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/orders/productSent`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productID: productID,
            userToken: userToken,
          }),
        }
      );
      const data = await response.json();

      if (data.result) {
        const chatRef = doc(db, "chats", chatID);
        const messagesRef = collection(db, "chats", chatID, "messages");
        const q = query(messagesRef, where("senderID", "==", "system"), where("text", "==", "Vendu"));
        const snapshot = await getDocs(q);
        const messageDoc = snapshot.docs[0];
        if (messageDoc) {
          const messageRef = doc(db, "chats", chatID, "messages", messageDoc.id);
          await updateDoc(messageRef, {
            text:"Envoyé",
            timestamp: serverTimestamp(),
            seenBy: []
          });
          await updateDoc(chatRef, {
            lastMessage: "Article envoyé !",
            lastMessageTimestamp: serverTimestamp(),
            lastMessageSeenBy: [],
          })
        }
      }
    } else if (buttonText === "Confirmer la réception"){
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/orders/productReceived`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productID: productID,
            userToken: userToken,
          }),
        }
      );
      const data = await response.json();
      console.log(productID)

      if (data.result) {
        const chatRef = doc(db, "chats", chatID);
        const messagesRef = collection(db, "chats", chatID, "messages");
        const q = query(messagesRef, where("senderID", "==", "system"), where("text", "==", "Envoyé"));
        const snapshot = await getDocs(q);
        const messageDoc = snapshot.docs[0];
        if (messageDoc) {
          const messageRef = doc(db, "chats", chatID, "messages", messageDoc.id);
          await updateDoc(messageRef, {
            text:"Terminé",
            timestamp: serverTimestamp(),
            seenBy: []
          });
          await updateDoc(chatRef, {
            lastMessage: "Transaction terminé !",
            lastMessageTimestamp: serverTimestamp(),
            lastMessageSeenBy: [],
          })
        }
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Message envoyé il y a combien de temps */}
      <div className="w-full text-center">
        <span className="text-xs text-darkGrey">{messageTime.fromNow()}</span>
      </div>
      {/* Message reçu */}
      <div className="w-full border-b border-t border-gray-200 p-4">
        <span className="font-medium">{title}</span>
        <p className="text-darkgrey">{text}</p>
        {buttonText && (
          <div className="mt-4" onClick={handleButtonClick}>
            <Button
              bgColor="bg-mainColor"
              textColor="text-white"
              text={buttonText}
              textSize="text-base"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VendToutMessage;
