import { getAuth, User } from 'firebase/auth';
import { NextPage } from 'next';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button } from '../components/Button';
import { ButtonLink } from '../components/ButtonLink';
import { PriceCard } from '../components/PriceCard';
import { StripeForm } from '../components/StripeForm';
import {
    CasualClass,
    CasualClassStudent,
    DameDos,
    DameDosStudent,
    DameTres,
    DameUna,
    DameUnaStudent,
    DileQueSi,
    FiveTripPass,
    FiveTripPassStudent,
} from '../constants/stripePriceIds';
import { MainSiteUrl } from '../constants/urls';

const StripeCallToAction: React.FC<{
    priceId: string;
    user: User | null | undefined;
    submitLoading: boolean;
    setSubmitLoading: (value: boolean) => void;
}> = ({ priceId, user, submitLoading, setSubmitLoading }) => {
    return (
        <>
            {user ? (
                <StripeForm
                    priceId={priceId}
                    onSubmit={() => {
                        setSubmitLoading(true);
                    }}
                >
                    <Button
                        type="submit"
                        disabled={submitLoading}
                        className="w-full"
                    >
                        {submitLoading ? 'PLEASE WAIT...' : 'BUY NOW'}
                    </Button>
                </StripeForm>
            ) : (
                <ButtonLink href="/login" className="block">
                    BUY NOW
                </ButtonLink>
            )}
        </>
    );
};

const Pricing: NextPage = () => {

    return (
        <div className="m-6">
          <h1>Please see pricing on Salsa Therapy's <a href="https://www.salsatherapy.co.nz/pricing">main site</a></h1>
        </div>
    );
};

export default Pricing;
