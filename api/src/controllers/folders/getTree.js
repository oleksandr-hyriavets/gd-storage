const { Folder } = require('./../../models')

function buildHierarchy(arry) {
  var roots = [],
    children = {}

  // find the top level nodes and hash the children based on parent
  for (var i = 0, len = arry.length; i < len; ++i) {
    var item = arry[i],
      p = item.parent,
      target = !p ? roots : children[p] || (children[p] = [])

    target.push({ ...item })
  }

  // function to recursively build the tree
  var findChildren = function(parent) {
    if (children[parent._id]) {
      parent.children = children[parent._id]
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

    console.log('FOLDERS', folders)

    const hierarchicalFolders = buildHierarchy(
      JSON.parse(JSON.stringify(folders)),
    )

    console.log('hierarchicalFolders', hierarchicalFolders)

    res.send(hierarchicalFolders)
  } catch (err) {
    res.status(400).send('Erorr during getting folders tree')
  }
}

module.exports = getTree
