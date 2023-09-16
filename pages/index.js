import Layout from '../components/layout';
import { getSortedList } from '../lib/data';
import Link from 'next/link';

export async function getStaticProps() {
  const presidentsData = getSortedList();
  return {props: {presidentsData}};
}

export default function Home({presidentsData}) {
  return (
    <Layout home>
      <div className="list-group">
        {presidentsData.map(
          ({id, name}) => (
            <Link key={id} href={`/${id}`} className="list-group-item list-group-item-action">
              {name}
            </Link>
          )
        )}
      </div>
    </Layout>
  );
}