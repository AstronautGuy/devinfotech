import Image from "next/image";

export function WelcomeSection() {
  return (
    <main
      className={
        "flex flex-row items-center justify-evenly bg-gradient-to-b from-white to-gray-300"
      }
    >
      <div className="flex flex-col items-center justify-center h-screen cursor-default select-none">
        <div className="flex flex-col items-center">
          {/* Number */}
          <p className="text-8xl font-bold text-gray-300">01</p>

          {/* Vertical Line */}
          <div className="h-20 w-px bg-gray-400 my-6"></div>

          {/* Vertical Text (Corrected) */}
          <p className="font-bold text-gray-500 tracking-[0.3em] [writing-mode:vertical-rl] rotate-180">
            INTRODUCE
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-start space-y-4">
        <div>
          <h1 className="text-4xl font-bold uppercase">
            welcome to dev infotech
          </h1>
          <h1 className="text-2xl font-light text-black/60 uppercase">
            your complete it solutions partner
          </h1>
        </div>

        <div className="w-40 h-1 bg-black my-6"></div>

        <p>A Complete IT Solutions Partner</p>
        <p>
          At Dev Infotech, we specialize in delivering end-to-end IT solutions
          tailored for individuals, professionals, and <br /> businesses.
          Whether you’re looking to buy a new computer, need custom PC builds,
          or require expert repair and
          <br /> maintenance services, we are your trusted partner for all
          things tech.
        </p>
        <p>
          Established in 1999, Dev Infotech was founded with a clear vision — to
          provide affordable, reliable, and cutting-edge
          <br /> IT services under one roof. With our years of experience, we’ve
          become a go-to destination for computer sales,
          <br /> service, and customized IT solutions in Vadodara and
          surrounding areas.
        </p>
        <p>
          We’ve built our reputation on trust, quality service, and customer
          satisfaction. From home users to corporate clients,
          <br /> we cater to a wide range of customers by staying up to date
          with the latest technology trends.
        </p>
      </div>
      <div className="relative">
        <div className="bg-black/80 blur-xs h-80 w-120 absolute top-10 right-10 z-10" />

        <Image
          src="/images/computer-repair.webp"
          alt="computer repair image"
          aria-hidden={true}
          width={500}
          height={500}
          loading={"lazy"}
          className="relative z-20"
        />
      </div>
    </main>
  );
}
