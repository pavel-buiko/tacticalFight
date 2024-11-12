import { IPosition as Position } from "./UnitInterfaces";

export abstract class Unit {
  public name: string;
  public health: number;
  public maxHealth: number;
  public initiative: number;
  public image: string;
  public position: Position;
  public isParalyzed: boolean = false;
  public isDefending: boolean = false;
  public team: "red" | "blue";

  constructor(
    name: string,
    health: number,
    maxHealth: number,
    initiative: number,
    image: string,
    position: Position,
    team: "red" | "blue"
  ) {
    this.name = name;
    this.health = health;
    this.maxHealth = maxHealth;
    this.initiative = initiative;
    this.image = image;
    this.position = position;
    this.team = team;
  }

  public takeDamage(amount: number): void {
    const damageReceived = this.isDefending ? amount / 2 : amount;
    this.health -= damageReceived;
    if (this.health < 0) {
      this.health = 0;
    }
  }

  public defend(): void {
    this.isDefending = true;
  }

  public isAlive(): boolean {
    return this.health > 0;
  }

  public resetState(): void {
    this.isDefending = false;
    if (this.isParalyzed) {
      this.isParalyzed = false;
    }
  }
}
