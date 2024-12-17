// Retrieves project source code from non-editable projects

const channelID = getChannelID();

function getCode(){
  fetch(`https://studio.code.org/v3/sources/${channelID}/main.json`, { // main.json returns the html and the project source code
      method: 'GET'
  })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();  // Parse the JSON response
    })
    .then(data => {
        console.log(data.source);
    })
    .catch(error => {
        console.error('Error with GET request to main.json:', error);
    });
}

function getChannelID(){
  let scriptTag = document.querySelector('script');
  let scriptContent = scriptTag.textContent || scriptTag.innerText;
  let extractedData;

  try {
      eval(scriptContent);  // Execute the script
      return appOptions.channel; // channel ID for the lesson
  } catch (error) {
      console.error('Error extracting data:', error);
  }
}

getCode();