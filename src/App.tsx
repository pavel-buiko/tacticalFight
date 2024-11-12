// App.tsx
import React, { useState } from "react";
import Battlefield from "./components/Battlefield";
import ActionButtons from "./components/ActionButtons";
import TurnOrder from "./components/TurnOrder";
import { appStyle } from "./components/style.css";
import useBattle from "./hooks/useBattle";
import useTargetSelection from "./hooks/useTargetSelection";
import {
  handleAttack,
  handleHeal,
  handleParalyze,
  handleDefend,
} from "./models/actions";
import { Unit } from "./models/Unit";

const App: React.FC = () => {
  const {
    redTeamUnits,
    blueTeamUnits,
    battle,
    currentUnit,
    updateUnitsState,
    nextTurn,
  } = useBattle();

  const { targetSelectionMode, selectTarget, handleUnitSelect } =
    useTargetSelection(currentUnit);

  const [hoveredUnit, setHoveredUnit] = useState<Unit | null>(null);

  const handleAction = async (actionType: string) => {
    if (currentUnit) {
      switch (actionType) {
        case "Атака":
          await handleAttack(
            currentUnit,
            battle,
            selectTarget,
            updateUnitsState
          );
          break;
        case "Лечение":
          await handleHeal(currentUnit, battle, selectTarget, updateUnitsState);
          break;
        case "Парализация":
          await handleParalyze(currentUnit, selectTarget, updateUnitsState);
          break;
        case "Защита":
          handleDefend(currentUnit, updateUnitsState);
          break;
        default:
          console.log("Неизвестное действие");
          break;
      }
      nextTurn();
    }
  };

  return (
    <div className={appStyle}>
      <div>
        <Battlefield
          units={[...redTeamUnits, ...blueTeamUnits]}
          onUnitSelect={handleUnitSelect}
          currentUnit={currentUnit}
          targetSelectionMode={targetSelectionMode}
          hoveredUnit={hoveredUnit}
        />
        <ActionButtons currentUnit={currentUnit} onAction={handleAction} />
      </div>
      <TurnOrder
        turnOrder={battle.turnOrder}
        currentUnit={currentUnit}
        onHoverUnit={setHoveredUnit}
      />
    </div>
  );
};

export default App;
