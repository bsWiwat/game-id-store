import React from "react";
import Image from "next/image";

const AboutUs: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center text-center p-6 space-y-6 mb-5">
      <Image
        src="/Aboutus.png"
        alt="About Us"
        width={1200}
        height={400}
        className="w-full h-auto rounded-lg shadow-lg"
      />
      <div className="flex flex-col items-center space-y-10">
        <Image
          src="/Game_ID_Store_Logo.svg"
          alt="Game ID Store Logo"
          width={200}
          height={200}
          className="w-64 h-64  mb-4"
        />
        <h1 className="text-4xl font-bold text-[#D99F2B]">
          Welcome to Game ID Store – The Best Market for Gamers!
        </h1>
        <p className="text-lg max-w-3xl">
          At Game ID Store, we are passionate about gaming and dedicated to
          providing a safe, reliable, and convenient platform for gamers to buy
          and sell game accounts. Whether you&apos;re looking for high-level
          accounts, exclusive in-game items, or simply a fresh start in your
          favorite game, we’ve got you covered!
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          <div className="p-4 border rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">🎮 Wide Selection</h2>
            <p>
              Explore a diverse collection of game accounts across multiple
              genres, including RPGs, MOBAs, Action Games, and more! We
              constantly update our inventory to bring you the latest and best
              deals.
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">🔒 Secure Transactions</h2>
            <p>
              We prioritize your safety with a trusted payment system that
              ensures a smooth and secure buying experience. Your data and
              transactions are fully protected.
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">⚡ Fast & Easy</h2>
            <p>
              With our user-friendly platform, you can easily browse, compare,
              and purchase game accounts within minutes. Our system ensures
              smooth transactions for both buyers and sellers.
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">💬 Dedicated Support</h2>
            <p>
              Need help? Our customer support team is always ready to assist
              you. Whether it’s a question about an account, a transaction, or
              any other concern, we’re here to provide quick and reliable
              assistance.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mt-8">Our Mission</h2>
        <p className="text-lg max-w-3xl">
          Our goal is to create a trusted marketplace where gamers can buy and
          sell game accounts with confidence. We strive to offer the best
          service, the best prices, and the most seamless gaming marketplace
          experience.
        </p>

        <p className="text-lg font-semibold">
          🚀 Start shopping now and level up your gaming experience!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
