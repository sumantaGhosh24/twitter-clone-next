"use client";

import {FormEvent, useState} from "react";

import {createComment} from "@/actions/comments";
import {useToast} from "./ui/use-toast";
import {Avatar, AvatarFallback, AvatarImage} from "./ui/avatar";
import {Button} from "./ui/button";
import {Textarea} from "./ui/textarea";

interface CommentFormType {
  user: any;
  postId: string;
}

const CommentForm = ({user, postId}: CommentFormType) => {
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const {toast} = useToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createComment(body, postId, user.id);
      setLoading(false);
      setBody("");
      toast({
        title: "Comment successful!",
        description: `@${user?.username} your comment posted.`,
      });
    } catch (error: any) {
      setLoading(false);
      toast({
        title: "Comment failed!",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <form
      className="bg-gray-100 py-3 border-neutral-800 px-5 mb-5 mx-2"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-row gap-4">
        <div>
          <Avatar>
            <AvatarImage src={user?.profileImage} />
            <AvatarFallback>{user?.name?.substring(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full">
          <Textarea
            onChange={(event) => setBody(event.target.value)}
            value={body}
            placeholder="Write your comment"
          />
          <Button
            type="submit"
            disabled={loading || !body}
            variant="primary"
            className="mt-2"
          >
            {loading ? "Processing..." : "Comment"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
