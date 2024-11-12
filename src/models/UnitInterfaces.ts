import { Unit } from "./Unit";

export interface IAttack {
  attack(target: Unit): void;
}

export interface IMassAttack {
  massAttack(targets: Unit[]): void;
}

export interface IHeal {
  heal(target: Unit): void;
}

export interface IMassHeal {
  massHeal(targets: Unit[]): void;
}
export interface IParalyze {
  paralyze(target: Unit): void;
}

export interface IPosition {
  row: number;
  column: number;
}
