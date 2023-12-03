"use client";

import {FormEvent, useState} from "react";

import {createPost} from "@/actions/posts";
import {useToast} from "./ui/use-toast";
import {Avatar, AvatarFallback, AvatarImage} from "./ui/avatar";
import {Button} from "./ui/button";
import {Textarea} from "./ui/textarea";
import ImageUpload from "./image-upload";

const TweetForm = ({user}: {user: any}) => {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const {toast} = useToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPost({id: user?.id, text: body, image});
      setLoading(false);
      toast({
        title: "Tweet successful!",
        description: `@${user?.username} your tweet posted.`,
      });
      setBody("");
      setImage("");
    } catch (error: any) {
      setLoading(false);
      toast({
        title: "Tweet failed!",
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
          <ImageUpload
            value={image}
            onChange={(image) => setImage(image)}
            disabled={loading}
            label="Upload tweet image"
          />
          <Textarea
            onChange={(event) => setBody(event.target.value)}
            value={body}
            placeholder="What's happening"
          />
          <Button
            type="submit"
            disabled={loading || !body}
            variant="primary"
            className="mt-2"
          >
            {loading ? "Processing..." : "Post"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TweetForm;
