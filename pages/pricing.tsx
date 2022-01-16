import { NextPage } from "next";
import { Button } from "../components/Button";
import { PriceCard } from "../components/PriceCard";

const Pricing: NextPage = () => {
  return (
    <div className="my-6">
      <h1 className="font-bold text-6xl mb-2">Membership Options</h1>

      <div className="max-w-full mx-auto my-12">
        <div className="relative block flex flex-col md:flex-row items-end">
          <PriceCard
            name={"Casual rate"}
            description={"Book and drop-in"}
            price={20}
            point1={"1 casual class"}
            point2={"Any level or style"}
            point3={"Buy and book"}
            callToAction={"BOOK A CLASS"}
          />

          <PriceCard
            name={"Special offer 10 trip"}
            description={"Save $20 with this package"}
            price={160}
            point1={"Choose ANY style and ANY level"}
            point2={"Book ahead"}
            point3={"Valid for 2 months"}
            callToAction={"BUY NOW"}
            isMostPopular={true}
          />

          <PriceCard
            name={"10 trip pass student"}
            description={"-"}
            price={136}
            point1={"Choose ANY style and ANY level"}
            point2={"Book ahead"}
            point3={"Valid for 2 months"}
            callToAction={"BUY NOW"}
          />

          <PriceCard
            name={"Private 1-on-1"}
            description={"-"}
            price={20}
            point1={"1 casual class"}
            point2={"Any level or style"}
            point3={"Buy and book"}
            callToAction={"ENQUIRE"}
          />
        </div>

        <div className="my-10">
          <h2 className="font-bold mb-4 text-xl">Terms</h2>
          <ul className="list-disc ml-6">
            <li>
              We do not offer refunds or partial refunds for unused passes
              unless injury or serious illness occur and students will need to
              present proof medical statements.
            </li>
            <li>
              Passes can be shared once only with a partner or best friend.
            </li>
            <li>Passes and memberships exclude special events.</li>
            <li>
              We can only pause membership during lockdowns and unforeseen
              circumstances.
            </li>
            <li>
              Student ID is to be presented at the reception for student deals.
            </li>
            <li>All passes activate on the purchase date.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
