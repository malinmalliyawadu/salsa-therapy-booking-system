import { getAuth } from "firebase/auth";
import { useRouter } from "next/dist/client/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { HeaderNavLink } from "./HeaderNavLink";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const Header = () => {
  const [user, loading, error] = useAuthState(getAuth());
  const router = useRouter();

  return (
    <header className="z-50 shadow-sm sticky py-6 px-8 flex justify-between items-center top-0 left-0 right-0 bg-white border-b border-gray-200">
      <a href="/">
        <img src="/logo.png" width="75" height="45" />
      </a>

      <nav className="flex gap-6 items-center">
        <HeaderNavLink href="/">Upcoming Classes</HeaderNavLink>
        <HeaderNavLink href="/pricing">Pricing</HeaderNavLink>
        <>
          {user?.photoURL ? (
            <Menu as="div" className="ml-3 relative">
              <div>
                <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-600 focus:ring-white">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user?.photoURL}
                    alt=""
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Your Profile
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Settings
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/logout"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Sign out
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <HeaderNavLink href="/login">Sign in</HeaderNavLink>
          )}
        </>
      </nav>
    </header>
  );
};
