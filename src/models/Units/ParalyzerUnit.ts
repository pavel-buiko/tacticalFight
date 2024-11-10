import { Unit } from "../Unit";
import { IPosition as Position } from "../IPosition";
import { IParalyze } from "../UnitActionInterfaces";

export class ParalyzerUnit extends Unit implements IParalyze {
  constructor(
    name: string,
    health: number,
    initiative: number,
    image: string,
    position: Position,
    team: "red" | "orange"
  ) {
    super(name, health, initiative, image, position, team);
  }

  public paralyze(target: Unit): void {
    if (target.isAlive()) {
      target.isParalyzed = true;
    }
  }
}
