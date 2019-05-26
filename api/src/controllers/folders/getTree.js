const { Folder } = require('./../../models')

function buildHierarchy(arry) {
  var roots = [],
    children = {}

  // find the top level nodes and hash the children based on parent
  for (var i = 0, len = arry.length; i < len; ++i) {
    var item = arry[i],
      p = item.parent,
      target = !p ? roots : children[p] || (children[p] = [])

    target.push({ value: item })
  }

  // function to recursively build the tree
  var findChildren = function(parent) {
    if (children[parent.value._id]) {
      parent.children = children[parent.value._id]
      for (var i = 0, len = parent.children.length; i < len; ++i) {
        findChildren(parent.children[i])
      }
    }
  }

  // enumerate through to handle the case where there are multiple roots
  for (var i = 0, len = roots.length; i < len; ++i) {
    findChildren(roots[i])
  }

  return roots
}

async function getTree(req, res) {
  try {
    const folders = await Folder.find().select('_id name parent')

    res.send(buildHierarchy(folders))
  } catch (err) {
    res.status(400).send('Erorr during getting folders tree')
  }
}

module.exports = getTree
