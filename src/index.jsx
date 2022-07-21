import ForgeUI, { render, Text, Fragment, GlobalPage, useState, Table, Head, Cell, Row } from '@forge/ui';
import { storage, startsWith, properties } from '@forge/api';
const App = () => {
  const [storypoint] = useState(async () => await storage.query().where('key', startsWith('issue-key-')).getMany());

  const [hello] = useState(async () => await properties.onJiraIssue("HEL-7").get('testing'));

  console.log(storypoint)
  console.log(hello);

  return (
    <Fragment>
      <Table>
        <Head>
          <Cell>
            <Text>Issue Key</Text>
          </Cell>
          <Cell>
            <Text>Story Point</Text>
          </Cell>
        </Head>
        {storypoint.results.map(issue => (
          <Row>
            <Cell>
              <Text>{issue.value.issueKey}</Text>
            </Cell>
            <Cell>
              <Text>{issue.value.storyPoint}</Text>
            </Cell>

          </Row>
        ))}
      </Table>
      <Text>Properties value : {hello}</Text>
    </Fragment>
  );
};

export const run = render(
  <GlobalPage>
    <App />
  </GlobalPage>
);