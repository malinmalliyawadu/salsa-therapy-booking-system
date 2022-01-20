import { getAuth, User } from "firebase/auth";
import { NextPage } from "next";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "../components/Button";
import { ButtonLink } from "../components/ButtonLink";
import { PriceCard } from "../components/PriceCard";
import { StripeForm } from "../components/StripeForm";
import {
  DameDos,
  DameTres,
  DameUna,
  DileQueSi,
  SpecialOfferTenTrip,
  TenTripStudentPass,
} from "../constants/stripeProductIds";

const StripeCallToAction: React.FC<{
  productId: string;
  user: User | null | undefined;
  submitLoading: boolean;
  setSubmitLoading: (value: boolean) => void;
}> = ({ productId, user, submitLoading, setSubmitLoading }) => {
  return (
    <>
      {user ? (
        <StripeForm
          productId={productId}
          onSubmit={() => {
            setSubmitLoading(true);
          }}
        >
          <Button type="submit" disabled={submitLoading} className="w-full">
            {submitLoading ? "PLEASE WAIT..." : "BUY NOW"}
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
      <h1 className="font-bold text-6xl mb-2 tracking-tight">
        Membership Options
      </h1>

      <div className="max-w-full mx-auto my-12">
        <div className="grid grid-cols-4">
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
              <StripeCallToAction
                productId={SpecialOfferTenTrip}
                user={user}
                submitLoading={submitLoading}
                setSubmitLoading={setSubmitLoading}
              />
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
              <StripeCallToAction
                productId={TenTripStudentPass}
                user={user}
                submitLoading={submitLoading}
                setSubmitLoading={setSubmitLoading}
              />
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

          <PriceCard
            name={"Dáme Una"}
            description={"$18 per week"}
            price={180}
            points={[
              "One class per week cancel anytime",
              "Choose 1 class",
              "Any style and level",
              "See Term Dates",
              "Includes 2 FREE SALSA Practica passes for new students only",
              "Buy and book",
              "Booking in advance is essential",
              "Valid for 2 months",
            ]}
            callToAction={
              <StripeCallToAction
                productId={DameUna}
                user={user}
                submitLoading={submitLoading}
                setSubmitLoading={setSubmitLoading}
              />
            }
          />

          <PriceCard
            name={"Dáme Dos"}
            description={"$27 per week"}
            price={270}
            points={[
              "Two classes per week  cancel anytime",
              "Any two classes",
              "Any style and level",
              "See Term Dates",
              "1 FREE SALSA Practica passes",
              "Book ahead",
              "Valid for 2 months",
            ]}
            callToAction={
              <StripeCallToAction
                productId={DameDos}
                user={user}
                submitLoading={submitLoading}
                setSubmitLoading={setSubmitLoading}
              />
            }
          />

          <PriceCard
            name={"Dáme Tres"}
            description={"$32 per week"}
            price={320}
            points={[
              "Three Classes per week cancel anytime",
              "PRIME LOCATION",
              "Any 3 classes",
              "Any style and level",
              "1 FREE SALSA Practica passes",
              "$10 off Private",
              "Book ahead",
              "Valid for 2 months",
            ]}
            callToAction={
              <StripeCallToAction
                productId={DameTres}
                user={user}
                submitLoading={submitLoading}
                setSubmitLoading={setSubmitLoading}
              />
            }
          />

          <PriceCard
            name={"Díle que si"}
            description={"$37 per week"}
            price={370}
            points={[
              "UNLIMITED DANCE CLASS (based on 6 month membership)",
              "PRIME LOCATION",
              "All dance classes",
              "Any style and level",
              "$10 off Private",
              "5% OFF Performance training",
              "2 Party Passes SLP",
            ]}
            callToAction={
              <StripeCallToAction
                productId={DileQueSi}
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
