import React from "react";
import {
  turnOrderStyle,
  currentUnitInListStyle,
  turnOrderItemStyle,
  headingStyle,
  turnOrderListStyle,
} from "./style.css";
import { Unit } from "../models/Unit";

interface TurnOrderProps {
  turnOrder: Unit[];
  currentUnit: Unit | null;
  onHoverUnit: (unit: Unit | null) => void;
}

const TurnOrder: React.FC<TurnOrderProps> = ({
  turnOrder,
  currentUnit,
  onHoverUnit,
}) => {
  return (
    <div className={turnOrderStyle}>
      <h3 className={headingStyle}>Порядок ходов</h3>
      <ul className={turnOrderListStyle}>
        {turnOrder.map((unit, index) => (
          <li
            key={index}
            className={`${turnOrderItemStyle} ${
              currentUnit === unit ? currentUnitInListStyle : ""
            }`}
            onMouseEnter={() => onHoverUnit(unit)}
            onMouseLeave={() => onHoverUnit(null)}
          >
            {unit.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TurnOrder;
