import {TestBed} from "@angular/core/testing";
import {StoreModule, Store, combineReducers} from "@ngrx/store";

import * as fromRoot from '../../../app/store/reducers'
import * as fromReduces from '../reducers';
import * as fromActions from '../actions';
import * as fromSelectors from '../selectors';
import * as fromEffects from '../effects';

import {Actions} from "@ngrx/effects";

import {hot, cold} from 'jasmine-marbles';
import {empty} from "rxjs/Observer";
import {Observable} from "rxjs";
import {ToppingsEffects} from "./toppings.effect";
import {ToppingsService} from "../../services";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {of} from "rxjs/observable/of";

export class TestActions extends Actions {
  constructor() {
    super();
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

fdescribe('ToppingsEffects', () => {
  let actions$: TestActions;
  let service: ToppingsService;
  let effects: fromEffects.ToppingsEffects;

  const toppings = [
    {id: 1, name: 'Lol'},
    {id: 2, name: 'Kek'},
    {id: 3, name: 'Cheburek'}
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ToppingsService,
        fromEffects.ToppingsEffects,
        { provide: Actions, useFactory: getActions}
      ]
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.get(ToppingsService);
    effects = TestBed.get(fromEffects.ToppingsEffects);

    spyOn(service, 'getToppings').and.returnValue(of(toppings));
  });

  describe('loadToppings$', () => {
    it('should return a collection from LoadToppingsSuccess', () => {
      const action = new fromActions.LoadToppings();
      const completion = new fromActions.LoadToppingsSuccess(toppings);

      actions$.stream = hot('-a', {a : action});
      const expected = cold('-b', {b: completion});

      expect(effects.loadToppings$).toBeObservable(expected);
    })
  })

});


