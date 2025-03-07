import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const OrderItem = ({
  productTitle,
  productPrice,
  status,
  productPhotos,
  buyerUsername,
  sellerUsername,
  isOrder,
}: {
  productTitle: string;
  productPrice: number;
  status: string;
  productPhotos: string[];
  buyerUsername: string | null;
  sellerUsername: string | null;
  isOrder: boolean;
}) => {

  const router = useRouter()

  const [statusToShow, setStatusToShow] = useState<string>("");
  const [chatID, setChatID] = useState<string>('')
  console.log(chatID)

  useEffect(() => {
    // Récupération du chatID
    setChatID([buyerUsername, sellerUsername].sort().join("_"))
    // Définition du message de statut à afficher
    if (isOrder){
      if (status === 'En attente'){
        setStatusToShow("Commande confirmée - Le vendeur doit envoyé la commande")
      } else if (status === 'Envoyé'){
        setStatusToShow("Commande envoyée - En attente de la réception de la commande")
      } else if (status === 'Terminé'){
        setStatusToShow("Transaction terminée - L'acheteur a confirmé la réception")
      }
    } else {
      if (status === 'En attente'){
        setStatusToShow("Commande confirmée - Vous devez envoyer la commande")
      } else if (status === 'Envoyé'){
        setStatusToShow("Commande envoyée - En attente de la réception de la commande")
      } else if (status === 'Terminé'){
        setStatusToShow("Transaction terminée - L'acheteur a confirmé la réception")
      }
    }
  }, [status, isOrder, buyerUsername, sellerUsername])
  return (
    <div className="p-4 w-full flex justify-between items-center border-b border-gray-200 cursor-pointer" onClick={() => router.push(`/inbox/${chatID}`)}>
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-12  rounded-md">
          <Image
            src={productPhotos[0]}
            fill
            sizes="64px, 48px"
            alt="Photo de l'article"
            className="object-cover rounded-md"
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-medium">{productTitle.length > 40 ? productTitle.slice(0, 40) + "..." : productTitle}</span>
          <span className="text-darkGrey text-sm">{productPrice.toFixed(2)}€</span>
          <span className="text-darkGrey text-sm">
            {statusToShow}
          </span>
        </div>
      </div>

      <ChevronRightIcon className="h-5 w-5 text-darkGrey" />
    </div>
  );
};

export default OrderItem;
