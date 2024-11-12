import React from "react";
import { battlefieldContainer, gridContainer } from "./style.css";
import UnitCell from "./UnitCell";
import { Unit } from "../models/Unit";
import { TargetSelectionMode } from "../hooks/useTargetSelection";

interface BattlefieldProps {
  units: Unit[];
  onUnitSelect: (unit: Unit) => void;
  currentUnit: Unit | null;
  targetSelectionMode: TargetSelectionMode | null;
  hoveredUnit: Unit | null;
}

const Battlefield: React.FC<BattlefieldProps> = ({
  units,
  onUnitSelect,
  currentUnit,
  targetSelectionMode,
  hoveredUnit,
}) => {
  return (
    <div className={battlefieldContainer}>
      <div className={gridContainer}>
        {units.map((unit, index) => {
          const isSelectable =
            targetSelectionMode &&
            ((targetSelectionMode.type === "ally" &&
              unit.team === currentUnit?.team) ||
              (targetSelectionMode.type === "enemy" &&
                unit.team !== currentUnit?.team)) &&
            (!targetSelectionMode.isValidTarget ||
              targetSelectionMode.isValidTarget(unit));

          return (
            <UnitCell
              key={index}
              unit={unit}
              onClick={() => onUnitSelect(unit)}
              isCurrentUnit={currentUnit === unit}
              isSelectable={!!isSelectable}
              isHovered={hoveredUnit === unit}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Battlefield;
