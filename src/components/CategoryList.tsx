import Link from "next/link";
import Image from "next/image";

const logos = [
  { src: "/Logo_Genshin.png", alt: "Logo Genshin", link: "/list?cat=genshin" },
  { src: "/Logo_Cookie.png", alt: "Logo Cookie", link: "/list?cat=cookie" },
  { src: "/Logo_Rov.png", alt: "Logo ROv", link: "/list?cat=rov" },
  { src: "/Logo_LOL.png", alt: "Logo LOL", link: "/list?cat=lol" },
  {
    src: "/Logo_HonkaiSR.png",
    alt: "Logo HonkaiSR",
    link: "/list?cat=honkaiSR",
  },
  { src: "/Logo_Pokemon.png", alt: "Logo Pokemon", link: "/list?cat=pokemon" },
];

const CategoryList = () => {
  return (
    <div className="px-4 overflow-x-scroll scrollbar-hide py-2">
      <div className="flex gap-4 md:gap-8">
        {logos.map((logo, index) => (
          <Link
            key={index}
            href={logo.link}
            className="flex-shrink-0 sm:w-1/2 lg:w-1/4 xl:w-1/6"
          >
            <div className="relative bg-white min-w-[263px] min-h-[148px] outline outline-[#D99F2b] flex items-center justify-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={263}
                height={148}
                className="-w-full h-auto max-w-[263px] max-h-[148px] object-cover"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
