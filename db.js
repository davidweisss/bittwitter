fs = require('fs')

var dbExists = ( id, dataPath, rootPath=rootPath) => fs.existsSync(rootPath+dataPath+id+".json")

var dbRead = (id,  dataPath, rootPath=rootPath) => JSON.parse(fs.readFileSync(rootPath+dataPath+id+".json"))

var dbWrite = (record, id, dataPath, rootPath=rootPath)  => {
  fs.writeFileSync(rootPath+dataPath+id+".json",JSON.stringify(record, null, 2))
}

var dbRemove = (id, dataPath, rootPath) => {
  if(dbExists(id)){
    fs.unlinkSync(rootPath+dataPath+id+".json")}
}

var dbIDs = (dataPath, rootPath=rootPath) => {
  var ids = fs.readdirSync(rootPath+dataPath)
  ids=  ids.map(x => x.split(".")).map(x=>x[0])
  return(ids)
}

var dbExists = (id, dataPath, rootPath=rootPath) => fs.existsSync(rootPath+dataPath+id+".json")

module.exports= { 
  dbExists: dbExists, 
  dbRead: dbRead, 
  dbWrite: dbWrite, 
  dbRemove: dbRemove, 
  dbIDs: dbIDs
} 
