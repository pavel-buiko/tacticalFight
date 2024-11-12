import { Unit } from "../Unit";
import { IHeal } from "../UnitInterfaces";
import { IPosition as Position } from "../UnitInterfaces";

export class HealerUnitSingle extends Unit implements IHeal {
  public healAmount: number;

  constructor(
    name: string,
    health: number,
    maxHealth: number,
    initiative: number,
    image: string,
    position: Position,
    team: "red" | "blue",
    healAmount: number
  ) {
    super(name, health, maxHealth, initiative, image, position, team);
    this.healAmount = healAmount;
  }

  public heal(target: Unit): void {
    if (target.isAlive()) {
      target.health += this.healAmount;
      if (target.health > target.maxHealth) {
        target.health = target.maxHealth;
      }
    }
  }
}
