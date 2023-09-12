import { PAGES_ROUTES } from "src/utils/routing";
import Button from "src/Components/Button/Button";

export function CommunityInvitationCard() {
  return (
    <section className="relative p-16 text-center bg-gray-800 rounded-16 md:p-32 isolate">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <img src="assets/images/confetti.png" alt="" className="" />
        <div className="absolute inset-0 bg-gray-800 rounded-16 bg-opacity-40"></div>
      </div>
      <div className="relative flex flex-col gap-12">
        <h2 className="text-transparent text-body1 font-bolder bg-gradient-to-r from-blue-500 to-violet-400 bg-clip-text ">
          Join the community
        </h2>
        <p className="text-white text-body3">
          Proof of work starts with you. Share your work, build in public, win
          bounties and take part in hackathons and tournaments! Sign up and
          introduce yourself to the community.
        </p>
        <img
          src="assets/images/create-profile.png"
          alt=""
          className="self-center max-w-[300px]"
        />
        <Button
          href={PAGES_ROUTES.auth.login}
          color="primary"
          className="self-center !px-64 -mt-40"
        >
          Sign up
        </Button>
        <p className="text-gray-200">
          And become a part of the most FUN developers community!
        </p>
      </div>
    </section>
  );
}
