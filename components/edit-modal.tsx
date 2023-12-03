"use client";

import {useState, useEffect, FormEvent} from "react";

import {updateUser} from "@/actions/users";
import {useToast} from "./ui/use-toast";
import {Input} from "./ui/input";
import ImageUpload from "./image-upload";
import {Label} from "./ui/label";
import {Button} from "./ui/button";
import {Textarea} from "./ui/textarea";
import {ScrollArea} from "./ui/scroll-area";

const EditModal = ({currentUser}: {currentUser: any}) => {
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  const {toast} = useToast();

  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
  }, [
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
    currentUser?.profileImage,
    currentUser?.coverImage,
  ]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUser({
        id: currentUser.id,
        name,
        username,
        bio,
        profileImage,
        coverImage,
      });
      setLoading(false);
      toast({
        title: "Update profile successful!",
        description: `user @${username} Update profile.`,
      });
    } catch (error: any) {
      setLoading(false);
      toast({
        title: "Update profile failed!",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <ScrollArea className="h-[80vh]">
          <ImageUpload
            value={profileImage}
            disabled={loading}
            onChange={(image) => setProfileImage(image)}
            label="Upload your profile image"
          />
          <ImageUpload
            value={coverImage}
            disabled={loading}
            onChange={(image) => setCoverImage(image)}
            label="Upload your cover image"
          />
          <div className="flex w-full flex-col gap-3">
            <Label className="text-base font-semibold">Name</Label>
            <div>
              <Input
                type="text"
                className="bg-gray-200 text-black focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 my-3">
            <Label className="text-base font-semibold">Username</Label>
            <div>
              <Input
                type="text"
                className="bg-gray-200 text-black focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 mx-1">
            <Label className="text-base font-semibold">Bio</Label>
            <div>
              <Textarea
                placeholder="Enter your bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                required
              />
            </div>
          </div>
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="my-5"
          >
            {loading ? "Processing..." : "Update Profile"}
          </Button>
        </ScrollArea>
      </form>
    </>
  );
};

export default EditModal;
