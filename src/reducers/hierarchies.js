// :: Action Constants
const constants = {
  SET_HIERARCHIES: 'ENTITIES_SET_HIERARCHIES',
  SET_HIERARCHY_NAMES: 'ENTITIES_SET_HIERARCHY_NAMES',
  SET_SELECTED_HIERARCHY: 'ENTITIES_SET_SELECTED_HIERARCHY',
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
  setSelectedHierarchy: (selectedHierarchy) => {
    return {
      type: constants.SET_SELECTED_HIERARCHY,
      payload: selectedHierarchy
    }
  },
};

// :: Reducer
const initialState = {
  hierarchies: [],
  hierarchyNames: [],
  selectedHierarchy: {},
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

    case constants.SET_SELECTED_HIERARCHY:
      if (!action.payload) {
        return Object.assign({}, state, {
          selectedHierarchy: {}
        });
      };
      let newSelectedHierarchy = action.payload;
      return Object.assign({}, state, {
        selectedHierarchy: newSelectedHierarchy
      });

    default:
      return state;
  }
};