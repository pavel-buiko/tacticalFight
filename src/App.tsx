import React, { useState, useEffect } from "react";
import Battlefield from "./components/Battlefield";
import ActionButtons from "./components/ActionButtons";
import TurnOrder from "./components/TurnOrder";
import { appStyle } from "./components/style.css";
import { Unit } from "./models/Unit";
import { generateTeam } from "./models/TeamGenerator";
import { Battle } from "./models/Battle";
import { MeleeUnit } from "./models/Units/MeleeUnit";
import { RangeUnit } from "./models/Units/RangeUnit";
import { HealerUnitMass } from "./models/Units/HealerUnitMass";
import { HealerUnitSingle } from "./models/Units/HealerUnitSingle";
import { ParalyzerUnit } from "./models/Units/ParalyzerUnit";
import { MageUnit } from "./models/Units/MageUnit";

interface TargetSelectionMode {
  type: "ally" | "enemy";
  resolve: (unit: Unit | null) => void;
  isValidTarget?: (unit: Unit) => boolean;
}

const App: React.FC = () => {
  const [redTeamUnits, setRedTeamUnits] = useState<Unit[]>(generateTeam("red"));
  const [blueTeamUnits, setBlueTeamUnits] = useState<Unit[]>(
    generateTeam("blue")
  );
  const [battle] = useState<Battle>(new Battle(redTeamUnits, blueTeamUnits));
  const [currentUnit, setCurrentUnit] = useState<Unit | null>(null);
  const [targetSelectionMode, setTargetSelectionMode] =
    useState<TargetSelectionMode | null>(null);
  const [hoveredUnit, setHoveredUnit] = useState<Unit | null>(null);

  useEffect(() => {
    battle.startRound();
    setCurrentUnit(battle.getCurrentUnit());
  }, [battle]);

  const selectTarget = (
    type: "ally" | "enemy",
    isValidTarget?: (unit: Unit) => boolean
  ): Promise<Unit | null> => {
    return new Promise((resolve) => {
      setTargetSelectionMode({ type, resolve, isValidTarget });
    });
  };

  const handleUnitSelect = (unit: Unit) => {
    if (targetSelectionMode) {
      const isAlly = unit.team === currentUnit?.team;
      if (
        (targetSelectionMode.type === "ally" && isAlly) ||
        (targetSelectionMode.type === "enemy" && !isAlly)
      ) {
        targetSelectionMode.resolve(unit);
        setTargetSelectionMode(null);
      } else {
        console.log("Неверная цель");
      }
    } else {
      console.log("Сейчас не ваш выбор юнита");
    }
  };

  const updateUnitsState = () => {
    setRedTeamUnits([...battle.redTeam]);
    setBlueTeamUnits([...battle.blueTeam]);
  };

  const handleAction = async (actionType: string) => {
    if (currentUnit) {
      switch (actionType) {
        case "Атака": {
          if (currentUnit instanceof MeleeUnit) {
            const enemies = battle.getAllEnemies(currentUnit);
            const allies = battle.getAllAllies(currentUnit);
            const possibleTargets = currentUnit.getPossibleTargets(
              allies,
              enemies
            );
            if (possibleTargets.length === 0) {
              console.log("Нет доступных целей для атаки");
              break;
            }
            const isValidTarget = (unit: Unit) =>
              possibleTargets.includes(unit);
            const target = await selectTarget("enemy", isValidTarget);
            if (target) {
              currentUnit.attack(target);
              updateUnitsState();
            }
          } else if (currentUnit instanceof RangeUnit) {
            const target = await selectTarget("enemy");
            if (target) {
              currentUnit.attack(target);
              updateUnitsState();
            }
          } else if (currentUnit instanceof MageUnit) {
            const enemies = battle.getAllEnemies(currentUnit);
            currentUnit.massAttack(enemies);
            updateUnitsState();
          }
          break;
        }
        case "Лечение": {
          if (currentUnit instanceof HealerUnitSingle) {
            const ally = await selectTarget("ally");
            if (ally) {
              currentUnit.heal(ally);
              updateUnitsState();
            }
          } else if (currentUnit instanceof HealerUnitMass) {
            const allies = battle.getAllAllies(currentUnit);
            currentUnit.massHeal(allies);
            updateUnitsState();
          }
          break;
        }
        case "Парализация": {
          if (currentUnit instanceof ParalyzerUnit) {
            const enemy = await selectTarget("enemy");
            if (enemy) {
              currentUnit.paralyze(enemy);
              console.log(`${currentUnit.name} парализовал ${enemy.name}`);
              updateUnitsState();
            }
          }
          break;
        }
        case "Защита": {
          currentUnit.defend();
          console.log(`${currentUnit.name} в режиме защиты`);
          updateUnitsState();
          break;
        }
        default:
          break;
      }
      battle.nextTurn();
      setCurrentUnit(battle.getCurrentUnit());
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
