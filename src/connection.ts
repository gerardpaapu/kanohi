import * as sqlite from 'sqlite'
import sqlite3 from 'sqlite3'
import * as sqliteVss from 'sqlite-vss'

const db = await sqlite.open({
  filename: 'articles.sqlite3',
  driver: sqlite3.Database,
})
sqliteVss.load(db as any)
export default db
