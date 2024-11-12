import { Unit } from "../Unit";
import { IPosition as Position } from "../UnitInterfaces";
import { IMassHeal } from "../UnitInterfaces";

export class HealerUnitMass extends Unit implements IMassHeal {
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

  public massHeal(targets: Unit[]): void {
    targets.forEach((target) => {
      if (target.isAlive()) {
        target.health += this.healAmount;
        if (target.health > target.maxHealth) {
          target.health = target.maxHealth;
        }
      }
    });
  }
}
