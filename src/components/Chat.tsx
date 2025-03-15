import {
  CircleDashed,
  Clock,
  HelpCircleIcon,
  MessageSquareIcon,
  MessageSquareMoreIcon,
  Send,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  formatDateTime,
  formatHours,
  formatMinutes,
  whichMeridian,
} from "../utils";
import { useAuth } from "../hooks/useAuth";
import { useChat } from "../hooks/useChat";
import { ChatMessage } from "../types";
import { sendMessageRequest } from "../Api/chat";
import { DropDownTab } from "./DropDownTab";

function ChatMessageCard({ chat }: { chat: ChatMessage }) {
  const date =
    chat.created_at == "null" ? null : new Date(chat.created_at + " UTC");
  const { loadingMessage } = useChat();
  return (
    <div
      className={`relative rounded-lg flex max-w-80 min-h-max h-fit w-fit ${
        chat.isMessageFromUser == "true"
          ? "self-end !rounded-br-none bg-indigo-400 border-transparent shadow-gray-300"
          : "!rounded-bl-none bg-white border-gray-200 shadow-gray-200"
      } p-2 border shadow-md`}
    >
      <p
        className={`${
          chat.isMessageFromUser == "true" ? "text-gray-100" : "text-gray-700"
        } flex justify-start text-start text-sm`}
      >
        {chat.message} {date && <>&emsp;&emsp;&emsp;&emsp;</>}
      </p>
      {date && (
        <p
          className={`${
            chat.isMessageFromUser == "true" ? "text-gray-100" : "text-gray-500"
          } text-sm absolute right-1 bottom-1`}
        >{`${formatHours(date.getHours())}:${formatMinutes(
          date.getMinutes()
        )} ${whichMeridian(date.getHours())}`}</p>
      )}
      {loadingMessage.find((el) => el.id == chat.id) && (
        <div className="absolute top-1 right-1 items-end justify-end">
          <Clock className="text-gray-500" width={13} height={13}></Clock>
        </div>
      )}
    </div>
  );
}

