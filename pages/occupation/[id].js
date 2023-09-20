import Layout from '../../components/layout';
import {getAllOccupations} from '../../lib/data';
import {getDataByOccupation} from '../../lib/data';

export async function getStaticProps({params}) {
  const it = await getDataByOccupation(params.id);
  return {
    props: {
      it
    }
  };
}

export async function getStaticPaths() {
  const paths = getAllOccupations();
  return {paths, fallback:false};
}

export default function Entry( {it} ) {
  return (
    <Layout>
      <article className="presidentInfo">
        <h2>Presidents by occupation</h2>
        <ul>
        {it.map(
          ({id, name}) => (
            <li key={id}><a href={`/president/${id}`}>{name}</a></li>
          )
        )}
        </ul>
      </article>
    </Layout>
  );
}