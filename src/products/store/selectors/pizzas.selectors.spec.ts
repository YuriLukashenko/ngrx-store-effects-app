import {TestBed} from "@angular/core/testing";
import {StoreModule, Store, combineReducers} from "@ngrx/store";

import * as fromRoot from '../../../app/store/reducers'
import * as fromReduces from '../reducers';
import * as fromActions from '../actions';
import * as fromSelectors from '../selectors';

import {Pizza} from "../../models/pizza.model";

describe('Pizzas Selectors', () => {
  let store: Store<fromReduces.ProductsState>;

  const pizza1: Pizza = {
    id: 1,
    name: 'First name',
    toppings: [
      {id: 1, name: 'fish'},
      {id: 2, name: 'chips'},
      {id: 3, name: 'cheese'},
    ]
  };

  const pizza2: Pizza = {
    id: 2,
    name: 'Second name',
    toppings: [
      {id: 1, name: 'fsdfsd'},
      {id: 2, name: 'cfdgdfhips'},
      {id: 3, name: 'cheesfdge'},
      {id: 4, name: 'cheesfdge'},
    ]
  };

  const pizza3: Pizza = {
    id: 3,
    name: 'Third name',
    toppings: [
      {id: 1, name: 'fsash'},
      {id: 2, name: 'chips'}
    ]
  };

  const pizzas: Pizza[] = [pizza1, pizza2, pizza3];

  const entities = {
    1: pizzas[0],
    2: pizzas[1],
    3: pizzas[2]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          products: combineReducers(fromReduces.reducers)
        })
      ]
    });

    store = TestBed.get(Store);
  });

  describe('getPizzasState', () => {
    it('should return state of pizzas store slice', () => {
      let result;

      store.select(fromSelectors.getPizzaState)
        .subscribe(value => (result = value));

      expect(result).toEqual({
        entities: {},
        loaded: false,
        loading: false
      });

      store.dispatch(new fromActions.LoadPizzasSuccess(pizzas));

      expect(result).toEqual({
        entities,
        loaded: true,
        loading: false
      })
    })
  })

  describe('getSelectedPizza', () => {
    it('should return selected pizza as an entity', () => {
      let result;
      let params;

      store.dispatch(new fromActions.LoadPizzasSuccess(pizzas));

      store.dispatch({
        type: 'ROUTER_NAVIGATION',
        payload: {
          routerState: {
            url: '/products',
            queryParams: {},
            params: {pizzaId: '2'}
          },
          event: {},
        }
      });

      store.select(fromRoot.getRouterState)
        .subscribe(routerState =>( params = routerState.state.params));

      expect(params).toEqual({pizzaId: '2'});

      store.select(fromSelectors.getSelectedPizza)
        .subscribe(selectedPizza => (result = selectedPizza));

      expect(result).toEqual(entities[2])
    })
  });

  describe('getPizzaVisualized', () =>{
    it('should return selected pizza composed with selected toppings', () => {
      let result;
      let params;

      const toppings = [
        {id: 6, name: 'sex'},
        {id: 9, name: 'drugs'},
        {id: 11, name: 'rock\'n\'roll'}
      ];

      store.dispatch(new fromActions.LoadPizzasSuccess(pizzas));
      store.dispatch(new fromActions.LoadToppingsSuccess(toppings));
      store.dispatch(new fromActions.VisualiseToppings([11, 9, 6]));

      store.dispatch({
        type: 'ROUTER_NAVIGATION',
        payload: {
          routerState: {
            url: '/products',
            queryParams: {},
            params: {pizzaId: '2'}
          },
          event: {},
        }
      });

      store.select(fromRoot.getRouterState)
        .subscribe(routerState =>( params = routerState.state.params));

      expect(params).toEqual({pizzaId: '2'});

      store.select(fromSelectors.getPizzaVisualized)
        .subscribe(visualized => (result = visualized));

      const expectedToppings = [toppings[2], toppings[1], toppings[0]];

      expect(result).toEqual({...entities[2], toppings: expectedToppings});
    })
  })
});
