import { serverClient } from '../app/_trpc/serverClient';

const Home = async () => {

  const test = await serverClient.test();

  return (
    <div>
      <div>Hello word</div>
      {test.data}
    </div>
  );
}


export default Home;