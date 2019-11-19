import axios from 'axios';

// const instance = axios.create();

export const initiAxios = async () => {
  await axios.post(`https://dev-m10gt4a4.auth0.com/oauth/token`, {
    headers: {
      'content-type': 'application/json'
    },
    body: `{"client_id": ${process.env.AUTH0_CLIENT_ID},"client_secret":${process.env.AUTH0_CLIENT_SECRET},"audience":${process.env.AUTH0_API},"grant_type":"client_credentials"}`
  }).then(data => {
    console.log(data)
    // instance.defaults.headers.common.Authorization = `Bearer ${token}`;

  }).catch(err => {
    console.log(err)
  })

}
