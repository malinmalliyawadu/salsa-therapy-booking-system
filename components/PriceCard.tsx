import { useState, useEffect } from 'react';
import { CheckIcon } from '@heroicons/react/outline';
import { ReactNode } from 'react';
import { Button } from './Button';
import { Skeleton } from './Skeleton';

interface Props {
    name: string;
    noDescription?: boolean;
    description?: string;
    priceId: string;
    points: string[];
    callToAction: ReactNode;
    isMostPopular?: boolean;
    headerBg?: string;
}

interface PointProps {
    text: string;
}

const Point: React.FC<PointProps> = ({ text }) => {
    return (
        <li className="flex mb-2">
            <div className="pt-0.5 pr-2 rounded-full fill-current text-green-700">
                <CheckIcon className="w-6 h-6" />
            </div>
            <span className="text-gray-700 text-lg ml-2 self-center leading-tight">
                {text}
            </span>
        </li>
    );
};

export const PriceCard: React.FC<Props> = ({
    name,
    noDescription,
    description,
    points,
    priceId,
    callToAction,
    isMostPopular = false,
    headerBg = 'transparent',
}) => {
    const [price, setPrice] = useState<number>();

    useEffect(() => {
        fetch(
            `https://us-central1-salsa-therapy-booking-system.cloudfunctions.net/app/price/${priceId}`
        )
            .then((res) => res.json())
            .then((x) => setPrice(x.unit_amount / 100));
    }, [priceId]);

    return (
        <div
            className={`my-8 relative transition-all transform hover:scale-105 border border-gray-200 ${
                isMostPopular ? 'rounded-b-lg' : 'rounded-lg'
            } mx-2 shadow-md self-stretch`}
        >
            {isMostPopular && (
                <div className="text-sm leading-none rounded-t-lg bg-pink-500 text-white font-semibold uppercase py-4 text-center tracking-wide -mt-11">
                    Most popular!
                </div>
            )}
            <div
                className={`h-full flex flex-col bg-white text-black rounded-lg border-gray-100 shadow-lg overflow-hidden ${
                    isMostPopular ? 'rounded-t-none  bg-pink-50' : ''
                }`}
            >
                <div className="block text-left text-sm sm:text-md max-w-sm mx-auto mt-2 text-black px-8 lg:px-6">
                    <h1
                        className={`rounded flex items-center justify-center text-2xl font-medium uppercase m-2 p-1 px-6 text-center tracking-wide mb-4 h-16 ${headerBg}`}
                    >
                        {name}
                    </h1>
                    <h2 className="text-6xl text-purple-500 text-center font-bold">
                        {price ? <>${price}</> : <Skeleton />}
                    </h2>
                    {(description || !noDescription) && (
                        <div className="text-lg text-center text-purple-900 my-4 bg-purple-50 rounded-3xl">
                            {description ||
                                (price && `$${price / 10} per week`)}
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap mt-3 px-6 flex-grow">
                    <ul>
                        {points.map((x) => (
                            <Point text={x} key={x} />
                        ))}
                    </ul>
                </div>

                <div className="text-center p-8">{callToAction}</div>
            </div>
        </div>
    );
};
