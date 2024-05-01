import { pipeline } from '@xenova/transformers'
import db from './connection.ts'

const EXAMPLE_TEXT =
  'extended computer use linked to back problems in recent study'
const extractor = await pipeline(
  'feature-extraction',
  'Xenova/all-MiniLM-L6-v2'
)
const query = await extractor(EXAMPLE_TEXT, {
  pooling: 'mean',
  normalize: true,
})

const results = await db.all(
  `
with matches as (
  select rowid, distance
  from vss_articles
  where vss_search(
    headline_embedding,
    ?
  )
  limit 5
) 
select headline, url, distance
from matches
left join articles
on matches.rowid = articles.rowid
`,
  [query.data]
)

console.log(`Searching for similar headlines to: ${EXAMPLE_TEXT}`)
console.log(results)
