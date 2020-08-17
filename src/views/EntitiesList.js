import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  makeStyles, List, ListItem, ListItemText, Select, MenuItem
} from '@material-ui/core'
import { PaginatedList } from 'react-paginated-list'

const useStyles = makeStyles(() => ({
  drawerContainer: {
    overflow: 'auto',
  },
}))

export default function EntitiesList({ saveSelectedEntity, selectedEntity, saveActiveEntities, activeEntities }) {
  const classes = useStyles()
  const entities = useSelector(state => state.entities)
  const entityTypes = useSelector(state => state.entities.entityTypes)
  const [selectedEntityType, setSelectedEntityType] = useState("");
  const [selectedEntityIndex, setSelectedEntityIndex] = useState(0);
  const [selectedListIndex, setSelectedListIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  useEffect(() => {
    let initialEntityType = Object.values(entityTypes)[selectedEntityIndex];
    setSelectedEntityType(initialEntityType);
    let entitiesData = entities[initialEntityType.collectionName];
    saveActiveEntities(entitiesData);
    saveSelectedEntity(entitiesData[selectedEntityIndex]);
  }, []);

  const handlePageChange = (items, currentPage) => {
    setCurrentPage(currentPage);
  };

  const handleListItemClick = (event, index) => {
    let selectedIndex = (currentPage - 1) * pageSize + index;
    setSelectedListIndex(index);
    setSelectedEntityIndex(selectedIndex);
    saveSelectedEntity(activeEntities[selectedIndex]);
  };

  const handleEntityTypeChange = (event) => {
    let newSelectedEntityType = event.target.value;
    setSelectedEntityType(newSelectedEntityType);
    let entitiesData = entities[newSelectedEntityType.collectionName];
    saveActiveEntities(entitiesData);
    let resetEntityIndex = 0;
    setSelectedListIndex(resetEntityIndex);
    setSelectedEntityIndex(resetEntityIndex);
    saveSelectedEntity(entitiesData[resetEntityIndex]);
    setCurrentPage(1);
  };

  const EntityListItem = ({ entity, index }) =>
    <ListItem
      className="entity"
      button
      selected={selectedListIndex === index}
      onClick={(event) => handleListItemClick(event, index)}
    >
      <ListItemText primary={entity.Name} />
    </ListItem>;

  return (
    <div className={classes.drawerContainer}>
      {
        selectedEntity ?
          <h1>{selectedEntity.Name}</h1>
          : false
      }
      <Select
        labelId="entity-type-select-label"
        id="entity-type-select"
        value={selectedEntityType}
        onChange={handleEntityTypeChange}
      >
        {Object.values(entityTypes).map((entityType, index) => (
          <MenuItem
            key={index}
            className="entityTypeMenuItem"
            value={entityType}
          >
            {entityType.displayName}
          </MenuItem>
        ))}
      </Select>
      <List>
        <PaginatedList
          list={activeEntities}
          itemsPerPage={pageSize}
          onPageChange={handlePageChange}
          currentPage={currentPage}
          renderList={(list) => (
            <>
              {list.map((entity, index) => (
                <EntityListItem
                  key={index}
                  index={index}
                  entity={entity}
                />
              ))}
            </>
          )}
        />
      </List>
    </div>
  )
}
