import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/dist/client/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { HeaderNavLink } from './HeaderNavLink';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAdmins } from '../hooks/useAdmins';
import { MainSiteUrl } from '../constants/urls';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export const Header = () => {
    const [user, loading, error] = useAuthState(getAuth());
    const [adminIds, adminIdsLoading, adminIdsError] = useAdmins();
    const showAdminLink = adminIds?.find((x) => x === user?.uid);

    return (
        <header className="z-10 shadow-sm sticky py-6 px-8 flex justify-between items-center top-0 left-0 right-0 bg-white border-b border-gray-200">
            <a
                href={MainSiteUrl}
                className="text-black text-4xl font-medium hover:no-underline"
            >
                Salsa Therapy
            </a>

            <nav className="flex gap-6 items-center">
                {showAdminLink && (
                    <HeaderNavLink href="/admin/classes">
                        Manage classes
                    </HeaderNavLink>
                )}
                <HeaderNavLink href="/">Upcoming Classes</HeaderNavLink>
                <HeaderNavLink href="/pricing">Pricing</HeaderNavLink>
                <>
                    {user?.displayName ? (
                        <Menu as="div" className="ml-2 relative">
                            <div>
                                <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-600 focus:ring-white">
                                    <span className="sr-only">
                                        Open user menu
                                    </span>
                                    {user?.photoURL ? (
                                        <img
                                            className="h-10 w-10 rounded-full"
                                            src={user?.photoURL}
                                            alt=""
                                        />
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-8 w-8 p-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="white"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                    )}
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
                                                href="/booking"
                                                className={classNames(
                                                    active ? 'bg-gray-100' : '',
                                                    'block px-4 py-2 text-sm text-gray-700'
                                                )}
                                            >
                                                Your Bookings
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="/logout"
                                                className={classNames(
                                                    active ? 'bg-gray-100' : '',
                                                    'block px-4 py-2 text-sm text-gray-700'
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
