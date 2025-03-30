"use client";

import Image from "next/image";
import { useState } from "react";
import { ProductImagesProps } from "@/models/Product";

const ProductImages: React.FC<ProductImagesProps> = ({ gallery }) => {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState({ x: "0%", y: "0%" });
  const [isZoomVisible, setIsZoomVisible] = useState(false);

  const handleMouseMove = (event: React.MouseEvent) => {
    const container = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - container.left;
    const offsetY = event.clientY - container.top;

    const pointerX = (offsetX * 100) / container.width;
    const pointerY = (offsetY * 100) / container.height;

    setZoom({ x: `${pointerX}%`, y: `${pointerY}%` });
    setIsZoomVisible(true);
  };

  const handleMouseOut = () => {
    setIsZoomVisible(false);
  };

  return (
    <div className="">
      <div className="h-[500px] relative ">
        <div
          className="relative w-full h-full"
          onMouseMove={handleMouseMove}
          onMouseOut={handleMouseOut}
        >
          <Image
            src={gallery[index]}
            alt={`Product Image ${index}`}
            fill
            sizes="50vw"
            className="object-cover rounded-md object-center"
          />
          {isZoomVisible && (
            <div
              className="absolute inset-0 bg-black"
              style={{
                backgroundImage: `url(${gallery[index]})`,
                backgroundSize: "200%",
                backgroundPosition: `${zoom.x} ${zoom.y}`,
                pointerEvents: "none",
              }}
            ></div>
          )}
        </div>
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {gallery.map((img, i) => (
          <div
            key={i}
            className={`w-1/4 h-32 relative cursor-pointer ${
              index === i ? "border-2 border-blue-500" : ""
            }`}
            onClick={() => setIndex(i)}
          >
            <Image
              src={img}
              alt={`Thumbnail ${i}`}
              fill
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
