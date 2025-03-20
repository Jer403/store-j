import { createContext, useCallback, useEffect, useState } from "react";
import { Comment } from "../types";
import { getMessagesRequest } from "../Api/chat";
import { createCommentRequest } from "../Api/comment";

interface CommentContextType {
  comments: Comment[];
  loadingComments: boolean;
  addComment: (comment: Comment) => void;
  clearComments: () => void;
  createComment: (comment: Comment) => void;
  commentsLoading: { id: string }[];
  commentsError: { id: string }[];
}

interface CommentProviderProps {
  children: import("react").ReactElement;
}

export const CommentContext = createContext<CommentContextType>({
  comments: [],
  loadingComments: true,
  addComment: () => {},
  clearComments: () => {},
  createComment: () => {},
  commentsLoading: [],
  commentsError: [],
});

export function ChatProvider({ children }: CommentProviderProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState<{ id: string }[]>([]);
  const [commentsError, setCommentsError] = useState<{ id: string }[]>([]);

  const addComment = useCallback((comment: Comment) => {
    setComments((prevComm) => [...prevComm, comment]);
  }, []);

  const createComment = async (comment: Comment) => {
    try {
      addCommentToLoading(comment.id);
      const res = await createCommentRequest({
        message: comment.message,
        productId: comment.productId,
      });
      console.log("Response from create comment: ", res);
      if (!res) throw new Error("Create Comment request failed");
      if (res.status == 200) {
        addComment(res.data as Comment);
      } else {
        addCommentToError(comment.id);
      }
      removeCommentToLoading(comment.id);
    } catch (error) {
      console.log("Error creating comment data: ", error);
    }
  };

  const clearComments = () => {
    setComments([] as Comment[]);
    return [];
  };

  const addCommentToLoading = (id: string) => {
    setCommentsLoading((prev) => [...prev, { id }]);
  };

  const removeCommentToLoading = (id: string) => {
    setCommentsLoading((prev) => prev.filter((el) => el.id != id));
  };

  const addCommentToError = (id: string) => {
    setCommentsError((prev) => [...prev, { id }]);
  };

  const loadComments = async () => {
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
    loadComments();
  }, []);

  return (
    <CommentContext.Provider
      value={{
        comments,
        loadingComments,
        addComment,
        clearComments,
        commentsError,
        commentsLoading,
        createComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}
