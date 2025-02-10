import DraggableBlock from "./components/ui/draggable-block";

const randomColors = ["red", "blue", "green", "brown", "purple"];

export default function App() {
  return (
    <div>
      {randomColors.map((color, index) => {
        return (
          <DraggableBlock
            color={color}
            initialPosition={{ x: index * 100, y: 0 }}
          />
        );
      })}
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
    </div>
  );
}
