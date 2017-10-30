
import axios from 'axios';


const axiosEndpointManager = axios.create ({
  baseURL: 'https://api.instagram.com/v1/users/',
  timeout: 20000
});

class NetworkManager{

  constructor(accessToken){
    this.accessToken = accessToken
  }

  getLoggedInUserInformation(){
    axiosEndpointManager.get('self/?access_token=' + this.accessToken)
    .then(response => {
      console.log(response.data);
    })
    .catch(response => {
      console.log("Ooops this is an error")
      console.log(response)
    });

  }


}
export {NetworkManager};
