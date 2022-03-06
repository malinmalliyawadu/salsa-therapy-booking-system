import {
    CalendarIcon,
    LocationMarkerIcon,
    ExternalLinkIcon,
    UserGroupIcon,
    XCircleIcon,
    CheckIcon,
} from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import { DanceClass } from '../types/DanceClass'
import { Button } from './Button'
import { motion } from 'framer-motion'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { ButtonLink } from './ButtonLink'
import { Modal } from './Modal'
import { useBookings } from '../hooks/useBookings'
import { StripeForm } from './StripeForm'

interface ClassDescriptionProps {
    danceClass: DanceClass
    onClose: () => void
}

export const ClassDescription: React.FC<ClassDescriptionProps> = ({
    danceClass,
    onClose,
}) => {
    const [user, userLoading, userError] = useAuthState(getAuth())
    const [showBookModal, setShowBookModal] = useState(false)
    const [bookings, bookingsLoading, bookingsError] = useBookings()
    const isBooked = bookings?.some((y) => y.classId == danceClass.id)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [price, setPrice] = useState<number>()

    const onBookClassClick = () => {
        setShowBookModal(true)
    }

    useEffect(() => {
        fetch(
            `https://us-central1-salsa-therapy-booking-system.cloudfunctions.net/app/price/${danceClass.stripeId}`
        )
            .then((res) => res.json())
            .then((x) => setPrice(x.unit_amount / 100))
    }, [danceClass.id])

    return (
        <>
            <Modal
                show={showBookModal}
                onClose={() => setShowBookModal(false)}
                title={<>Book {danceClass.name}</>}
                bodyContent={
                    <>
                        <p className="text-sm text-gray-500 mb-6">
                            {danceClass.description}
                        </p>

                        <fieldset className="mb-6">
                            <div>
                                <legend className="text-base font-medium text-gray-900">
                                    Dancer type
                                </legend>
                                <p className="text-sm text-gray-500">
                                    To ensure we've got a balance in the class
                                    please let us know what type of dancer you
                                    are.
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
                    </>
                }
                footerContent={
                    <>
                        <StripeForm
                            productId={danceClass.stripeId ?? ''}
                            onSubmit={() => {
                                setSubmitLoading(true)
                            }}
                        >
                            <Button
                                type="submit"
                                disabled={submitLoading}
                                className="w-32"
                            >
                                {submitLoading ? 'Please wait...' : 'Book'}
                            </Button>
                        </StripeForm>

                        <Button
                            appearance="secondary"
                            onClick={() => setShowBookModal(false)}
                            disabled={submitLoading}
                        >
                            Cancel
                        </Button>
                    </>
                }
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.2 }}
                className="shadow-xl overflow-hidden border border-gray-300 bg-white flex-1 rounded-md self-start"
            >
                <h2 className="flex justify-between p-4 font-bold bg-gradient-to-r from-purple-600 to-purple-500 text-white border-b text-2xl">
                    {danceClass.name}
                    <button className="" onClick={onClose}>
                        <XCircleIcon className="h-9 w-9 hover:text-gray-400" />
                    </button>
                </h2>

                <div className="p-4 bg-gray-50">
                    <div className="flex gap-2 items-center">
                        <CalendarIcon className="h-4 w-4" />
                        {danceClass.weekday} {danceClass.classStartTime} -{' '}
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
                            Full Swing, 80 Cuba Street, Te Aro, Wellington 6011
                            <ExternalLinkIcon className="h-4 w-4 inline-block ml-1" />
                        </a>
                    </div>
                    <div className="flex gap-2 items-center">
                        <UserGroupIcon className="h-4 w-4" />
                        {danceClass.maxPeople} spaces available
                    </div>
                </div>
                <div className="p-4 ">
                    <h3 className="text-lg font-bold">Description</h3>
                    <p>{danceClass.description}</p>
                </div>

                <div className="p-4 bg-gray-50">
                    <h3 className="text-lg font-bold">Price</h3>
                    <div className="flex justify-between items-end">
                        <div className="text-5xl">${price}</div>
                        {isBooked ? (
                            <div className="text-green-600 bg-green-50 py-2 px-4 rounded-3xl text-xl border border-green-300">
                                <CheckIcon className="h-6 w-6 inline-block" />{' '}
                                You're booked for this class
                            </div>
                        ) : (
                            <>
                                {user ? (
                                    <Button onClick={onBookClassClick}>
                                        Book class
                                    </Button>
                                ) : (
                                    <ButtonLink href="/login">
                                        Book class
                                    </ButtonLink>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </motion.div>
        </>
    )
}
