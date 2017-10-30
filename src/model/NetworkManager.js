
import axios from 'axios';


const axiosEndpointManager = axios.create ({
  baseURL: 'https://api.instagram.com/v1/users/',
  timeout: 20000
});

const responseState = {
  unsent: 0,
  opened: 1,
  headersRecieved: 2,
  loading: 3,
  done: 4
}

class NetworkManager{

  constructor(accessToken){
    this.accessToken = accessToken
  }

  getLoggedInUserInformation(completionCallback){
    axiosEndpointManager.get('self/?access_token=' + this.accessToken)
    .then(response => {
      console.log(response);
      if (response.request.readyState == responseState.done){
        completionCallback(response.data);
      }

    })
    .catch(response => {
      console.log("Ooops this is an error")
      console.log(response)
    });

  }


}
export {NetworkManager};
