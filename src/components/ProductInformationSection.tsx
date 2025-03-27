import { InputTextSimple } from "../components/form/InputTextSimple";
import { ButtonSubmitSimple } from "../components/form/ButtonSubmitSimple";
import { SectionButton } from "../components/form/SectionButton";
import { Comment as CommentMessage } from "../components/Comment";
import { useState } from "react";
import { Product, Sections } from "../types";
import { useComment } from "../hooks/useComment";
import { formatDateTime } from "../utils";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { CircleDashed, Clock, X } from "lucide-react";

export function ProductInformationSection({ product }: { product: Product }) {
  const [section, setSection] = useState<Sections>("info");
  const [message, setMessage] = useState("");
  const {
    comments,
    createComment,
    commentsLoading,
    commentsError,
    loadingComments,
  } = useComment();
  const { user, logged } = useAuth();
  const navigate = useNavigate();

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logged) navigate("/login");
    if (!user || !product || message.length == 0) return;

    const dateA = new Date();
    const date = new Date(
      dateA.getFullYear(),
      dateA.getMonth(),
      dateA.getDate(),
      dateA.getHours() + 5
    );

    const uuid = window.crypto.randomUUID();

    createComment({
      id: uuid,
      userId: user.id,
      userName: user.username,
      productId: product.id,
      comment: message,
      created_at: `${formatDateTime(date)}`,
    });

    setMessage("");
  };

  const commentsAmount = comments
    ? comments.filter((el) => el.productId == product.id).length
    : 0;

  const commentFiltered = comments.filter((el) => el.productId == product.id);

  const commentsLoadingFiltered = commentsLoading.filter(
    (el) => el.productId == product.id
  );
  const commentsErrorFiltered = commentsError.filter(
    (el) => el.productId == product.id
  );

  return (
    <div className="infos">
      <div
        className="w-full rounded-xl h-16 flex p-2 gap-2 bg-gray-90"
        key={"Sections"}
      >
        <SectionButton
          id="info"
          text="Information"
          section={section}
          setSection={setSection}
        ></SectionButton>
        <SectionButton
          id="comments"
          text={`Comments (${commentsAmount})`}
          section={section}
          setSection={setSection}
        ></SectionButton>
      </div>

      <div
        key={"Description"}
        className={`${
          section == "info" ? "flex" : "hidden"
        } max-w-none flex-col p-4 mb-8`}
      >
        <h3 className="text-2xl font-bold text-[--text_light_100] mb-2">
          Description
        </h3>
        <p className="[--text_light_0]space-pre-line text-lg font-medium text-[--text_light_200]">
          {product.description}
        </p>
      </div>

      <div
        key={"Comments"}
        className={`${
          section == "comments" ? "flex" : "hidden"
        } flex-col gap-4 w-full h-fit p-4 rounded-xl`}
      >
        <div className="">
          <h3 className="text-2xl font-bold text-[--text_light_100]">
            {`${commentsAmount} Comments`}
          </h3>
        </div>
        <div>
          <div className="flex flex-col">
            <label className="text-md text-[--text_light_100]">
              Add a Comment
            </label>
            <form
              className="flex flex-col md:flex-row items-end md:items-center justify-center gap-2"
              onSubmit={handleSubmitComment}
            >
              <InputTextSimple
                className="rounded-xl"
                id="comment"
                value={message}
                setValue={setMessage}
                placeholder="Write your comment here..."
              ></InputTextSimple>
              <ButtonSubmitSimple
                text="Comment"
                type="submit"
                className="w-full md:w-64 rounded-xl"
                loginRequired
                loginRequiredText="Login to comment"
                logged={logged}
              ></ButtonSubmitSimple>
            </form>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {loadingComments ? (
            <div className="flex items-center justify-center gap-2">
              <CircleDashed className="w-6 h-6 loader text-[--text_light_50]"></CircleDashed>
              <p className="text-center text-xl font-medium text-[--text_light_100]">
                Loading comments...
              </p>
            </div>
          ) : (
            <>
              {commentsErrorFiltered.length != 0 &&
                commentsErrorFiltered.map((c) => (
                  <CommentMessage
                    username={c.userName}
                    message={c.comment}
                    date={c.created_at}
                    icon={<X className="h-5 w-5 text-[--text_light_200]"></X>}
                  ></CommentMessage>
                ))}
              {commentsLoadingFiltered.length != 0 &&
                commentsLoadingFiltered.map((c) => (
                  <CommentMessage
                    username={c.userName}
                    message={c.comment}
                    date={c.created_at}
                    icon={
                      <Clock className="h-5 w-5 text-[--text_light_200]"></Clock>
                    }
                  ></CommentMessage>
                ))}
              {commentFiltered.length != 0 ? (
                commentFiltered.map((c) => {
                  return (
                    <CommentMessage
                      username={c.userName}
                      message={c.comment}
                      date={c.created_at}
                    ></CommentMessage>
                  );
                })
              ) : (
                <div>
                  <p className="w-full text-center text-xl font-medium mt-2 text-[--text_light_100]">
                    This product has no comments yet
                  </p>
                  <p className="w-full text-center text-xl font-medium text-[--text_light_100]">
                    Be the first one !
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
