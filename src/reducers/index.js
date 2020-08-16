import { combineReducers } from 'redux';

import * as entities from './entities';

export const reducers = combineReducers({
    entities: entities.reducer,
});

export const actions = {
    entities: entities.actions,
}