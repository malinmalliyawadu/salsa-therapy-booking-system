import { getAuth } from 'firebase/auth';
import { ReactNode } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

interface Props {
    onSubmit: () => void;
    productId: string;
    children: ReactNode;
}
export const StripeForm: React.FC<Props> = ({
    onSubmit,
    productId,
    children,
}) => {
    const [user, userLoading, userError] = useAuthState(getAuth());

    return (
        <form
            className="flex gap-5 flex-col min-w-max"
            method="POST"
            action="https://us-central1-salsa-therapy-booking-system.cloudfunctions.net/app/create-checkout-session"
            onSubmit={onSubmit}
        >
            <input name="productId" type="hidden" value={productId} />
            <input name="email" type="hidden" value={user?.email ?? ''} />
            {children}
        </form>
    );
};
