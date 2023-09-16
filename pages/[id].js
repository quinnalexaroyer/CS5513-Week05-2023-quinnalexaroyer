import Layout from '../components/layout';
import {getAllIds} from '../lib/data';
import {getData} from '../lib/data';
import {getStateName} from '../lib/data';

export async function getStaticProps({params}) {
  const it = await getData(params.id);
  return {
    props: {
      it
    }
  };
}

export async function getStaticPaths() {
  const paths = getAllIds();
  return {paths, fallback:false};
}

export default function Entry( {it} ) {
  return (
    <Layout>
      <article className="presidentInfo">
        <h2>{it.name}</h2>
        <table>
          <tr><td>Date of birth</td><td>{it.birthdate}</td></tr>
          <tr><td>Date of death</td><td>{it.deathdate}</td></tr>
          <tr><td>Start of term</td><td>{it.startTerm}</td></tr>
          <tr><td>End of term</td><td>{it.endTerm}</td></tr>
          <tr><td>Home state</td><td>{it.homestate}</td></tr>
          <tr><td>Party</td><td>{it.party}</td></tr>
          <tr><td>Predecessor</td><td><a href={`/${it.id-1}`}>Prev</a>
</td></tr>
          <tr><td>Successor</td><td><a href={`/${it.id+1}`}>Next</a></td></tr>
        </table>
      </article>
    </Layout>
  );
}