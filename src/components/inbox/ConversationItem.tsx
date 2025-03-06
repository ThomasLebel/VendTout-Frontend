import moment from "moment";
import "moment/locale/fr";

import { useAppSelector } from "@/app/redux/store";
import { useRouter } from "next/navigation";

import Image from "next/image";

const ConversationItem = ({
  chatPartner,
  lastMessage,
  lastMessageTimestamp,
  lastMessageSeen
}: {
  chatPartner: { username: string; avatarUrl: string };
  lastMessage: string;
  lastMessageTimestamp: number;
  lastMessageSeen : boolean
}) => {

  const user = useAppSelector((state) => state.user.value);
  const router = useRouter()
  const messageTime = moment.unix(lastMessageTimestamp);

  const handleClick = () => {
    const chatID = [user.username, chatPartner.username].sort().join("_");
    router.push(`/inbox/${chatID}`)
  };

  return (
    <div
      className={`w-full border-b p-4 border-gray-200 flex justify-between items-center cursor-pointer ${!lastMessageSeen && "bg-mainColor bg-opacity-10"}`}
      onClick={handleClick}
    >
      <div className="flex gap-3 item s-center">
        <Image src={chatPartner.avatarUrl} alt={`avatar de ${chatPartner.username}`} width={50} height={50} className="rounded-full" />
        <div className="flex flex-col">
          <span className=" font-medium">{chatPartner.username}</span>
          <span className="text-darkGrey">{lastMessage}</span>
        </div>
      </div>

      <div>
        <span className="text-darkGrey text-sm">{messageTime.fromNow()}</span>
      </div>
    </div>
  );
};

export default ConversationItem;
