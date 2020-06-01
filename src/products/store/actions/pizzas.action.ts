import {Action} from "@ngrx/store";
import {Pizza} from "../../models/pizza.model";

//load pizzas
export const LOAD_PIZZAS = '[Products] Load pizzas';
export const LOAD_PIZZAS_FAIL = '[Products] Load pizzas fail';
export const LOAD_PIZZAS_SUCCESS = '[Products] Load pizzas success';

export class LoadPizzas implements Action{
  readonly type = LOAD_PIZZAS;
}

export class LoadPizzasFail implements Action{
  readonly type = LOAD_PIZZAS_FAIL;
  constructor(public payload: any) {}
}

export class LoadPizzasSuccess implements Action{
  readonly type = LOAD_PIZZAS_SUCCESS;
  constructor(public payload: Pizza[]) {}
}

// create pizza
export const CREATE_PIZZA = '[Products] Create pizza';
export const CREATE_PIZZA_FAIL = '[Products] Create pizza fail';
export const CREATE_PIZZA_SUCCESS = '[Products] Create pizza success';

export class CreatePizza implements Action {
  readonly type = CREATE_PIZZA;
  constructor(public payload: Pizza) {}
}
export class CreatePizzaFail implements Action {
  readonly type = CREATE_PIZZA_FAIL;
  constructor(public payload: any) {}
}
export class CreatePizzaSuccess implements Action {
  readonly type = CREATE_PIZZA_SUCCESS;
  constructor(public payload: Pizza) {}
}

//update pizza
export const UPDATE_PIZZA = '[Products] Update pizza';
export const UPDATE_PIZZA_FAIL = '[Products] Update pizza fail';
export const UPDATE_PIZZA_SUCCESS = '[Products] Update pizza success';

export class UpdatePizza implements Action {
  readonly type = UPDATE_PIZZA;
  constructor(public payload: Pizza) {}
}

export class UpdatePizzaFail implements Action {
  readonly type = UPDATE_PIZZA_FAIL;
  constructor(public payload: any) {}
}

export class UpdatePizzaSuccess implements Action {
  readonly type = UPDATE_PIZZA_SUCCESS;
  constructor(public payload: Pizza) {}
}

//remove pizza
export const REMOVE_PIZZA = '[Products] Remove pizza';
export const REMOVE_PIZZA_FAIL = '[Products] Remove pizza fail';
export const REMOVE_PIZZA_SUCCESS = '[Products] Remove pizza success';

export class RemovePizza implements Action {
  readonly type = REMOVE_PIZZA;
  constructor(public payload: Pizza) {
  }
}

export class RemovePizzaFail implements Action {
  readonly type = REMOVE_PIZZA_FAIL;
  constructor(public payload: any) {
  }
}

export class RemovePizzaSuccess implements Action {
  readonly type = REMOVE_PIZZA_SUCCESS;
  constructor(public payload: Pizza) {
  }
}

//action types
export type PizzasAction =
  | LoadPizzas
  | LoadPizzasFail
  | LoadPizzasSuccess
  | CreatePizza
  | CreatePizzaFail
  | CreatePizzaSuccess
  | UpdatePizza
  | UpdatePizzaFail
  | UpdatePizzaSuccess
  | RemovePizza
  | RemovePizzaFail
  | RemovePizzaSuccess;

