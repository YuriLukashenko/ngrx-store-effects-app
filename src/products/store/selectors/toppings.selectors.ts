import {createSelector} from "@ngrx/store";

import * as fromRoot from "../../../app/store/reducers";
import * as fromFeature from "../reducers";
import * as fromToppings from "../reducers/topings.reducer";

export const getToppingsState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.toppings
);

export const getToppingEntities = createSelector(
  getToppingsState,
  fromToppings.getToppingEntities
);

export const getSelectedToppings = createSelector(
  getToppingsState,
  fromToppings.getSelectedToppins
)

export const getAllToppings = createSelector(
  getToppingEntities,
  entities => {
    return Object.keys(entities).map(id => entities[parseInt(id)]);
  }
);

export const getToppingsLoaded = createSelector(
  getToppingsState,
  fromToppings.getToppingLoaded
);

export const getToppingLoading = createSelector(
  getToppingsState,
  fromToppings.getToppingLoading
);
