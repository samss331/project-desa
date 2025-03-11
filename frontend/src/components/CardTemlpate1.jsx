import React from "react";

export default function CardTemlpate1({ children }) {
  return (
    <div className="shadow-lg p-6 bg-white rounded-lg w-[20rem] h-[22rem] flex justify-center items-center text-center">
      {children}
    </div>
  );
}
