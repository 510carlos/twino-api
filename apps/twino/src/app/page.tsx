import { serverClient } from '../lib/trpc/serverClient';

const Home = async () => {
  const test = await serverClient.test.hello();

  return (
    <div>
      <div>Hello world</div>
      {test.data}
    </div>
  );
}


export default Home;
