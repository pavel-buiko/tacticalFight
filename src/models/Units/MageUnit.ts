import { IMassAttack } from "../UnitActionInterfaces";
import { IPosition as Position } from "../IPosition";
import { Unit } from "../Unit";

export class MageUnit extends Unit implements IMassAttack {
  public damage: number;

  constructor(
    name: string,
    health: number,
    initiative: number,
    image: string,
    position: Position,
    team: "red" | "orange",
    damage: number
  ) {
    super(name, health, initiative, image, position, team);
    this.damage = damage;
  }

  public massAttack(targets: Unit[]): void {
    targets.forEach((target) => {
      if (target.isAlive()) {
        target.takeDamage(this.damage);
      }
    });
  }
}
