import Masonry from 'react-masonry-css';
import { FeedArticle } from '../models/feed.model';
import Article from './Article';

type NewsFeedProps = {
  articles: FeedArticle[];
};

const NewsFeed: React.FC<NewsFeedProps> = ({ articles }) => {
  const breakpointColumnsObj = {
    950: 1,
    1360: 2,
    default: 3,
  };

  if (articles.length === 0) {
    return (
      <div className="h-full text-gray-600">
        <p>Add Sources to view articles here!</p>
      </div>
    );
  }

  return (
    // <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="masonry-grid"
      columnClassName="masonry-grid-column"
    >
      {articles.map((article, idx) => (
        <Article key={idx} article={article} />
      ))}
    </Masonry>
  );
};

export default NewsFeed;
