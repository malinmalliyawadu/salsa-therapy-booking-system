import { Button } from "./Button";

interface Props {
  name: string;
  description: string;
  price: number;
  point1: string;
  point2: string;
  point3: string;
  callToAction: string;
  isMostPopular?: boolean;
}

export const PriceCard: React.FC<Props> = ({
  name,
  description,
  price,
  point1,
  point2,
  point3,
  callToAction,
  isMostPopular = false,
}) => {
  return (
    <div className={`w-11/12 mx-w-sm sm:w-3/5 lg:w-1/3 sm:my-5 my-8 relative`}>
      <div className="flex flex-col bg-white text-black rounded-lg border-t border-gray-100 shadow-lg overflow-hidden">
        <div className="block text-left text-sm sm:text-md max-w-sm mx-auto mt-2 text-black px-8 lg:px-6">
          <h1 className="flex items-center justify-center text-2xl font-medium uppercase p-3 pb-0 text-center tracking-wide mb-4 h-24">
            {name}
          </h1>
          <h2 className="text-6xl text-gray-500 text-center pb-6">${price}</h2>
          <div className="text-lg text-center">{description}</div>
        </div>

        <div className="flex flex-wrap mt-3 px-6 flex-grow">
          <ul>
            <li className="flex items-center">
              <div className=" rounded-full p-2 fill-current text-green-700">
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
              <span className="text-gray-700 text-lg ml-3">{point1}</span>
            </li>
            <li className="flex items-center">
              <div className=" rounded-full p-2 fill-current text-green-700">
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
              <span className="text-gray-700 text-lg ml-3">{point2}</span>
            </li>
            <li className="flex items-center">
              <div className=" rounded-full p-2 fill-current text-green-700">
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
              <span className="text-gray-700 text-lg ml-3">{point3}</span>
            </li>
          </ul>
        </div>

        <div className="text-center p-8">
          <Button className="w-full">{callToAction}</Button>
        </div>
      </div>
    </div>
  );
};
