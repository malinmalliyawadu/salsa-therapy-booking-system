import { signOut } from "@firebase/auth";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { getAuth } from "firebase/auth";
import { NextPage } from "next";

const Logout: NextPage = () => {
  signOut(getAuth());

  // setTimer;

  return (
    <div className="flex justify-center my-32 flex-col items-center">
      <CheckCircleIcon className="h-20 w-20 mb-5 text-green-600" />
      <h1 className="text-4xl">You have successfully logged out.</h1>
    </div>
  );
};

export default Logout;
