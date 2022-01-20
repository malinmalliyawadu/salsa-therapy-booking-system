import { getAuth } from "firebase/auth";
import { NextPage } from "next";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "../components/Button";
import { ButtonLink } from "../components/ButtonLink";
import { PriceCard } from "../components/PriceCard";
import { StripeForm } from "../components/StripeForm";
import {
  SpecialOfferTenTrip,
  TenTripStudentPass,
} from "../constants/stripeProductIds";

const Pricing: NextPage = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [user, userLoading, userError] = useAuthState(getAuth());

  return (
    <div className="m-6">
      <h1 className="font-bold text-6xl mb-2 tracking-tight">
        Membership Options
      </h1>

      <div className="max-w-full mx-auto my-12">
        <div className="relative block flex flex-col md:flex-row items-start">
          <PriceCard
            name={"Casual rate"}
            description={"Book and drop-in"}
            price={20}
            points={["1 casual class", "Any level or style", "Buy and book"]}
            callToAction={
              <ButtonLink href="/" className="block">
                BOOK A CLASS
              </ButtonLink>
            }
          />

          <PriceCard
            name={"Special offer 10 trip"}
            description={"Save $20 with this package"}
            price={160}
            points={[
              "Choose ANY style and ANY level",
              "Book ahead",
              "Valid for 2 months",
            ]}
            callToAction={
              <>
                {user ? (
                  <StripeForm
                    productId={SpecialOfferTenTrip}
                    onSubmit={() => {
                      setSubmitLoading(true);
                    }}
                  >
                    <Button
                      type="submit"
                      disabled={submitLoading}
                      className="w-full"
                    >
                      {submitLoading ? "PLEASE WAIT..." : "BUY NOW"}
                    </Button>
                  </StripeForm>
                ) : (
                  <ButtonLink href="/login" className="block">
                    BUY NOW
                  </ButtonLink>
                )}
              </>
            }
            isMostPopular={true}
          />

          <PriceCard
            name={"10 trip student pass"}
            description={"-"}
            price={136}
            points={[
              "Choose ANY style and ANY level",
              "Book ahead",
              "Valid for 2 months",
            ]}
            callToAction={
              <>
                {user ? (
                  <StripeForm
                    productId={TenTripStudentPass}
                    onSubmit={() => {
                      setSubmitLoading(true);
                    }}
                  >
                    <Button
                      type="submit"
                      disabled={submitLoading}
                      className="w-full"
                    >
                      {submitLoading ? "PLEASE WAIT..." : "BUY NOW"}
                    </Button>
                  </StripeForm>
                ) : (
                  <ButtonLink href="/login" className="block">
                    BUY NOW
                  </ButtonLink>
                )}
              </>
            }
          />

          <PriceCard
            name={"Private 1-on-1"}
            description={"-"}
            price={20}
            points={[
              "1 Student w/ 1 Teacher for $45 (per 30mins)",
              "2 Students w/ 1 Teacher for $45 (per 30mins)",
              "2 Couples w/ 1 Teacher for $100 ($25 each)",
              "For x2 Teachers, add $45 per 30mins",
              "Studio hire... FREE",
            ]}
            callToAction={
              <ButtonLink href="mailto:" className="block">
                ENQUIRE
              </ButtonLink>
            }
          />
        </div>

        <div className="my-10 mx-6">
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
