import { IMassAttack } from "../UnitInterfaces";
import { IPosition as Position } from "../UnitInterfaces";
import { Unit } from "../Unit";

export class MageUnit extends Unit implements IMassAttack {
  public damage: number;

  constructor(
    name: string,
    health: number,
    maxHealth: number,
    initiative: number,
    image: string,
    position: Position,
    team: "red" | "blue",
    damage: number
  ) {
    super(name, health, maxHealth, initiative, image, position, team);
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
