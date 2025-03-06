import moment from "moment";
import "moment/locale/fr";

const SentMessage = ({
  message,
  timestamp,
}: {
  message: string;
  timestamp: { seconds: number; nanoseconds: number };
}) => {

  const messageTime = moment.unix(timestamp.seconds + 5);

  return (
    <div className="flex flex-col gap-4">
      {/* Message envoyé il y a combien de temps */}
      <div className="w-full text-center">
        <span className="text-xs text-darkGrey">{messageTime.fromNow()}</span>
      </div>
      {/* Message envoyé */}
      <div className="w-full flex justify-end">
        <div className="px-2 py-3 max-w-[70%] rounded-lg border border-gray-200 bg-lightGrey">
          <span className="break-words">{message}</span>
        </div>
      </div>
    </div>
  );
};

export default SentMessage;
