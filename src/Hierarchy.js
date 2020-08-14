import React, { useState, useEffect } from 'react'
import {
  Select, MenuItem
} from '@material-ui/core'
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import hierarchy from './data/hierarchy.json';
import hierarchy2 from './data/hierarchy2.json';

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

const hierarchies = [hierarchy, hierarchy2];

export default function Hierarchy() {
  const [selectedHierarchy, setSelectedHierarchy] = useState([]);
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    setSelectedHierarchy(hierarchies[0]);
    setTreeData(treeify(hierarchies[0].Relationship, 'title', 'parent', 'children'));
  }, []);

  const handleHierarchyChange = (event) => {
    let newSelectedHierarchy = event.target.value;
    setSelectedHierarchy(newSelectedHierarchy);
    setTreeData(treeify(newSelectedHierarchy.Relationship, 'title', 'parent', 'children'));
  };

  return (
    <div style={{ height: 1000 }}>
      <Select
        labelId="entity-type-select-label"
        id="entity-type-select"
        value={selectedHierarchy}
        onChange={handleHierarchyChange}
      >
        {hierarchies.map((hierarchy, index) => (
          <MenuItem
            key={index}
            className="hierarchyMenuItem"
            value={hierarchy}
          >
            {hierarchy.Name}
          </MenuItem>
        ))}
      </Select>
      <SortableTree
        treeData={treeData}
        onChange={treeData => setTreeData(treeData)}
        style={{ color: "black" }}
      />
    </div>
  );
}