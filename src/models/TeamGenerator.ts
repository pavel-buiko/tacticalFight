import { Unit } from "./Unit";
import { createUnit } from "./Units/UnitFactory";
import { IPosition as Position } from "./UnitInterfaces";

const unitTypes = [
  "Skeleton",
  "Centaur",
  "Bandit",
  "Elf Archer",
  "Skeleton Mage",
  "Archimage",
  "Monk",
  "Bishop",
  "Sirena",
];

export function generateTeam(teamColor: "red" | "blue"): Unit[] {
  const team: Unit[] = [];
  const positions: Position[] = [];

  if (teamColor === "red") {
    // rows 0 amd 1 is red team
    for (let row = 0; row <= 1; row++) {
      for (let col = 0; col <= 2; col++) {
        positions.push({ row, column: col });
      }
    }
  } else {
    // rows 2 and 3 is blue team
    for (let row = 2; row <= 3; row++) {
      for (let col = 0; col <= 2; col++) {
        positions.push({ row, column: col });
      }
    }
  }

  for (let i = 0; i < 6; i++) {
    const randomUnitType =
      unitTypes[Math.floor(Math.random() * unitTypes.length)];
    const unit = createUnit(randomUnitType, positions[i], teamColor);
    team.push(unit);
  }

  return team;
}
