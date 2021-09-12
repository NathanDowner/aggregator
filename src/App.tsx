import SideBar from './components/SideBar';

import { Feed } from './models/feed.model';
import { useState } from 'react';
import MainDisplay from './components/MainDisplay';

const feeds: Feed[] = [
  {
    name: 'Tech News',
    sources: [
      { name: 'CNCNETET', link: 'https://www.cnet.com/rss/all/' },
      { name: 'FPT', link: 'https://www.frontpagetech.com/feed/' },
    ],
  },
  { name: 'feed 2', sources: [{ name: 'CNET', link: '' }] },
  { name: 'feed 3', sources: [{ name: 'CNET', link: '' }] },
];

function App() {
  const [activeFeedIndex, setActiveFeedIndex] = useState(0);
  return (
    <div className="flex min-h-full">
      <SideBar
        feeds={feeds}
        activeFeedIndex={activeFeedIndex}
        setActiveFeed={setActiveFeedIndex}
      />
      <MainDisplay currentFeed={feeds[activeFeedIndex]} />
    </div>
  );
}

export default App;
