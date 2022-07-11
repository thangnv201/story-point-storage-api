import ForgeUI, { render, Text, Fragment, GlobalPage, useState,Table,Head,Cell,Row } from '@forge/ui';
import { storage, startsWith } from '@forge/api';
const App = () => {
  const [storypoint] = useState(async () => await storage.query().where('key', startsWith('issue-key-')).getMany())
  console.log(storypoint)
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
    </Fragment>
  );
};

export const run = render(
  <GlobalPage>
    <App />
  </GlobalPage>
);