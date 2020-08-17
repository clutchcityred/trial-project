import { combineReducers } from 'redux';

import * as entities from './entities';
import * as hierarchies from './hierarchies';

export const reducers = combineReducers({
    entities: entities.reducer,
    hierarchies: hierarchies.reducer,
});

export const actions = {
    entities: entities.actions,
    hierarchies: hierarchies.actions,
}