import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ref, getDatabase, set } from 'firebase/database';
import { useState } from 'react';
import { fullDateFormat } from '../constants/datetime';
import { useClasses } from '../hooks/useClasses';
import { Button } from './Button';
import { FormElement } from './FormElement';
import { Modal } from './Modal';

interface Props {
    showAddClassModal: boolean;
    setShowAddClassModal: (show: boolean) => void;
    classId?: number;
    initialState?: FormData;
}

interface FormData {
    name?: string;
    description?: string;
    duration?: number;
    weekday?: string;
    classStartTime?: string;
    startDate?: Date;
    endDate?: Date;
    maxPeople?: number;
    stripeId?: string;
}

export const AddClassModal: React.FC<Props> = ({
    showAddClassModal,
    setShowAddClassModal,
    classId,
    initialState = {},
}) => {
    dayjs.extend(customParseFormat);
    const [formData, setFormData] = useState<FormData>(initialState);
    const [classes] = useClasses();
    const [classStartTimeError, setClassStartTimeError] = useState<string>();
    const [stripeIdError, setStripeIdError] = useState<string>();
    const [saving, setSaving] = useState<boolean>();

    const onClose = () => {
        setClassStartTimeError(undefined);
        setStripeIdError(undefined);
        setShowAddClassModal(false);
        setSaving(false);
    };

    const validate = async () => {
        const date = dayjs(`${formData.classStartTime}`, 'h.mma', true);
        const price = await fetch(
            `https://us-central1-salsa-therapy-booking-system.cloudfunctions.net/app/price/${formData.stripeId}`
        )
            .then((res) => res.json())
            .then((x) => x?.unit_amount)
            .catch((x) => undefined);

        if (!date.isValid()) {
            setClassStartTimeError(
                'Please enter a class start time in the correct format, ie. 7.20pm, 8.00pm'
            );
        } else if (!price) {
            setStripeIdError('Could not find a price with this id');
        } else {
            return false;
        }

        return true;
    };

    const onSave = async () => {
        setSaving(true);
        const errors = await validate();
        if (errors) {
            setSaving(false);
            return;
        }

        setClassStartTimeError(undefined);

        // max class id used in add class mode
        const maxClassId = Math.max(
            ...(classes?.map((x) => Number(x.id)) || [0])
        );
        set(ref(getDatabase(), `classes/${classId || maxClassId + 1}`), {
            ...formData,
            duration: String(formData.duration),
            maxPeople: String(formData.maxPeople),
            startDate: dayjs(formData.startDate).format('YYYY-MM-DD'),
            endDate: dayjs(formData.endDate).format('YYYY-MM-DD'),
        });

        onClose();
    };

    return (
        <Modal
            show={showAddClassModal}
            onClose={onClose}
            title={`${classId ? 'Edit' : 'Add'} class`}
            bodyContent={
                <div>
                    <FormElement
                        name="name"
                        label="Name"
                        setValue={(val) =>
                            setFormData({ ...formData, name: val })
                        }
                        value={formData.name}
                    />
                    <FormElement
                        name="description"
                        label="Description"
                        type="textarea"
                        setValue={(val) =>
                            setFormData({ ...formData, description: val })
                        }
                        value={formData.description}
                    />
                    <FormElement
                        name="duration"
                        label="Duration"
                        type="number"
                        setValue={(val) =>
                            setFormData({ ...formData, duration: Number(val) })
                        }
                        value={String(formData.duration)}
                    />
                    <FormElement
                        name="weekday"
                        label="Weekday"
                        type="weekday"
                        setValue={(val) =>
                            setFormData({ ...formData, weekday: val })
                        }
                        value={formData.weekday}
                    />
                    <FormElement
                        name="classStartTime"
                        label="Start Time"
                        setValue={(val) =>
                            setFormData({ ...formData, classStartTime: val })
                        }
                        value={formData.classStartTime}
                        placeholder="7.20pm"
                        error={classStartTimeError}
                    />
                    <FormElement
                        name="startDate"
                        label="Start Date"
                        type="calendar"
                        setValue={(val) =>
                            setFormData({
                                ...formData,
                                startDate: new Date(val),
                            })
                        }
                        value={dayjs(formData.startDate).format('YYYY-MM-DD')}
                    />
                    <FormElement
                        name="endDate"
                        label="End Date"
                        type="calendar"
                        setValue={(val) =>
                            setFormData({ ...formData, endDate: new Date(val) })
                        }
                        value={dayjs(formData.endDate).format('YYYY-MM-DD')}
                    />
                    <FormElement
                        name="maxPeople"
                        label="Max People"
                        type="number"
                        setValue={(val) =>
                            setFormData({ ...formData, maxPeople: Number(val) })
                        }
                        value={String(formData.maxPeople)}
                    />
                    <FormElement
                        name="stripeId"
                        label="Stripe Id"
                        setValue={(val) =>
                            setFormData({ ...formData, stripeId: val })
                        }
                        value={formData.stripeId}
                        error={stripeIdError}
                    />
                </div>
            }
            footerContent={
                <>
                    <Button disabled={saving} onClick={onSave}>{`${
                        saving ? 'Please wait...' : classId ? 'Update' : 'Add'
                    }`}</Button>
                    <Button
                        disabled={saving}
                        appearance="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                </>
            }
        />
    );
};
