import Categories from './components/Categories';
import database from './database/database';

export default async function Home() {
    await database();
    return <Categories />;
}
