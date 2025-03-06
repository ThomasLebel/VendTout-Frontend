import moment from "moment";
import "moment/locale/fr";

import Image from "next/image";

const ReceivedMessage = ({
  message,
  timestamp,
  avatarURL,
}: {
  message: string;
  timestamp: { seconds: number; nanoseconds: number };
  avatarURL: string;
}) => {

  const messageTime = moment.unix(timestamp.seconds + 5 );

  return (
    <div className="flex flex-col gap-4">
      {/* Message envoyé il y a combien de temps */}
      <div className="w-full text-center">
        <span className="text-xs text-darkGrey">{messageTime.fromNow()}</span>
      </div>
      {/* Message reçu */}
      <div className="w-full flex justify-start">
        <div className="flex gap-2 w-full">
          <Image width={40} height={40} alt={`Avatar du correspondant`} src={avatarURL} className="h-9 w-9 rounded-full" />
          <div className="px-2 py-3 max-w-[70%] rounded-lg border border-gray-200 flex gap-2">
            <span>{message}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceivedMessage;
