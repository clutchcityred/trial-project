// :: Action Constants
const constants = {
  SET_HIERARCHIES: 'ENTITIES_SET_HIERARCHIES',
  SET_HIERARCHY_NAMES: 'ENTITIES_SET_HIERARCHY_NAMES',
}

// :: Actions
export const actions = {
  setHierarchies: (hierarchies) => {
    return {
      type: constants.SET_HIERARCHIES,
      payload: hierarchies
    }
  },
  setHierarchyNames: (hierarchyNames) => {
    return {
      type: constants.SET_HIERARCHY_NAMES,
      payload: hierarchyNames
    }
  },
};

// :: Reducer
const initialState = {
  hierarchies: [],
  hierarchyNames: [],
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case constants.SET_HIERARCHIES:
      if (!action.payload) {
        return Object.assign({}, state, {
          hierarchies: []
        });
      };
      let newHierarchies = action.payload;
      return Object.assign({}, state, {
        hierarchies: newHierarchies
      });

    case constants.SET_HIERARCHY_NAMES:
      if (!action.payload) {
        return Object.assign({}, state, {
          hierarchyNames: []
        });
      };
      let newHierarchyNames = action.payload;
      return Object.assign({}, state, {
        hierarchyNames: newHierarchyNames
      });

    default:
      return state;
  }
};