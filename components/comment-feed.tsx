import CommentItem from "./comment-item";

const CommentFeed = ({comments}: {comments: any}) => {
  return (
    <>
      {comments.map((comment: any) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </>
  );
};

export default CommentFeed;
