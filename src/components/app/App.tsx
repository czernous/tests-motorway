import Header from '../header/Header';
import ImageList from '../image-list';

import styles from './App.module.scss';

/*
 * Available endpoints
 * http://localhost:8000/api/tags - to return all tags in
 * http://localhost:8000/api/tags?tag=fe - to return matching tags
 * http://localhost:8000/api/cars - to return all cars
 * http://localhost:8000/api/cars?tag=ferrari - to return matching cars
 */

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <ImageList />
      </main>
    </>
  );
};

export default App;
