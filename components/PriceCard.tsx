import { ReactNode } from "react";
import { Button } from "./Button";

interface Props {
  name: string;
  description: string;
  price: number;
  points: string[];
  callToAction: ReactNode;
  isMostPopular?: boolean;
}

interface PointProps {
  text: string;
}

const Point: React.FC<PointProps> = ({ text }) => {
  return (
    <li className="flex items-center">
      <div className=" rounded-full p-2 pl-0 fill-current text-green-700">
        <svg
          className="w-6 h-6 align-middle"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <span className="text-gray-700 text-lg ml-3">{text}</span>
    </li>
  );
};

export const PriceCard: React.FC<Props> = ({
  name,
  description,
  price,
  points,
  callToAction,
  isMostPopular = false,
}) => {
  return (
    <div
      className={`w-11/12 mx-w-sm sm:w-3/5 lg:w-1/3 sm:my-5 my-8 relative transition-all transform hover:scale-105 border border-gray-200 ${
        isMostPopular ? "rounded-b-lg" : "rounded-lg"
      } mx-2 shadow-md self-stretch`}
    >
      {isMostPopular && (
        <div className="text-sm leading-none rounded-t-lg bg-pink-500 text-white font-semibold uppercase py-4 text-center tracking-wide -mt-11">
          Offers Runs till 7th Feb
        </div>
      )}
      <div
        className={`h-full flex flex-col bg-white text-black rounded-lg border-gray-100 shadow-lg overflow-hidden ${
          isMostPopular ? "rounded-t-none  bg-pink-50" : ""
        }`}
      >
        <div className="block text-left text-sm sm:text-md max-w-sm mx-auto mt-2 text-black px-8 lg:px-6">
          <h1 className="flex items-center justify-center text-2xl font-medium uppercase p-3 pb-0 text-center tracking-wide mb-4 h-16">
            {name}
          </h1>
          <h2 className="text-6xl text-purple-500 text-center mb-8 font-bold">
            ${price}
          </h2>
          <div className="text-lg text-center text-purple-900">
            {description}
          </div>
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
