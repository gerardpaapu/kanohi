# Kanohi

This project is an excuse to play around with `sqlite-vss` an sqlite extension that
provides vector similarity search.

This is basically the [sqlite-vss](https://github.com/asg017/sqlite-vss) "headlines" example, with small changes
to run on node.

We're using a [sentence-transformer model](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) to
convert headlines to vectors, and then `vss_search()` to find similar headlines.

You'll need to get the News_Category_Dataset_v3.json off kaggle, or provide a similarly formatted JSON file

Run `npm run init` to initialise the database, then `npm run dev` to run the query.

The output will look something like this:

> Searching for similar headlines to: extended computer use linked to back problems in recent study
```javascript
[
  {
    headline: '10 Ways To Alleviate Tech Neck, According To Experts',
    url: 'https://www.huffpost.com/entry/ways-alleviate-tech-neck_l_617985f8e4b066de4f6b065b',
    distance: 1.312544584274292
  },
  {
    headline: 'Are Muscle Aches Or Back Pain A Symptom Of The Omicron COVID Variant?',
    url: 'https://www.huffpost.com/entry/muscle-aches-back-pain-omicron-covid_l_61e07d89e4b04bd27ed6de34',
    distance: 1.394210934638977
  },
  {
    headline: 'Clive Sinclair, Home Computing Pioneer, Dead At 81',
    url: 'https://www.huffpost.com/entry/clive-sinclair-dead_n_61448440e4b07ad8c8dea09d',
    distance: 1.4339333772659302
  },
  {
    headline: '22 Problem-Solving Products That Help Put An End To Pesky Home Issues',
    url: 'https://www.huffpost.com/entry/problem-solving-products-end-home-problems_l_61117f1de4b0be1936debd8c',
    distance: 1.4596682786941528
  },
  {
    headline: 'Cyberattack Prompts Los Angeles School District To Shut Down Its Computer Systems',
    url: 'https://www.huffpost.com/entry/ap-us-los-angeles-schools-cyberattack_n_63184088e4b046aa022f1bd4',
    distance: 1.4815170764923096
  }
]
```

