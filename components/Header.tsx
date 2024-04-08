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
    // const [user, loading, error] = useAuthState(getAuth());
    // const [adminIds, adminIdsLoading, adminIdsError] = useAdmins();
    // const showAdminLink = adminIds?.find((x) => x === user?.uid);

    return (
        <>
            <header className="z-10 shadow-sm sticky py-6 px-4 md:px-8 flex justify-between items-center top-0 left-0 right-0 bg-white border-b border-gray-200">
                <a
                    href={MainSiteUrl}
                    className="text-black text-4xl font-medium hover:no-underline"
                >
                    Salsa Therapy
                </a>

            </header>
            <div className="py-4 bg-purple-200 text-center text-black text-sm md:text-md">
                Need help or having issues?{' '}
                <a
                    className="text-purple-600"
                    href="mailto:lily@salsatherapy.co.nz?subject=Booking system enquiry"
                >
                    Contact us here
                </a>
            </div>
        </>
    );
};