function DateDivisor({ dateS }: { dateS: string }) {
  const date = new Date(dateS + " UTC");
  return (
    <div className={`relative my-2 flex w-full justify-center items-center`}>
      <div className="border-b w-[80%] absolute border-gray-300"></div>
      <p className="bg-gray-100 z-10 text-sm px-4 text-gray-400">{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</p>
    </div>
  );
}

export function Chat() {
  const [message, setMessage] = useState("");
  const {
    isChatOpen,
    setIsChatOpen,
    isInChat,
    setIsInChat,
    chat: chats,
    loadingChat,
    addMessageToChat,
    addLoadingMessage,
    removeLoadingMessage,
    addErrorMessage,
    notSeenMessages,
    setNotSeenMessagesToSeen,
  } = useChat();
  const { logged } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState("");

  const scrollChat = () => {
    const div = document.getElementById("chatBox");
    if (div) div.scrollTop = 9999;
  };

  useEffect(() => {
    scrollChat();
  }, [chats, isChatOpen]);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dateA = new Date();
    const date = new Date(
      dateA.getFullYear(),
      dateA.getMonth(),
      dateA.getDate(),
      dateA.getHours() + 5,
      dateA.getMinutes()
    );

    console.log(formatDateTime(date));

    const uuid = window.crypto.randomUUID();

    addMessageToChat({
      id: uuid,
      userId: "",
      isMessageFromUser: "true",
      message: message,
      created_at: `${formatDateTime(date)}`,
    } as ChatMessage);

    addLoadingMessage({ id: uuid });

    setMessage("");

    try {
      const res = await sendMessageRequest(message);
      if (!res) return;
      if (res.status == 200) {
        console.log("Mensaje recibido");
        removeLoadingMessage({ id: uuid });
        addErrorMessage({ id: uuid });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const messageCards = useCallback(() => {
    return chats.map((c, i, arr) => {
      if (i == 0) {
        return (
          <>
            <DateDivisor dateS={`${new Date(c.created_at)}`}></DateDivisor>
            <ChatMessageCard chat={c} key={"cht-" + c.id}></ChatMessageCard>
          </>
        );
      }
      const datePrev = new Date(arr[i - 1].created_at + " UTC").toDateString();
      const dateActual = new Date(arr[i].created_at + " UTC").toDateString();
      if (datePrev !== dateActual) {
        return (
          <>
            <DateDivisor dateS={arr[i].created_at}></DateDivisor>
            <ChatMessageCard chat={c} key={"cht-" + c.id}></ChatMessageCard>
          </>
        );
      }
      return <ChatMessageCard chat={c} key={"cht-" + c.id}></ChatMessageCard>;
    });
  }, [chats]);

  return (
    <div
      className={`${
        logged ? "fixed" : "hidden"
      } bottom-0 right-0 mr-4 mb-[80px]  w-[90%] sm:w-auto z-50`}
    >
      <div
        className={`${
          isChatOpen && ""
        } flex items-end flex-col w-full sm:w-[424px] gap-2 rounded-lg`}
      >
        <div
          className={`${
            isChatOpen ? "flex border border-gray-500" : "hidden"
          } flex-col bg-white rounded-lg overflow-hidden w-full h-[600px] max-h-[600px] shadow-m shadow-gray-600`}
        >
          <div
            className={`flex w-full border-b border-gray-200 rounded-t-md h-12 items-center justify-center gap-3 p-2`}
          >
            <button
              className={`${
                isInChat ? "bg-gray-200" : "hover:bg-gray-100"
              } flex flex-row justify-center items-center gap-1 rounded-md px-3 py-1 text-sm font-medium`}
              onClick={() => setIsInChat(true)}
            >
              <MessageSquareMoreIcon className="w-4 h-4"></MessageSquareMoreIcon>
              Chat
            </button>
            <button
              className={`${
                isInChat ? "hover:bg-gray-100" : "bg-gray-200"
              } flex flex-row justify-center items-center gap-1 rounded-md px-3 py-1 text-sm font-medium`}
              onClick={() => setIsInChat(false)}
            >
              <HelpCircleIcon className="w-4 h-4"></HelpCircleIcon>Help
            </button>
          </div>
          <div
            className={`${
              isInChat ? "flex" : "hidden"
            } h-full bg-gray-100 flex-col p-3 max-h-full overflow-auto gap-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-md`}
            id="chatBox"
          >
            <ChatMessageCard
              chat={{
                id: "welcomeM",
                userId: "admin",
                isMessageFromUser: "false",
                message:
                  "Comienza una conversación con nosotros y cuentanos si tienes algun problema",
                created_at: "null",
              }}
              key={"cht-" + "welcomeChat"}
            ></ChatMessageCard>
            {loadingChat ? (
              <div className="flex justify-center items-center text-lg">
                <CircleDashed className="loader h-6 w-6"></CircleDashed>{" "}
                <span className="ml-1">Cargando chat...</span>
              </div>
            ) : (
              messageCards()
            )}
          </div>
          <div
            className={`${
              isInChat ? "hidden" : "flex"
            } h-full flex-col p-3 max-h-full overflow-auto gap-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-md`}
          >
            <DropDownTab
              id="metodos"
              question="¿Qué métodos de pago aceptan?"
              answer="Actualmente los pagos se realizan a travéz de la plataforma de pagos Tropipay que acepta pagos con Visa, MasterCard y saldo de Tropipay"
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
            ></DropDownTab>
            <DropDownTab
              id="formato"
              question="¿En qué formato están disponibles los modelos 3D?"
              answer="Los modelos se entregan en formato stl"
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
            ></DropDownTab>
            <DropDownTab
              id="resolucion"
              question="¿Se incluyen archivos en diferentes resoluciones o tamaños?"
              answer="No, el modelo esta en una sola resolucion y tamaño"
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
            ></DropDownTab>
            <DropDownTab
              id="comoDescargar"
              question="¿Cómo descargo un modelo después de comprarlo?"
              answer="En tu perfil estan todos los modelos que has comprado"
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
            ></DropDownTab>
            <DropDownTab
              id="tiempo"
              question="¿Cuánto tiempo tengo para descargar un modelo después de la compra?"
              answer="No tienes un tiempo limitado, una vez comprado lo puedes descargar en cualquier momento en tu perfil"
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
            ></DropDownTab>
            <DropDownTab
              id="variasDescargas"
              question="¿Puedo descargar el modelo más de una vez?"
              answer="Si, puedes descargar los modelos que has comprado cuantas veces quieras"
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
            ></DropDownTab>
            <DropDownTab
              id="problemaAlDescargar"
              question="¿Qué hago si tengo problemas para descargar mi archivo?"
              answer="Escribenos en el chat incorporado en la pestaña de chat o escribenos un correo a asd@gmail.com e intentaremos solucionar su problema"
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
            ></DropDownTab>
          </div>

          <div
            className={`w-full bg-gray-100 ${
              isInChat ? "flex" : "hidden"
            } h-16 px-3 pb-3 items-center`}
          >
            <form
              className="flex h-full w-full bg-white shadow-sm shadow-gray-300 rounded-lg overflow-hidden border border-gray-200"
              onSubmit={handleChatSubmit}
            >
              <div className="flex w-full">
                <input
                  type="text"
                  name="message"
                  id="message"
                  autoComplete="off"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-l-lg focus:z-30 focus:outline-none border-0 focus:border focus:border-indigo-500 text-md p-1 px-2 bg-white"
                  placeholder="Escribe algo..."
                />
                <button
                  className={`h-full w-12 flex justify-center items-center text-gray-900 ${
                    message == undefined
                      ? "hover:text-gray-500"
                      : "hover:text-indigo-600 hover:bg-indigo-100"
                  }`}
                >
                  <Send className="flex justify-center items-center w-7 h-7"></Send>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div
          className={`${
            isChatOpen ? "rotate-0" : "rotate-12"
          } absolute border-2 -bottom-[64px] right-0 border-indigo-500 border-transparent bg-gray-50 w-14 h-14 rounded-xl flex justify-center items-center transition-transform`}
          onClick={() => {
            setIsChatOpen(!isChatOpen);
            setNotSeenMessagesToSeen();
          }}
        >
          {notSeenMessages > 0 && !isChatOpen && (
            <div className="absolute -top-3 right-0 rounded-full w-6 h-6 bg-indigo-600 -rotate-12">
              <div className="w-full h-full flex justify-center items-center text-white">
                {notSeenMessages}
              </div>
            </div>
          )}
          <MessageSquareIcon
            className={`absolute w-8 h-8 transition-[opacity] ${
              isChatOpen ? "rotate-0 opacity-0" : "-rotate-12 opacity-1"
            }`}
          ></MessageSquareIcon>
          <X
            className={`absolute w-8 h-8 transition-[opacity] ${
              isChatOpen ? "rotate-0 opacity-1" : "-rotate-12 opacity-0"
            }`}
          ></X>
        </div>
      </div>
    </div>
  );
}
