import Layout from '../../components/layout';
import {getAllIds} from '../../lib/data';
import {getData} from '../../lib/data';

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
        <h2>{it.president.name}</h2>
        <table>
          <tr><td>Date of birth</td><td>{it.birthdate}</td></tr>
          <tr><td>Date of death</td><td>{it.deathdate}</td></tr>
          <tr><td>Start of term</td><td>{it.startTerm}</td></tr>
          <tr><td>End of term</td><td>{it.endTerm}</td></tr>
          <tr><td>Home state</td>
            <td><a href={`/state/${it.president.homestate}`}>{it.stateName}</a></td>
          </tr>
          <tr><td>Party</td>
            <td><a href={`/party/${it.president.party}`}>{it.president.party}</a></td>
          </tr>
          <tr><td>Occupations</td>
            <td>
        {it.occupations.map(
          ({job, slug}) => (
            <span key={slug}> <a href={`/occupation/${slug}`}>{job}</a> </span>
          )
        )}
            </td>
          </tr>
          <tr><td>Predecessor</td>
            <td><a href={it.prev.id}>{it.prev.name}</a></td>
          </tr>
          <tr><td>Successor</td>
            <td><a href={it.next.id}>{it.next.name}</a></td>
          </tr>
        </table>
      </article>
    </Layout>
  );
}