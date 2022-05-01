import {
    CalendarIcon,
    LocationMarkerIcon,
    ExternalLinkIcon,
    XCircleIcon,
    CheckIcon,
    ClockIcon,
} from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';
import { DanceClass } from '../types/DanceClass';
import { Button } from './Button';
import { motion } from 'framer-motion';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ButtonLink } from './ButtonLink';
import { Modal } from './Modal';
import { useBookings } from '../hooks/useBookings';
import { StripeForm } from './StripeForm';
import { Skeleton } from './Skeleton';
import { ApiUrl } from '../constants/urls';

interface ClassDescriptionProps {
    danceClass: DanceClass;
    onClose: () => void;
}

export const ClassDescription: React.FC<ClassDescriptionProps> = ({
    danceClass,
    onClose,
}) => {
    const [user, userLoading, userError] = useAuthState(getAuth());
    const [showBookModal, setShowBookModal] = useState(false);
    const [bookings, bookingsLoading, bookingsError] = useBookings();
    const isBooked = bookings?.some((y) => y.classId == danceClass.id);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [price, setPrice] = useState<number>();
    const [dancerType, setDancerType] = useState<string>();
    const [dancerTypeError, setDancerTypeError] = useState<string>();

    const onBookClassClick = () => {
        setShowBookModal(true);
    };

    useEffect(() => {
        fetch(`${ApiUrl}price/${danceClass.stripeId}`)
            .then((res) => res.json())
            .then((x) => setPrice(x.unit_amount / 100));
    }, [danceClass.id]);

    const closeModal = () => {
        setDancerType(undefined);
        setDancerTypeError(undefined);
        setShowBookModal(false);
    };

    return (
        <>
            <Modal
                show={showBookModal}
                onClose={() => closeModal()}
                title={<>Book {danceClass.name}</>}
                bodyContent={
                    <StripeForm
                        priceId={danceClass.stripeId ?? ''}
                        onSubmit={(e) => {
                            if (dancerType) {
                                setSubmitLoading(true);
                            } else {
                                e.preventDefault();
                                setDancerTypeError(
                                    'Please select a dancer type'
                                );
                                return false;
                            }
                        }}
                    >
                        <p className="text-sm text-gray-500 mb-6">
                            {danceClass.description}
                        </p>

                        <fieldset className="mb-6">
                            <div className="mb-8">
                                <legend className="text-base font-medium text-gray-900">
                                    Dancer type
                                </legend>
                                <p className="text-sm text-gray-500">
                                    To ensure we've got a balance in the class
                                    please let us know what type of dancer you
                                    are.
                                </p>
                            </div>
                            <div className="flex flex-col gap-8 mb-6">
                                <div className="flex items-center hover:bg-gray-200 py-2 px-4 -my-4 -mx-4 rounded-lg">
                                    <input
                                        id="leader"
                                        name="dancerType"
                                        type="radio"
                                        value="Leader"
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                        onChange={() => setDancerType('leader')}
                                    />
                                    <label
                                        htmlFor="leader"
                                        className="ml-3 block text-sm font-medium text-gray-700 w-full"
                                    >
                                        Leader
                                    </label>
                                </div>
                                <div className="flex items-center hover:bg-gray-200 py-2 px-4 -my-4 -mx-4 rounded-lg">
                                    <input
                                        id="follower"
                                        name="dancerType"
                                        type="radio"
                                        value="Follower"
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                        onChange={() =>
                                            setDancerType('follower')
                                        }
                                    />
                                    <label
                                        htmlFor="follower"
                                        className="ml-3 block text-sm font-medium text-gray-700 w-full"
                                    >
                                        Follower
                                    </label>
                                </div>
                                <div className="flex items-center hover:bg-gray-200 py-2 px-4 -my-4 -mx-4 rounded-lg">
                                    <input
                                        id="notsure"
                                        name="dancerType"
                                        type="radio"
                                        value="Not sure"
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                        onChange={() =>
                                            setDancerType('Not sure')
                                        }
                                    />
                                    <label
                                        htmlFor="notsure"
                                        className="ml-3 block text-sm font-medium text-gray-700 w-full"
                                    >
                                        I don't know yet
                                    </label>
                                </div>

                                {dancerTypeError && (
                                    <div className="text-red-700 text-sm font-bold">
                                        {dancerTypeError}
                                    </div>
                                )}
                            </div>
                        </fieldset>

                        <div className="bg-gray-50 py-6 -mx-10 -mb-4 px-10 flex flex-row-reverse gap-3">
                            <Button
                                type="submit"
                                disabled={submitLoading}
                                className="w-32"
                            >
                                {submitLoading ? 'Please wait...' : 'Book'}
                            </Button>

                            <Button
                                type="button"
                                appearance="secondary"
                                onClick={() => closeModal()}
                                disabled={submitLoading}
                            >
                                Cancel
                            </Button>
                        </div>
                    </StripeForm>
                }
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.2 }}
                className="shadow-xl overflow-hidden md:border border-gray-300 bg-white flex-1 md:rounded-md self-start relative min-h-full md:min-h-0"
            >
                <h2 className="flex justify-between p-4 font-bold bg-gradient-to-r from-purple-600 to-purple-500 text-white border-b text-2xl">
                    {danceClass.name}
                    <button className="" onClick={onClose}>
                        <XCircleIcon className="h-9 w-9 hover:text-purple-700" />
                    </button>
                </h2>

                <div className="p-4 bg-gray-50">
                    <div className="flex gap-2 items-center">
                        <CalendarIcon className="h-4 w-4" />
                        {danceClass.date?.format('dddd, D MMMM YYYY')} at{' '}
                        {danceClass.classStartTime}
                    </div>
                    <div className="flex gap-2 items-center">
                        <LocationMarkerIcon className="h-4 w-4" />
                        <a
                            href="https://g.page/SalsaTherapy?share"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline hover:text-purple-500 flex items-center"
                        >
                            Full Swing
                            <span className="hidden md:inline">
                                , 80 Cuba Street, Te Aro, Wellington 6011
                            </span>
                            <ExternalLinkIcon className="h-4 w-4 inline-block ml-1" />
                        </a>
                    </div>
                    <div className="flex gap-2 items-center">
                        <ClockIcon className="h-4 w-4" />
                        Duration: {danceClass.duration} mins
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-bold">Description</h3>
                    <p>{danceClass.description}</p>
                </div>

                <div className="p-3 md:p-4 bg-gray-50 absolute md:static bottom-0 left-0 right-0">
                    <h3 className="text-lg font-bold">Price</h3>
                    <div className="flex justify-between items-end">
                        <div className="text-5xl">
                            {price ? <>${price}</> : <Skeleton width={16} />}
                        </div>
                        {isBooked ? (
                            <div className="text-green-600 bg-green-50 py-2 px-4 rounded-3xl text-xl border border-green-300">
                                <CheckIcon className="h-6 w-6 inline-block" />{' '}
                                You're booked for this class
                            </div>
                        ) : (
                            <>
                                {user ? (
                                    <div className="flex gap-2">
                                        <ButtonLink
                                            appearance="secondary"
                                            href="/pricing"
                                        >
                                            Book term
                                        </ButtonLink>
                                        <Button onClick={onBookClassClick}>
                                            Book class
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex gap-2">
                                        <ButtonLink
                                            appearance="secondary"
                                            href="/login"
                                        >
                                            Book term
                                        </ButtonLink>
                                        <ButtonLink href="/login">
                                            Book class
                                        </ButtonLink>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </motion.div>
        </>
    );
};
