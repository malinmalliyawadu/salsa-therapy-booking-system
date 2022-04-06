import { ref, getDatabase } from '@firebase/database';
import { useState, useEffect } from 'react';
import { useList } from 'react-firebase-hooks/database';

export const useAdmins = (): [
    string[] | undefined,
    boolean,
    boolean,
    Error | undefined
] => {
    const [snapshots, loading, error] = useList(ref(getDatabase(), 'admins'));
    const [adminIds, setAdminIds] = useState<string[]>();
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        if (snapshots && !loading) {
            setAdminIds(
                snapshots.map((x) => {
                    return x.key || '';
                })
            );
        }
    }, [snapshots]);

    useEffect(() => {
        if (snapshots && adminIds) {
            setHasLoaded(true);
        }
    }, [adminIds]);

    return [adminIds, loading, hasLoaded, error];
};
