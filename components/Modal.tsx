import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import { Button } from "./Button";
import { DanceClass } from "../types/DanceClass";
import { getAuth } from "@firebase/auth";
import { userInfo } from "os";
import { useAuthState } from "react-firebase-hooks/auth";
import { StripeForm } from "./StripeForm";

interface Props {
  show: boolean;
  onClose: () => void;
  danceClass: DanceClass;
}

export const Modal: React.FC<Props> = ({ show, onClose, danceClass }) => {
  const [open, setOpen] = useState(show);
  const cancelButtonRef = useRef(null);
  const [user, userLoading, userError] = useAuthState(getAuth());
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    setOpen(show);
  }, [show]);

  const modalClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-3xl mb-5 font-medium text-gray-900"
                    >
                      Book {danceClass.name}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 mb-6">
                        {danceClass.description}
                      </p>

                      <fieldset className="mb-6">
                        <div>
                          <legend className="text-base font-medium text-gray-900">
                            Dancer type
                          </legend>
                          <p className="text-sm text-gray-500">
                            To ensure we've got a balance in the class please
                            let us know what type of dancer you are.
                          </p>
                        </div>
                        <div className="mt-4 space-y-4">
                          <div className="flex items-center">
                            <input
                              id="push-everything"
                              name="push-notifications"
                              type="radio"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            />
                            <label
                              htmlFor="push-everything"
                              className="ml-3 block text-sm font-medium text-gray-700"
                            >
                              Leader
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="push-email"
                              name="push-notifications"
                              type="radio"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            />
                            <label
                              htmlFor="push-email"
                              className="ml-3 block text-sm font-medium text-gray-700"
                            >
                              Follower
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-3">
                <StripeForm
                  productId={danceClass.id ?? ""}
                  onSubmit={() => {
                    setSubmitLoading(true);
                  }}
                >
                  <Button
                    type="submit"
                    disabled={submitLoading}
                    className="w-32"
                  >
                    {submitLoading ? "Please wait..." : "Book"}
                  </Button>
                </StripeForm>

                <Button
                  appearance="secondary"
                  onClick={modalClose}
                  ref={cancelButtonRef}
                  disabled={submitLoading}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
