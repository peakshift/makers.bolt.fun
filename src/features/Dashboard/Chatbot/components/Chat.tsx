import MessagesContainer from "./MessagesContainer";

export default function Chat() {
  return (
    <div className="overflow-auto h-full w-full mx-auto px-16">
      <div className="h-full bg-gray-300 bg-opacity-30 rounded p-16 flex flex-col overflow-auto">
        <MessagesContainer />
      </div>
    </div>
  );
}
