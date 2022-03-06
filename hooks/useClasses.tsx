import { ref, getDatabase } from '@firebase/database'
import { useEffect, useState } from 'react'
import { useList } from 'react-firebase-hooks/database'
import { DanceClass } from '../types/DanceClass'

export const useClasses = (): [
    DanceClass[] | undefined,
    boolean,
    Error | undefined
] => {
    const [snapshots, loading, error] = useList(ref(getDatabase(), 'classes'))
    const [danceClasses, setDanceClasses] = useState<DanceClass[]>()

    useEffect(() => {
        if (snapshots) {
            const classes = snapshots.map((x) => {
                const rawData = x.val()

                return {
                    ...rawData,
                    id: x.key,
                    startDate: new Date(rawData.startDate),
                    endDate: new Date(rawData.endDate),
                } as DanceClass
            })

            setDanceClasses(classes)
        }
    }, [snapshots])

    return [danceClasses, loading, error]
}
