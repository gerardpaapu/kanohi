import db from './connection.ts'
import { pipeline } from '@xenova/transformers'
import * as FS from 'node:fs/promises'

// any more than this made my computer very sad
const MAX_RECORDS = 5_000

await db.run(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY,
    headline TEXT,
    headline_embedding BLOB,
    description TEXT,
    description_embedding BLOB,
    url TEXT
  ) STRICT;
`)

await db.run(`
CREATE VIRTUAL TABLE vss_articles USING vss0(
  headline_embedding(384),
  description_embedding(384),
);
`)
console.time('loading model')
const extractor = await pipeline(
  'feature-extraction',
  'Xenova/all-MiniLM-L6-v2'
)

console.timeEnd('loading model')

console.time('ingesting data')
const lines = await FS.readFile('./News_Category_Dataset_v3.json', 'utf8')
for (const line of lines.split('\n').slice(0, MAX_RECORDS)) {
  if (!line.trim()) {
    continue
  }
  const data = JSON.parse(line)
  if (data.headline == null || data.short_description == null) {
    console.error('weird item', data)
    continue
  }

  const headline_embedding = await extractor(data.headline, {
    pooling: 'mean',
    normalize: true,
  })

  const description_embedding = await extractor(data.short_description, {
    pooling: 'mean',
    normalize: true,
  })

  await db.run(
    `INSERT INTO articles (headline, description, url, headline_embedding, description_embedding) VALUES (?, ?, ?, ?, ?)`,
    [
      data.headline,
      data.short_description,
      data.link,
      headline_embedding.data,
      description_embedding.data,
    ]
  )
}
console.timeEnd('ingesting data')

// now build the index for vss
console.time('building vss index')
await db.run(`
insert into vss_articles(rowid, headline_embedding, description_embedding)
select 
  rowid,
  headline_embedding,
  description_embedding
from articles;
`)
console.timeEnd('building vss index')
