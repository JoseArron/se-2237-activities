import { useState } from "react";
import DraggableBlock from "./components/ui/draggable-block";

const randomColors = ["red", "blue", "green", "brown", "purple"];

export default function App() {
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<string>("");

  const handleTranslate = async (input: string) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: input }),
      });

      const data = await res.json();
      setOutput(data.output);
      if (data.error) throw new Error(data.error);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-4 flex flex-col items-center justify-center min-h-screen gap-4">
      {randomColors.map((color, index) => (
        <DraggableBlock
          key={color}
          color={color}
          initialPosition={{ x: index * 100, y: 0 }}
        />
      ))}

      <DraggableBlock
        color="orange"
        text="this is orange"
        initialPosition={{ x: 750, y: 10 }}
      />
      <DraggableBlock
        color="black"
        text="this is black"
        initialPosition={{ x: 950, y: 10 }}
      />

      <div className="flex flex-col items-center gap-4 p-4">
        <label>Translate a word to Chinese:</label>
        <div className="flex items-center gap-4">
          <input
            className="border border-gray-300 rounded-md p-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a word..."
          />
          <button
            disabled={loading}
            onClick={() => handleTranslate(input)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            {loading ? "Loading.." : "Translate"}
          </button>
        </div>
        {output && <div className="">Translation: {output}</div>}
      </div>
    </div>
  );
}
