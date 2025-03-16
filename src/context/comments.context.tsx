import { createContext, useCallback, useEffect, useState } from "react";
import { Comment } from "../types";
import { getMessagesRequest } from "../Api/chat";

interface CommentContextType {
  comments: Comment[];
  loadingComments: boolean;
  addComment: (comment: Comment) => void;
  clearChat: () => void;
}

interface CommentProviderProps {
  children: import("react").ReactElement;
}

export const CommentContext = createContext<CommentContextType>({
  comments: [],
  loadingComments: true,
  addComment: () => {},
  clearChat: () => {},
});

export function ChatProvider({ children }: CommentProviderProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);

  const addComment = useCallback((comment: Comment) => {
    setComments((prevComm) => [...prevComm, comment]);
  }, []);

  const clearChat = () => {
    setComments([] as Comment[]);
    return [];
  };

  const loadMessages = async () => {
    setLoadingComments(true);
    try {
      const res = await getMessagesRequest();
      console.log("Response from comment: ", res);
      if (!res) throw new Error("Comment request failed");
      if (res.status == 200) {
        setComments(res.data);
      } else {
        setComments([] as Comment[]);
      }
    } catch (error) {
      console.log("Error fetching comment data: ", error);
      setComments([] as Comment[]);
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <CommentContext.Provider
      value={{ comments, loadingComments, addComment, clearChat }}
    >
      {children}
    </CommentContext.Provider>
  );
}
