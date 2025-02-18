"use client";
import Button from "../ui/Button";

const HeroSection = () => {
  return (
    <section className="mt-24">
      <div
        className="relative w-full h-[40vh] lg:h-[65vh] bg-mainColor bg-right bg-cover"
        style={{ backgroundImage: "url('/images/hero-banner.webp')" }}
      >
        <div className="h-full w-1/2 flex items-center justify-center">
          <div className=" bg-white p-10 rounded-lg hidden lg:block">
            <h1 className="text-2xl font-medium mb-5">
              Prêts à faire <br />
              du tri dans vos placards ?
            </h1>
            <Button
              bgColor="bg-mainColor"
              textColor="text-white"
              text="Vends Maintenant"
              wfull={true}
              textSize="text-base"
            />
          </div>
        </div>
        <img
          src="/images/separator.svg"
          alt="separator"
          className="absolute -bottom-1 right-0 lg:w-1/2"
        />
      </div>
      <div className="mt-3 lg:hidden w-full p-4 flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold mb-5 w-full text-center">
          Prêts à faire du tri dans vos placards ?
        </h1>
        <Button
          bgColor="bg-mainColor"
          textColor="text-white"
          text="Vends Maintenant"
          wfull={true}
          textSize="text-base"
        />
      </div>
    </section>
  );
};

export default HeroSection;
