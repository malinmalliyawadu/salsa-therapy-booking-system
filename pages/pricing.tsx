import { NextPage } from "next";
import { Button } from "../components/Button";
import { PriceCard } from "../components/PriceCard";

const Pricing: NextPage = () => {
  return (
    <div className="my-6">
      <h1 className="font-bold text-6xl mb-2">Membership Options</h1>

      <div className="max-w-full mx-auto my-12">
        <div className="relative block flex flex-col md:flex-row items-center">
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
            description={"Book and drop-in"}
            price={136}
            point1={"Choose ANY style and ANY level"}
            point2={"Book ahead"}
            point3={"Valid for 2 months"}
            callToAction={"BOOK A CLASS"}
          />

          <PriceCard
            name={"Private 1-on-1"}
            description={""}
            price={20}
            point1={"1 casual class"}
            point2={"Any level or style"}
            point3={"Buy and book"}
            callToAction={"ENQUIRE"}
          />
        </div>
      </div>
    </div>
  );
};

export default Pricing;
