import Layout from '../../components/layout';
import {getAllStates} from '../../lib/data';
import {getDataByState} from '../../lib/data';

export async function getStaticProps({params}) {
  const it = await getDataByState(params.id);
  return {
    props: {
      it
    }
  };
}

export async function getStaticPaths() {
  const paths = getAllStates();
  return {paths, fallback:false};
}

export default function Entry( {it} ) {
  return (
    <Layout>
      <article className="presidentInfo">
        <h2>Presidents from {it.stateName}</h2>
        <ul>
        {it.data.map(
          ({id, name}) => (
            <li key={id}><a href={`/president/${id}`}>{name}</a></li>
          )
        )}
        </ul>
      </article>
    </Layout>
  );
}