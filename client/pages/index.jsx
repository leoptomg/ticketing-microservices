import buildClient from '../api/build-client'

const LandingPage = ({ currentUser }) => {
  return currentUser ? <h1>You are signed in</h1> : <h1>You are signed out</h1>
};

LandingPage.getInitialProps = async (ctx) => {
  const client = buildClient(ctx)
  const { data } = await client.get('/api/users/currentuser')

  return data
};

export default LandingPage;
