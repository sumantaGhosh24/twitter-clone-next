"use client";

import {ArrowLeft, UserCog} from "lucide-react";
import {useRouter} from "next/navigation";

import EditModal from "./edit-modal";
import Modal from "./modal";

interface NavbarType {
  title: string;
  user: any;
  showBackArrow?: boolean;
  showEditor?: boolean;
}

const Navbar = ({title, user, showBackArrow, showEditor}: NavbarType) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <div className="p-5 bg-sky-500">
        <div className="flex flex-row items-center justify-between gap-2">
          {showBackArrow && (
            <ArrowLeft
              onClick={handleBack}
              color="white"
              size={20}
              className="cursor-pointer"
            />
          )}
          <h1 className="text-white text-xl font-semibold">{title}</h1>
          {showEditor && (
            <Modal
              title="Update user"
              description="Fill all teh fields to update your profile."
              trigger={
                <button className="mx-1 inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary p-1.5 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-gray-300">
                  <UserCog className="text-primary-foreground" />
                </button>
              }
            >
              <EditModal currentUser={user} />
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
