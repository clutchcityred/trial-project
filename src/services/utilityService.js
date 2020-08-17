import _ from 'lodash'

export function flattenMyTree(tree) {
  function recurse(nodes, path) {
    return _.map(nodes, function (node) {
      var newPath = _.union(path, [node.title]);
      return [
        _.assign({ pathname: newPath.join(' > '), level: path.length }, _.omit(node, 'children')),
        recurse(node.children, newPath)
      ];
    });
  }
  return _.flattenDeep(recurse(tree, []));
}

export function treeify(list) {
  let idAttribute = 'title';
  let parentAttribute = 'parent';
  let childrenAttribute = 'children';

  var treeList = [];
  var lookup = {};
  list.forEach(function (obj) {
    lookup[obj[idAttribute]] = obj;
    obj[childrenAttribute] = [];
  });
  list.forEach(function (obj) {
    if (obj[parentAttribute] != null) {
      lookup[obj[parentAttribute]][childrenAttribute].push(obj);
    } else {
      treeList.push(obj);
    }
  });
  return treeList;
};