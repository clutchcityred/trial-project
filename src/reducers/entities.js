// :: Action Constants
const constants = {
  SET_ASSETS: 'ENTITIES_SET_ASSETS',
  SET_BLOCKS: 'ENTITIES_SET_BLOCKS',
  SET_COMPARTMENTS: 'ENTITIES_SET_COMPARTMENTS',
  SET_FIELDS: 'ENTITIES_SET_FIELDS',
  SET_HYDRODYNAMIC_UNITS: 'ENTITIES_SET_HYDRODYNAMIC_UNITS',
  SET_LAYERS: 'ENTITIES_SET_LAYERS',
  SET_SECTIONS: 'ENTITIES_SET_SECTIONS',
  SET_WELLS: 'ENTITIES_SET_WELLS',
}

// :: Actions
export const actions = {
  setAssets: (assets) => {
    return {
      type: constants.SET_ASSETS,
      payload: assets
    }
  },
  setBlocks: (blocks) => {
    return {
      type: constants.SET_BLOCKS,
      payload: blocks
    }
  },
  setCompartments: (compartments) => {
    return {
      type: constants.SET_COMPARTMENTS,
      payload: compartments
    }
  },
  setFields: (fields) => {
    return {
      type: constants.SET_FIELDS,
      payload: fields
    }
  },
  setHydrodynamicUnits: (hydrodynamicUnits) => {
    return {
      type: constants.SET_HYDRODYNAMIC_UNITS,
      payload: hydrodynamicUnits
    }
  },
  setLayers: (layers) => {
    return {
      type: constants.SET_LAYERS,
      payload: layers
    }
  },
  setSections: (sections) => {
    return {
      type: constants.SET_SECTIONS,
      payload: sections
    }
  },
  setWells: (wells) => {
    return {
      type: constants.SET_WELLS,
      payload: wells
    }
  },
};

// :: Reducer
const initialState = {
  entityTypes: {
    "Asset": { displayName: "Asset", collectionName: "assets"},
    "Block": { displayName: "Block", collectionName: "blocks"},
    "Compartment": { displayName: "Compartment", collectionName: "compartments"},
    "Field": { displayName: "Field", collectionName: "fields"},
    "Hydrodynamic Unit": { displayName: "Hydrodynamic Unit", collectionName: "hydrodynamicUnits"},
    "Layer": { displayName: "Layer", collectionName: "layers"},
    "Section": { displayName: "Section", collectionName: "sections"},
    "Well": { displayName: "Well", collectionName: "wells"}
  },
  assets: [],
  blocks: [],
  compartments: [],
  fields: [],
  hydrodynamicUnits: [],
  layers: [],
  sections: [],
  wells: [],
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case constants.SET_ASSETS:
      if (!action.payload) {
        return Object.assign({}, state, {
          assets: []
        });
      };
      let newAssets = action.payload;
      return Object.assign({}, state, {
        assets: newAssets
      });

    case constants.SET_BLOCKS:
      if (!action.payload) {
        return Object.assign({}, state, {
          blocks: []
        });
      };
      let newBlocks = action.payload;
      return Object.assign({}, state, {
        blocks: newBlocks
      });

    case constants.SET_COMPARTMENTS:
      if (!action.payload) {
        return Object.assign({}, state, {
          compartments: []
        });
      };
      let newCompartments = action.payload;
      return Object.assign({}, state, {
        compartments: newCompartments
      });

    case constants.SET_FIELDS:
      if (!action.payload) {
        return Object.assign({}, state, {
          fields: []
        });
      };
      let newFields = action.payload;
      return Object.assign({}, state, {
        fields: newFields
      });

    case constants.SET_HYDRODYNAMIC_UNITS:
      if (!action.payload) {
        return Object.assign({}, state, {
          hydrodynamicUnits: []
        });
      };
      let newHydrodynamicUnits = action.payload;
      return Object.assign({}, state, {
        hydrodynamicUnits: newHydrodynamicUnits
      });

    case constants.SET_LAYERS:
      if (!action.payload) {
        return Object.assign({}, state, {
          layers: []
        });
      };
      let newLayers = action.payload;
      return Object.assign({}, state, {
        layers: newLayers
      });

    case constants.SET_SECTIONS:
      if (!action.payload) {
        return Object.assign({}, state, {
          sections: []
        });
      };
      let newSections = action.payload;
      return Object.assign({}, state, {
        sections: newSections
      });

    case constants.SET_WELLS:
      if (!action.payload) {
        return Object.assign({}, state, {
          wells: []
        });
      };
      let newWells = action.payload;
      return Object.assign({}, state, {
        wells: newWells
      });

    default:
      return state;
  }
};