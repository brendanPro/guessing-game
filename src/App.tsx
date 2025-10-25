import "./index.css";
import { PokemonGame } from "./components/PokemonGame";

export function App() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-2">
        <PokemonGame />
      </div>
    </div>
  );
}

export default App;
