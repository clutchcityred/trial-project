import React, { forwardRef, useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import _ from 'lodash';

import {
  AddBox, ArrowDownward, Check, ChevronLeft, ChevronRight,
  Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage,
  Remove, SaveAlt, Search, ViewColumn
} from '@material-ui/icons';

import hierarchy from '../data/hierarchy.json';
import hierarchy2 from '../data/hierarchy2.json';

export default function EntitiesTable({ selectedEntity, entities }) {

  useEffect(() => {
    getHierarchyPath(hierarchy, "HierarchyPath");
    getHierarchyPath(hierarchy2, "Hierarchy2Path");
  });

  const getHierarchyPath = (hierarchyData, pathProperty) => {
    let hierarchyTree = treeify(hierarchyData.Relationship, 'title', 'parent', 'children');
    let flattenedHierarchy = flattenMyTree(hierarchyTree);

    _.forEach(entities, function(entity) {
      let entityInHierarchy = _.find(flattenedHierarchy, ['title', entity.Name]);
      entity[pathProperty] = entityInHierarchy ? entityInHierarchy.pathname : null;
    })
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
        columns={[
          { title: 'Name', field: 'Name' },
          { title: 'Entity', field: 'EntityTypeName' },
          { title: 'Alias', field: 'Alias' },
          { title: 'Hierarcy Path', field: 'HierarchyPath' },
          { title: 'Hierarcy 2 Path', field: 'Hierarchy2Path' },
        ]}
        data={entities}
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

function flattenMyTree(tree) {
  function recurse(nodes, path) {
      return _.map(nodes, function(node) {
          var newPath = _.union(path, [node.title]);
          return [
              _.assign({pathname: newPath.join(' > '), level: path.length}, _.omit(node, 'children')),
              recurse(node.children, newPath)
          ];
      });
  }
  return _.flattenDeep(recurse(tree, []));
}

function treeify(list, idAttr, parentAttr, childrenAttr) {
  if (!idAttr) idAttr = 'id';
  if (!parentAttr) parentAttr = 'parent';
  if (!childrenAttr) childrenAttr = 'children';

  var treeList = [];
  var lookup = {};
  list.forEach(function (obj) {
    lookup[obj[idAttr]] = obj;
    obj[childrenAttr] = [];
  });
  list.forEach(function (obj) {
    if (obj[parentAttr] != null) {
      lookup[obj[parentAttr]][childrenAttr].push(obj);
    } else {
      treeList.push(obj);
    }
  });
  return treeList;
};