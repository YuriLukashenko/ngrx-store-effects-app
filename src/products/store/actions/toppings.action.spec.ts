import * as fromToppings from './toppings.action';

describe('LoadToppings Actions', () => {
    describe('LoadToppings', () => {
      it('should create an action', () => {
        const action = new fromToppings.LoadToppings();

        expect({...action}).toEqual({
          type: fromToppings.LOAD_TOPPINGS
        })
      })
    })
  }
);

describe('VisualizeToppings Actions', () => {
  describe('VisualizeToppings', () => {
    it('should create an action', () => {
      const action = new fromToppings.VisualiseToppings([1,2,3]);
      expect({...action}).toEqual({
        type: fromToppings.VISUALIZE_TOPPINGS,
        payload: [1,2,3]
      })
    })
  })
});


