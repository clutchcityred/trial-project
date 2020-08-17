import React, { forwardRef } from 'react'
import { useSelector } from 'react-redux'
import MaterialTable from 'material-table'
import _ from 'lodash';

import {
  AddBox, ArrowDownward, Check, ChevronLeft, ChevronRight,
  Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage,
  Remove, SaveAlt, Search, ViewColumn
} from '@material-ui/icons';

export default function EntitiesTable({ selectedEntity, activeEntities }) {
  const hierarchyNames = useSelector(state => state.hierarchies.hierarchyNames);

  const getColumns = () => {
    console.log(activeEntities);
    let columns = [
      { title: 'Name', field: 'Name' },
      { title: 'Entity', field: 'EntityTypeName' },
      { title: 'Alias', field: 'Alias' },
    ];
    _.forEach(hierarchyNames, function(hierarchyName) {
      columns.push({ title: hierarchyName, field: hierarchyName });
    });
    return columns;
  }

  return (
    <div>
      <h1>Entities Table</h1>
      {
        selectedEntity ?
          <h2>{selectedEntity.Name}</h2>
          : false
      }
      <MaterialTable
        columns={getColumns()}
        data={activeEntities}
        title="Demo Title"
        icons={tableIcons}
      />
    </div>
  );
}

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
