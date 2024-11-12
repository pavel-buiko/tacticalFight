import React from "react";
import {
  unitCellStyle,
  currentUnitStyle,
  selectableUnitStyle,
  hoveredUnitStyle,
  healthBarStyle,
  unitCellWrapper,
  healthTextStyle,
  deadUnitOverlay,
  skullIconStyle,
} from "./style.css";
import { Unit } from "../models/Unit";

interface UnitCellProps {
  unit: Unit;
  onClick: () => void;
  isCurrentUnit: boolean;
  isSelectable: boolean;
  isHovered: boolean;
}

const UnitCell: React.FC<UnitCellProps> = ({
  unit,
  onClick,
  isCurrentUnit,
  isSelectable,
  isHovered,
}) => {
  const maxHealth = unit.maxHealth;
  const currentHealth = unit.health;

  return (
    <div
      className={`${unitCellStyle}  ${isCurrentUnit ? currentUnitStyle : ""} ${
        isSelectable ? selectableUnitStyle : ""
      } ${isHovered ? hoveredUnitStyle : ""}`}
      onClick={onClick}
    >
      <div
        className={`${unitCellWrapper} ${
          !unit.isAlive() ? deadUnitOverlay : ""
        }`}
        style={{ backgroundImage: `url(${unit.image})` }}
      >
        {!unit.isAlive() && (
          <img src="skull.svg" alt="Dead" className={skullIconStyle} />
        )}
        {unit.isAlive() && currentHealth > 0 && currentHealth < maxHealth && (
          <div
            className={healthBarStyle}
            style={{
              height: `${(1 - currentHealth / maxHealth) * 100}%`,
            }}
          />
        )}
        <div className={healthTextStyle}>
          {unit.health}/{unit.maxHealth}
        </div>
      </div>
    </div>
  );
};

export default UnitCell;
