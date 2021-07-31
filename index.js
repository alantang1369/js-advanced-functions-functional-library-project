const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, iteratee) {
      const newCollection = (collection instanceof Array) ? collection.slice() : Object.values(collection)

      for (let idx = 0; idx < newCollection.length; idx++)
        iteratee(newCollection[idx])

      return collection
    },

    map: function(collection, iteratee) {
      let newCollection = (collection instanceof Array)? collection : Object.values(collection)
      let returnArray = []
      for ( let i= 0; i< newCollection.length; i++){
         returnArray.push(iteratee(newCollection[i]))
      }
      return returnArray;
    },

    reduce: function(col, iteratee, acc) {
      let collection = col.slice(0)

			if (!acc) {
				acc = collection[0]
				collection = collection.slice(1)
			}
			for (let i = 0; i < collection.length; i++) {
				acc = iteratee(acc, collection[i], collection)
			}
			return acc;
    },

    find: function(collection, predicate) {
      for (let i= 0; i< collection.length; i++){
        if (predicate(collection[i])){
          return collection[i]
        }
      }
      return undefined;  
    },

    filter: function(collection, predicate){
      let newCol = [];
      for (let i= 0; i< collection.length; i++){
        if (predicate(collection[i])){
          newCol.push( collection[i])
        }
      }
      return newCol;  
    },

    size: function(collection){
      let newCol = (collection instanceof Array)? collection : Object.keys(collection);
      return newCol.length
    },

    first: function(array, n = false){
      return (n) ? array.slice(0, n) : array[0]
      //return array.slice().splice(0,n)
    },

    last: function(array,n = false){
      return (n)? array.slice(-n): array[array.length -1]

    },

    compact: function(array){
      return array.filter(e => !!e )
    },

    sortBy: function(array, callback){
      const newArray = array.slice()
      
      return newArray.sort(function(a,b){
        return callback(a) - callback(b)
      })
    },

    unpack: function(receiver, arr) {
      for (let val of arr)
        receiver.push(val)
    },

    flatten: function(collection, shallow, newArr=[]) {
      if (!Array.isArray(collection)) return newArr.push(collection)
      if (shallow) {
        for (let val of collection)
          Array.isArray(val) ? this.unpack(newArr, val) : newArr.push(val)
      } else {
        for (let val of collection) {
          this.flatten(val, false, newArr)
        }
      }
      return newArr
    },
    
    uniqSorted: function(collection, iteratee) {
      const sorted = [collection[0]]
      for (let idx = 1; idx < collection.length; idx++) {
        if (sorted[idx-1] !== collection[idx])
          sorted.push(collection[idx])
      }
      return sorted
    },

    uniq: function(collection, sorted=false, iteratee=false) {
      if (sorted) {
        return fi.uniqSorted(collection, iteratee)
      } else if (!iteratee) {
        return Array.from(new Set(collection))
      } else {
        const modifiedVals = new Set()
        const uniqVals = new Set()
        for (let val of collection) {
          const moddedVal = iteratee(val)
          if (!modifiedVals.has(moddedVal)) {
            modifiedVals.add(moddedVal)
            uniqVals.add(val)
          }
        }
        return Array.from(uniqVals)
      }
    },
    keys: function(obj) {
      // Using for loop
      const keys = []
      for (let key in obj){
        keys.push(key)
      }
      return keys
    },

    values: function(obj) {
      // Using for loop
      const values = []
      for (let key in obj){
        values.push(obj[key])
      }
      return values

      // Using the custom 'map' method from above
      // return this.map(obj, (value) => value)

    },

    functions: function(obj) {
      const functionNames = []

      for (let key in obj) {
        if (typeof obj[key] === "function"){
          functionNames.push(key)
        }
      }

      return functionNames.sort()
    },



  }
})()

fi.libraryMethod()
