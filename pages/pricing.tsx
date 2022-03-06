import { getAuth, User } from 'firebase/auth';
import { NextPage } from 'next';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button } from '../components/Button';
import { ButtonLink } from '../components/ButtonLink';
import { PriceCard } from '../components/PriceCard';
import { StripeForm } from '../components/StripeForm';
import {
    CasualClassStudent,
    DameDos,
    DameDosStudent,
    DameTres,
    DameUna,
    DileQueSi,
    FiveTripPass,
    TenTripPass,
    TenTripPassStudent,
} from '../constants/stripePriceIds';

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
                        description={'$18 per week'}
                        price={180}
                        headerBg="bg-green-300"
                        points={[
                            'One class per week',
                            'Any style and level',
                            'Includes 2 FREE Salsa Practica passes',
                            'Contact for student discount!',
                            'Valid for 10 weeks!',
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
                        description={'$27.5 per week'}
                        price={275}
                        headerBg="bg-blue-300"
                        points={[
                            'Two classes per week',
                            'Any classes, style and level',
                            '1 FREE Salsa Practica passes',
                            'Valid for 10 weeks!',
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
                        name={'Dáme Tres'}
                        description={'$32.5 per week'}
                        price={325}
                        headerBg="bg-yellow-300"
                        points={[
                            'Three classes per week',
                            'Any classes, style and level',
                            '1 FREE Salsa Practica passes',
                            '$10 off Private lessons',
                            'Valid for 10 weeks!',
                        ]}
                        callToAction={
                            <StripeCallToAction
                                priceId={DameTres}
                                user={user}
                                submitLoading={submitLoading}
                                setSubmitLoading={setSubmitLoading}
                            />
                        }
                        isMostPopular={true}
                    />

                    <PriceCard
                        name={'Díle Que Si'}
                        description={'$37.5 per week'}
                        price={375}
                        headerBg="bg-red-300"
                        points={[
                            'UNLIMITED classes in a term',
                            'Any classes, styles and levels',
                            '$10 off Private lessons',
                            '10% OFF Performance training',
                            '2 FREE practice passes',
                            'Valid for 10 weeks!',
                        ]}
                        callToAction={
                            <StripeCallToAction
                                priceId={DileQueSi}
                                user={user}
                                submitLoading={submitLoading}
                                setSubmitLoading={setSubmitLoading}
                            />
                        }
                    />
                </div>

                <h2 className="font-bold text-4xl mb-2 tracking-tight">
                    Casual pricing
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <PriceCard
                        name={'Single class'}
                        price={20}
                        points={[
                            '1 casual class',
                            'Any level or style',
                            'Buy and book',
                        ]}
                        callToAction={
                            <ButtonLink href="/" className="block">
                                BOOK A CLASS
                            </ButtonLink>
                        }
                    />

                    <PriceCard
                        name={'5 Trip Pass'}
                        price={90}
                        points={[
                            'Choose any style and any level',
                            'Valid for 3 months from date of purchase',
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
                        name={'10 Trip Pass'}
                        price={138}
                        points={[
                            'Choose any style and any level',
                            'Valid for 3 months from date of purchase',
                        ]}
                        callToAction={
                            <StripeCallToAction
                                priceId={TenTripPass}
                                user={user}
                                submitLoading={submitLoading}
                                setSubmitLoading={setSubmitLoading}
                            />
                        }
                    />

                    <PriceCard
                        name={'Private classes'}
                        price={45}
                        points={[
                            '1 Student w/ 1 Teacher for $45 (per 30mins)',
                            '2 Students w/ 1 Teacher for $45 (per 30mins)',
                            '2 Couples w/ 1 Teacher for $100 ($25 each)',
                            'For x2 Teachers, add $45 per 30mins',
                            'Studio hire... FREE',
                        ]}
                        callToAction={
                            <ButtonLink
                                href="mailto:lily@salsatherapy.co.nz"
                                className="block"
                            >
                                ENQUIRE
                            </ButtonLink>
                        }
                    />
                </div>

                <h2 className="font-bold text-4xl mb-2 tracking-tight">
                    Student pricing
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <PriceCard
                        name={'Single class'}
                        description={'Student special'}
                        price={15}
                        points={[
                            'Choose any style and any level',
                            'Great Flexibility',
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

                    <PriceCard
                        name={'10 Trip pass'}
                        description={'Student Special'}
                        price={138}
                        points={[
                            'Choose any style and any level',
                            'Valid for 3 months from date of purchase',
                        ]}
                        callToAction={
                            <StripeCallToAction
                                priceId={TenTripPassStudent}
                                user={user}
                                submitLoading={submitLoading}
                                setSubmitLoading={setSubmitLoading}
                            />
                        }
                    />

                    <PriceCard
                        name={'Dáme Dos'}
                        description={'Student Special'}
                        price={160}
                        points={[
                            'Two classes per week',
                            'Any classes, style and level',
                            '1 FREE Salsa Practica passes',
                            'Valid for 10 weeks!',
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
                </div>

                <div className="my-10 mx-6">
                    <h2 className="font-bold mb-4 text-xl">Terms</h2>
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
