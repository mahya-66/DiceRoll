import { useState, useEffect } from "react";

const DiceRoller = () => {
  const [number, setNumber] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lastDice");
    if (saved) setNumber(Number(saved));
  }, []);

  const rollDice = () => {
    setLoading(true);

    setTimeout(() => {
      const random = Math.floor(Math.random() * 6) + 1;

      setNumber(random);
      const lastRolls = localStorage.getItem("lastDice")?.split("/") || [];
      localStorage.setItem("lastDice", [...lastRolls, random].join("/"));

      setLoading(false);
    }, 3500);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 text-white p-6 rounded-2xl shadow-xl w-80">
      <p className="text-xl font-black mb-4"> Dice Roller</p>

      <div className="text-6xl font-extrabold mb-4">
        {loading ? "⏳" : number !== null ? number : "-"}
      </div>

      <button
        onClick={rollDice}
        disabled={loading}
        className="px-5 py-2 bg-purple-600 hover:bg-purple-700 cursor-pointer rounded-xl duration-200 shadow-md text-lg"
      >
        {loading ? "Rolling..." : "Roll"}
      </button>

      <p className="mt-3 text-gray-400 text-sm">
        Last roll: {localStorage.getItem("lastDice") || "None"}
      </p>
    </div>
  );
};
export default DiceRoller;
