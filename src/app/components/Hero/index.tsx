// components/Hero.tsx
import React from "react";

interface HeroProps {
  handleSignIn: () => void;
}

const Hero: React.FC<HeroProps> = ({ handleSignIn }) => {
  return (
    <div className="hero bg-base-200 min-h-[50vh]">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Drupal OAuth Demo App</h1>
          <p className="py-6">Please sign in to continue</p>
          <button className="btn btn-primary" onClick={handleSignIn}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
