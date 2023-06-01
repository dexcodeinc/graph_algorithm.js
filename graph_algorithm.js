(function() {
  var WHITE = 0
  var GRAY = 1
  var BLACK = 2

  var GraphAlgorithm = {
    /**
     * Detects loops in a directed graph using a graph coloring algorithm.
     *
     * @param {Array} vertices - An array of vertices. Each vertex can be either 
     *    an integer or a string.
     * @param {Array} edges - An array of edges. Each edge is represented as an array of length 2, 
     *    specifying the source and destination vertices. Format: [source, destination].
     *
     * @returns {Object} An object indicating whether a loop is present and, if so, the vertices 
     *    forming the loop. The return value has the following structure:
     *     - hasLoop: A boolean value indicating whether a loop is present in the graph.
     *     - loop: An array of vertices forming the loop, listed in the order they are encountered 
     *       during traversal.
     */
    hasLoop: function(vertices, edges) {
      var colors = {}
      var path = []

      // Initialize colors to white
      for (var i=0; i<vertices.length; ++i) {
        colors[vertices[i]] = WHITE
      }

      // For all vertices, do DFS traversal
      for (var i=0; i<vertices.length; ++i) {
        var vertex = vertices[i]
        if (colors[vertex] == WHITE) {
          var result = this._hasLoopDFS(vertices, edges, colors, path, vertex)

          if (result.hasLoop) {
            return result
          }
        }
      }

      return { hasLoop: false }
    },

    _hasLoopDFS: function(vertices, edges, colors, path, vertex) {
      colors[vertex] = GRAY
      path.push(vertex)

      var adjacentEdges = []
      for (var i=0; i<edges.length; ++i) {
        var edge = edges[i]
        if (edge[0] == vertex) {
          adjacentEdges.push(edge)
        }
      }

      for (var i=0; i<adjacentEdges.length; ++i) {
        var edge = adjacentEdges[i]
        var adjVertex = edge[1]

        if (colors[adjVertex] == GRAY) {
          var loop = path.slice(path.indexOf(adjVertex))
          return { hasLoop: true, loop: loop }
        }

        if (colors[adjVertex] == WHITE) {
          var result = this._hasLoopDFS(vertices, edges, colors, path, adjVertex)
          if (result.hasLoop) {
            return result
          }
        }
      }

      colors[vertex] = BLACK
      path.pop(vertex)

      return { hasLoop: false }
    }
  }

  window.GraphAlgorithm = GraphAlgorithm
})()
