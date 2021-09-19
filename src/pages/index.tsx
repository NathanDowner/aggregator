import Head from 'next/head';
import { useState } from 'react';
import MainDisplay from '../components/MainDisplay';
import SideBar from '../components/SideBar';
import { Feed } from '../models/feed.model';

// const feeds: Feed[] = [
//   {
//     name: 'Tech News',
//     sources: [
//       { name: 'CNET', link: 'https://feed.cnet.com/feed/all' },
//       { name: 'FPT', link: 'https://www.frontpagetech.com/feed/' },
//       { name: '9to5 Mac', link: 'https://9to5mac.com/feed/' },
//     ],
//   },
//   {
//     name: 'World News',
//     sources: [
//       { name: 'CNN', link: 'http://rss.cnn.com/rss/edition_world.rss' },
//     ],
//   }
// ];

export default function Home() {
  const [activeFeedIndex, setActiveFeedIndex] = useState(0);
  const [feeds, setFeeds] = useState<Feed[]>([
    {
      name: 'Tech News',
      sources: [
        { name: 'CNET', link: 'https://feed.cnet.com/feed/all' },
        { name: 'FPT', link: 'https://www.frontpagetech.com/feed/' },
        { name: '9to5 Mac', link: 'https://9to5mac.com/feed/' },
      ],
    },
    {
      name: 'World News',
      sources: [
        { name: 'CNN', link: 'http://rss.cnn.com/rss/edition_world.rss' },
      ],
    },
  ]);
  return (
    <div className="flex min-h-full">
      <Head>
        <title>Aggregator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SideBar
        feeds={feeds}
        activeFeedIndex={activeFeedIndex}
        setActiveFeed={setActiveFeedIndex}
      />
      <MainDisplay currentFeed={feeds[activeFeedIndex]} />
    </div>
  );
}
