app_version = "v0.0.0-alpha"
app_name = "Log parser"

fetch('http://192.168.1.20:5000/')
    .then(
    function(response) {
        if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
            response.status);
        return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
          app_version = data.version;
          app_name = data.app_name;
        });
    }
    )
    .catch(function(err) {
    console.log('Fetch Error :-S', err);
    });

const app = Vue.createApp({
  data() {
    return {
      backendName: app_name,
      backendVersion: app_version
    }
  }
})
