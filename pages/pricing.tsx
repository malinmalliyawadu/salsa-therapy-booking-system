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
    const [submitLoading, setSubmitLoading] = useState(false);
    const [user, userLoading, userError] = useAuthState(getAuth());

    return (
        <div className="m-6">
            <h1 className="font-bold text-black text-7xl mb-8 tracking-tighter text-center">
                Pricing and packages
            </h1>

            <div className="max-w-full mx-auto my-12">
                <h2 className="font-bold text-4xl mb-2 tracking-tight">
                    Term packages
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <PriceCard
                        name={'Dáme Una'}
                        priceId={DameUna}
                        headerBg="bg-green-300"
                        points={[
                            'One class per week',
                            'Any style and level',
                            'Valid for 4 months from purchase date',
                            'Ten class package',
                            'Check term dates before purchasing',
                        ]}
                        callToAction={
                            <StripeCallToAction
                                priceId={DameUna}
                                user={user}
                                submitLoading={submitLoading}
                                setSubmitLoading={setSubmitLoading}
                            />
                        }
                    />

                    <PriceCard
                        name={'Dáme Dos'}
                        priceId={DameDos}
                        headerBg="bg-blue-300"
                        isMostPopular={true}
                        points={[
                            'Two classes per week',
                            'Any classes, style and level',
                            'Valid for 4 months from purchase date',
                            'Ten class package',
                            'Check term dates before purchasing',
                        ]}
                        callToAction={
                            <StripeCallToAction
                                priceId={DameDos}
                                user={user}
                                submitLoading={submitLoading}
                                setSubmitLoading={setSubmitLoading}
                            />
                        }
                    />

                    <PriceCard
                        name={'5 Trip Pass'}
                        noDescription
                        priceId={FiveTripPass}
                        points={[
                            'Choose any style and any level',
                            'Valid for 4 months from purchase date',
                            'Five class package',
                        ]}
                        callToAction={
                            <StripeCallToAction
                                priceId={FiveTripPass}
                                user={user}
                                submitLoading={submitLoading}
                                setSubmitLoading={setSubmitLoading}
                            />
                        }
                    />
                    <PriceCard
                        name={'Casual class'}
                        priceId={CasualClass}
                        noDescription
                        points={[
                            '1 casual class',
                            'Any level or style',
                            'Buy and book',
                            '24 hour cancellation policy for full refund',
                        ]}
                        callToAction={
                            <ButtonLink href="/" className="block">
                                BOOK A CLASS
                            </ButtonLink>
                        }
                    />
                </div>

                <h2 className="font-bold text-4xl mb-2 tracking-tight">
                    Student pricing
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <PriceCard
                        name={'Dáme Una'}
                        description={'Student Special'}
                        headerBg="bg-green-300"
                        priceId={DameUnaStudent}
                        points={[
                            'One class per week',
                            'Any style and level',
                            'Valid for 4 months from purchase date',
                            'Ten class package',
                            'Check term dates before purchasing',
                            'With valid Student ID',
                        ]}
                        callToAction={
                            <StripeCallToAction
                                priceId={DameUnaStudent}
                                user={user}
                                submitLoading={submitLoading}
                                setSubmitLoading={setSubmitLoading}
                            />
                        }
                    />

                    <PriceCard
                        name={'Dáme Dos'}
                        description={'Student Special'}
                        priceId={DameDosStudent}
                        headerBg="bg-blue-300"
                        points={[
                            'Two classes per week',
                            'Any classes, style and level',
                            'Valid for 4 months from purchase date',
                            'Ten class package',
                            'Check term dates before purchasing',
                            'With valid Student ID',
                        ]}
                        callToAction={
                            <StripeCallToAction
                                priceId={DameDosStudent}
                                user={user}
                                submitLoading={submitLoading}
                                setSubmitLoading={setSubmitLoading}
                            />
                        }
                    />

                    <PriceCard
                        name={'5 Trip pass'}
                        description={'Student Special'}
                        priceId={FiveTripPassStudent}
                        points={[
                            'Choose any style and any level',
                            'Valid for 4 months from purchase date',
                            'Five class package',
                            'With valid Student ID',
                        ]}
                        callToAction={
                            <StripeCallToAction
                                priceId={FiveTripPassStudent}
                                user={user}
                                submitLoading={submitLoading}
                                setSubmitLoading={setSubmitLoading}
                            />
                        }
                    />
                    <PriceCard
                        name={'Casual class'}
                        description={'Student special'}
                        priceId={CasualClassStudent}
                        points={[
                            '1 casual class',
                            'Any level or style',
                            'Buy and book',
                            '24 hour cancellation policy for full refund',
                            'With valid Student ID',
                        ]}
                        callToAction={
                            <StripeCallToAction
                                priceId={CasualClassStudent}
                                user={user}
                                submitLoading={submitLoading}
                                setSubmitLoading={setSubmitLoading}
                            />
                        }
                    />
                </div>

                <div className="flex flex-col items-center">
                    <h2 className="font-bold text-4xl m-4 tracking-tight">
                        Can't find the term package that you're after?
                    </h2>
                    <ButtonLink
                        href={`${MainSiteUrl}contact`}
                        className="block m-4 "
                    >
                        Contact us for more package deals
                    </ButtonLink>
                </div>

                <div className="my-10 mx-6">
                    <h2 className="font-bold mb-4 text-xl">
                        Terms and conditions
                    </h2>
                    <ul className="list-disc ml-6">
                        <li>
                            We do not offer refunds or partial refunds for
                            unused passes unless injury or serious illness occur
                            and students will need to present proof medical
                            statements.
                        </li>
                        <li>
                            Passes can be shared once only with a partner or
                            best friend.
                        </li>
                        <li>Passes and memberships exclude special events.</li>
                        <li>
                            We can only pause membership during lockdowns and
                            unforeseen circumstances.
                        </li>
                        <li>
                            Student ID is to be presented at the reception for
                            student deals.
                        </li>
                        <li>All passes activate on the purchase date.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
