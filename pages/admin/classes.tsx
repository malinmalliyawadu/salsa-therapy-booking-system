import { getDatabase } from '@firebase/database';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/outline';
import dayjs from 'dayjs';
import { getAuth } from 'firebase/auth';
import { ref, remove } from 'firebase/database';
import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AddClassModal } from '../../components/AddClassModal';
import { Button } from '../../components/Button';
import { Loading } from '../../components/Loading';
import { Modal } from '../../components/Modal';
import { useAdmins } from '../../hooks/useAdmins';
import { useClasses } from '../../hooks/useClasses';

const TH: React.FC = ({ children }) => (
    <th className="align-bottom py-3 px-6 text-xs font-medium text-left text-white uppercase">
        {children}
    </th>
);

const TD: React.FC<{ className?: string }> = ({ children, className }) => (
    <td
        className={`py-4 px-6 text-sm font-medium text-gray-900 align-top ${className}`}
    >
        {children}
    </td>
);

const Classes: NextPage = () => {
    const [classes, loading] = useClasses();
    const [showAddClassModal, setShowAddClassModal] = useState(false);
    const [editClassModalClassId, setEditClassModalClassId] =
        useState<number>();
    const [deleteClassModalClassId, setDeleteClassModalClassId] =
        useState<number>();
    const [user, userLoading, userError] = useAuthState(getAuth());
    const [adminIds, adminIdsLoading, adminIdsHasLoaded, adminIdsError] =
        useAdmins();
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState<boolean>();

    useEffect(() => {
        if (!userLoading && !adminIdsLoading) {
            // not logged in user
            if (!user) {
                setIsAdmin(false);
            }
            // logged in
            else {
                if (adminIdsHasLoaded) {
                    setIsAdmin(adminIds?.some((x) => x === user?.uid));
                }
            }
        }
    }, [adminIds, user, userLoading, adminIdsLoading, adminIdsHasLoaded]);

    if (process.browser && isAdmin === false) {
        router.push('/');
    }

    const onAddClassModal = () => {
        setShowAddClassModal(true);
    };

    const onDelete = () => {
        remove(ref(getDatabase(), `classes/${deleteClassModalClassId}`));
    };

    return (
        <div className="m-6">
            <AddClassModal
                showAddClassModal={showAddClassModal}
                setShowAddClassModal={setShowAddClassModal}
            />
            <div className="float-right">
                <Button onClick={onAddClassModal}>
                    <PlusIcon className="h-4 w-4 inline-block" /> Add class
                </Button>
            </div>
            <h1 className="font-bold text-black text-7xl mb-8 tracking-tighter">
                Manage Classes
            </h1>

            <div className="flex flex-col">
                <div className="overflow-x-auto shadow-xl sm:rounded-xl">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden ">
                            <table className="min-w-full divide-y divide-gray-200 table-fixed">
                                <thead className="bg-gradient-to-r from-gray-500 via-gray-700 to-gray-800">
                                    <tr>
                                        <TH>Name</TH>
                                        <TH>Description</TH>
                                        <TH>Duration</TH>
                                        <TH>Weekday</TH>
                                        <TH>Start Time</TH>
                                        <TH>Start Date</TH>
                                        <TH>End Date</TH>
                                        <TH>Max People</TH>
                                        <TH>Actions</TH>
                                    </tr>
                                </thead>

                                {isAdmin && (classes?.length || 0) > 0 && (
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {classes?.map((x) => (
                                            <tr className="hover:bg-gray-100">
                                                <TD>{x.name}</TD>
                                                <TD>{x.description}</TD>
                                                <TD>{x.duration}</TD>
                                                <TD>{x.weekday}</TD>
                                                <TD>{x.classStartTime}</TD>
                                                <TD>
                                                    {dayjs(x.startDate).format(
                                                        'D MMMM YYYY'
                                                    )}
                                                </TD>
                                                <TD>
                                                    {dayjs(x.endDate).format(
                                                        'D MMMM YYYY'
                                                    )}
                                                </TD>
                                                <TD>{x.maxPeople}</TD>
                                                <TD className="flex gap-2">
                                                    <AddClassModal
                                                        setShowAddClassModal={(
                                                            show
                                                        ) =>
                                                            setEditClassModalClassId(
                                                                show
                                                                    ? Number(
                                                                          x.id
                                                                      )
                                                                    : undefined
                                                            )
                                                        }
                                                        showAddClassModal={
                                                            editClassModalClassId ===
                                                            Number(x.id)
                                                        }
                                                        classId={Number(x.id)}
                                                        initialState={{
                                                            ...x,
                                                            duration: Number(
                                                                x.duration
                                                            ),
                                                        }}
                                                    />
                                                    <Button
                                                        onClick={() =>
                                                            setEditClassModalClassId(
                                                                Number(x.id)
                                                            )
                                                        }
                                                    >
                                                        <PencilIcon className="w-4 h-4 inline-block" />{' '}
                                                        Edit
                                                    </Button>

                                                    <Modal
                                                        onClose={() =>
                                                            setDeleteClassModalClassId(
                                                                undefined
                                                            )
                                                        }
                                                        show={
                                                            deleteClassModalClassId ===
                                                            Number(x.id)
                                                        }
                                                        title="Are you sure you want to delete this class?"
                                                        bodyContent={`${x.name}`}
                                                        footerContent={
                                                            <>
                                                                <Button
                                                                    onClick={
                                                                        onDelete
                                                                    }
                                                                >
                                                                    Delete
                                                                </Button>
                                                                <Button
                                                                    appearance="secondary"
                                                                    onClick={() =>
                                                                        setDeleteClassModalClassId(
                                                                            undefined
                                                                        )
                                                                    }
                                                                >
                                                                    Cancel
                                                                </Button>
                                                            </>
                                                        }
                                                    />
                                                    <Button
                                                        onClick={() =>
                                                            setDeleteClassModalClassId(
                                                                Number(x.id)
                                                            )
                                                        }
                                                    >
                                                        <TrashIcon className="w-4 h-4 inline-block" />{' '}
                                                        Delete
                                                    </Button>
                                                </TD>
                                            </tr>
                                        ))}
                                    </tbody>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {isAdmin === undefined && (
                <div className="flex flex-col justify-center w-full max-w-md p-16 m-auto">
                    <Loading />
                </div>
            )}
        </div>
    );
};

export default Classes;
