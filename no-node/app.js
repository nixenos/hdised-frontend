app_version = "v0.0.0-alpha"
app_name = "Log parser"

requests_base_url = "http://192.168.1.20:5000";

good_responses_count_total = 0;
redirect_responses_count_total = 0;
client_error_responses_count_total = 0;
server_error_responses_count_total = 0;

responses_count_total = 1;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const app = Vue.createApp({
  data() {
    return {
      backendName: app_name,
      backendVersion: app_version,
      goodResponsesTotalCount: 0,
      redirectResponsesTotalCount: 0,
      errorClientResponsesTotalCount: 0,
      errorServerResponsesTotalCount: 0,
      humanRequests: 0,
      botRequests: 0,
      mostVisitedEndpoint: "/",
      averageRequestCountPerIp: 1,
      totalResponsesCount: 1,
    }
  },
  mounted() {
    axios.get(requests_base_url+"/requests/all/count").then(response=>(this.totalResponsesCount=response.data.data[0]));
    axios.get(requests_base_url+"/responses/http-good/all/count")
         .then(response =>(this.goodResponsesTotalCount = response.data.data[0]));
    axios.get(requests_base_url)
         .then(response =>(this.backendName = response.data.app_name));
    axios.get(requests_base_url+"/responses/http-redirect/all/count")
         .then(response =>(this.redirectResponsesTotalCount = response.data.data[0]));
    axios.get(requests_base_url+"/responses/http-error-client/all/count")
         .then(response =>(this.errorClientResponsesTotalCount = response.data.data[0]));
    axios.get(requests_base_url+"/responses/http-error-server/all/count")
         .then(response =>(this.errorServerResponsesTotalCount = response.data.data[0]));
    axios.get(requests_base_url+"/requests/bots/count")
         .then(response =>(this.botRequests = response.data.data[0]));
    axios.get(requests_base_url+"/requests/humans/count")
         .then(response =>(this.humanRequests = response.data.data[0]));
    axios.get(requests_base_url+"/requests/count/average")
         .then(response =>(this.averageRequestCountPerIp = response.data.data[0]));
    axios.get(requests_base_url+"/requests/bots/count")
         .then(response =>(this.mostVisitedEndpoint = response.data.data[0]));
  }
})
