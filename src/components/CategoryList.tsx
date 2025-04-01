"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const logos = [
  {
    src: "/LogoGame/Logo_Genshin.png",
    alt: "Logo Genshin",
    category: "Genshin Impact",
    link: "/list?category=Genshin Impact",
  },
  {
    src: "/LogoGame/Logo_Cookie.png",
    alt: "Logo Cookie",
    category: "Cookie Run Kingdoms",
    link: "/list?category=Cookie Run Kingdoms",
  },
  {
    src: "/LogoGame/Logo_Rov.png",
    alt: "Logo ROv",
    category: "Arena of Valor",
    link: "/list?category=Arena of Valor",
  },
  {
    src: "/LogoGame/Logo_LOL.png",
    alt: "Logo LOL",
    category: "League of Legend",
    link: "/list?category=League of Legend",
  },
  {
    src: "/LogoGame/Logo_HonkaiSR.png",
    alt: "Logo HonkaiSR",
    category: "Hokai Star Rail",
    link: "/list?category=Hokai Star Rail",
  },
  {
    src: "/LogoGame/Logo_Pokemon.png",
    alt: "Logo Pokemon",
    category: "Pokemon TCG",
    link: "/list?category=Pokemon TCG",
  },
  {
    src: "/LogoGame/Logo_Marvel.png",
    alt: "Logo Marvel",
    category: "Marvel Rivals",
    link: "/list?category=Marvel Rivals",
  },
];

const infiniteLogos = [...logos, ...logos, ...logos]; // Duplicate list

const CategoryList = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrame: number;
    const speed = 1; // ความเร็วเลื่อน

    const scrollLoop = () => {
      if (!isDragging) {
        scrollContainer.scrollLeft += speed;
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 3) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(scrollLoop);
    };

    scrollLoop();

    return () => cancelAnimationFrame(animationFrame);
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={scrollRef}
      className="px-4 overflow-x-auto whitespace-nowrap scrollbar-hide py-2 flex gap-4"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {infiniteLogos.map((logo, index) => (
        <Link key={index} href={logo.link} className="flex-shrink-0">
          <div className="relative bg-white  outline outline-[#D99F2b] flex items-center justify-center overflow-hidden">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={263}
              height={148}
              className="w-auto h-auto object-contain"
              draggable="false"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
