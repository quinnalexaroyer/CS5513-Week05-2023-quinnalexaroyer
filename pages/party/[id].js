import Layout from '../../components/layout';
import {getAllParties} from '../../lib/data';
import {getDataByParty} from '../../lib/data';

export async function getStaticProps({params}) {
  const it = await getDataByParty(params.id);
  return {
    props: {
      it
    }
  };
}

export async function getStaticPaths() {
  const paths = getAllParties();
  return {paths, fallback:false};
}

export default function Entry( {it} ) {
  return (
    <Layout>
      <article className="presidentInfo">
        <h2>{it[0].party} Party</h2>
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