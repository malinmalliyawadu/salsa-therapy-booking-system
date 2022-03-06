import dayjs from 'dayjs'
import { ref, getDatabase, set } from 'firebase/database'
import { useState } from 'react'
import { useClasses } from '../hooks/useClasses'
import { Button } from './Button'
import { FormElement } from './FormElement'
import { Modal } from './Modal'

interface Props {
    showAddClassModal: boolean
    setShowAddClassModal: (show: boolean) => void
    classId?: number
    initialState?: FormData
}

interface FormData {
    name?: string
    description?: string
    duration?: number
    weekday?: string
    startDate?: Date
    endDate?: Date
    maxPeople?: number
    stripeId?: string
}

export const AddClassModal: React.FC<Props> = ({
    showAddClassModal,
    setShowAddClassModal,
    classId,
    initialState = {},
}) => {
    const [formData, setFormData] = useState<FormData>(initialState)
    const [classes] = useClasses()

    const onSave = () => {
        // max class id used in add class mode
        const maxClassId = Math.max(
            ...(classes?.map((x) => Number(x.id)) || [0])
        )
        set(ref(getDatabase(), `classes/${classId || maxClassId + 1}`), {
            ...formData,
            duration: String(formData.duration),
            maxPeople: String(formData.maxPeople),
            startDate: dayjs(formData.startDate).format('YYYY-MM-DD'),
            endDate: dayjs(formData.endDate).format('YYYY-MM-DD'),
        })

        setShowAddClassModal(false)
    }

    return (
        <Modal
            show={showAddClassModal}
            onClose={() => setShowAddClassModal(false)}
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
                    />
                </div>
            }
            footerContent={
                <>
                    <Button onClick={onSave}>{`${
                        classId ? 'Update' : 'Add'
                    }`}</Button>
                    <Button
                        appearance="secondary"
                        onClick={() => setShowAddClassModal(false)}
                    >
                        Cancel
                    </Button>
                </>
            }
        />
    )
}
