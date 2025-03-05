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

const NewOrder = async (
  productID: string,
  buyerUsername: string,
  sellerUsername: string,
  totalPrice: number,
  sellerPrice: number,
  paymentMethod: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/orders/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productID: productID,
          buyerUsername: buyerUsername,
          sellerUsername: sellerUsername,
          totalPrice: totalPrice.toFixed(2),
          sellerPrice: sellerPrice.toFixed(2),
          paymentMethod: paymentMethod,
        }),
      }
    );

    const data = await response.json();
    console.log(data.result)

    if (data.result) {
      const chatRef = doc(db, "chats", data.chatID);
      const chatSnap = await getDoc(chatRef);

      if (!chatSnap.exists()) {
        await setDoc(chatRef, {
          participants: [
            {
              username: data.buyerUsername,
              avatarUrl: data.buyerProfilePicture,
            },
            {
              username: data.sellerUsername,
              avatarUrl: data.sellerProfilePicture,
            },
          ],
          productID: data.productID,
          participantsUsername: [data.buyerUsername, data.sellerUsername],
          buyer: data.buyerUsername,
          seller: data.sellerUsername,
          lastMessage: "Vendu",
          lastMessageSeenBy: [],
          lastMessageTimestamp: serverTimestamp(),
        });
    }

        await addDoc(collection(db, `chats/${data.chatID}/messages`), {
          senderID: "system",
          text: "Vendu",
          timestamp: serverTimestamp(),
          seenBy: [],
        });

        await updateDoc(chatRef, {
            lastMessage: "Achat effectué !",
            lastMessageTimestamp: serverTimestamp(),
            lastMessageSeenBy: [],
            productID : data.productID
          });
          console.log(data.productID)
        return(data.chatID)
      
    }
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }
};

export default NewOrder;
