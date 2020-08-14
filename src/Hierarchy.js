import React, { useState, useEffect } from 'react'
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import hierarchy from './data/hierarchy.json';

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

export default function Hierarchy() {
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    setTreeData(treeify(hierarchy.Relationship, 'title', 'parent', 'children'));
  }, []);

  return (
    <div style={{ height: 1000 }}>
      <SortableTree
        treeData={treeData}
        onChange={treeData => setTreeData(treeData)}
        style={{color:"black"}}
      />
    </div>
  );
}