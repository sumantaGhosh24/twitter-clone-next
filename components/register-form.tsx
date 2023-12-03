"use client";

import {FormEvent, useState} from "react";
import {useRouter} from "next/navigation";

import {registerUser} from "@/actions/users";
import {useToast} from "./ui/use-toast";
import {Button} from "./ui/button";
import {Input} from "./ui/input";
import {Label} from "./ui/label";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const {toast} = useToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser({
        email,
        name,
        password,
        username,
      });
      setLoading(false);
      toast({
        title: "Register successful!",
        description: `user @${username} registered`,
      });
      router.push("/login");
    } catch (error: any) {
      setLoading(false);
      toast({
        title: "Register failed!",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <form
        className="flex flex-col justify-start gap-10"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full flex-col gap-3">
          <Label className="text-base font-semibold">Name</Label>
          <div>
            <Input
              type="text"
              className="bg-gray-200 text-black focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-3">
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
        <div className="flex w-full flex-col gap-3">
          <Label className="text-base font-semibold">Email</Label>
          <div>
            <Input
              type="email"
              className="bg-gray-200 text-black focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-3">
          <Label className="text-base font-semibold">Password</Label>
          <div>
            <Input
              type="password"
              className="bg-gray-200 text-black focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Processing..." : "Register"}
        </Button>
      </form>
    </>
  );
};

export default RegisterForm;
