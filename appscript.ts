/*
Setup env var in setting
Add trigger event
 */

const prop = PropertiesService.getScriptProperties()
var token = prop.getProperty("GITHUB_API_KEY");
var handle = prop.getProperty("OWNER");
var repo = prop.getProperty("REPO");
function onFormSubmit(e)
{
    const payload = dataFormat(e);
    var options = {
      "method": "POST",
      "headers": {
        "Authorization": "Bearer " + token,
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      },
      "contentType": "application/json",
      "payload": JSON.stringify(payload),
      "muteHttpExceptions": true
    };
   var response = UrlFetchApp.fetch("https://api.github.com/repos/" + handle + "/" + repo + "/issues", options);
}

function dataFormat(e){
  const timestamp = e.values[0];
  const email = e.values[1] || "Unknown";
  const type = getType(e.values[3]);
  const devices = e.values[4];
  const page = e.values[5] || "Not Specify";
  const description = e.values[6];
  const resources = getResource(e.values[7]);

  const title = type?`[${type}] - ${e.values[2]}`: `${e.values[2]}`;
  Logger.log(resources);
  const body = `
  This is an automatic issue from feedback form

  **Reported by:** ${email} 

  ## Issue details:
  - **Issued at:** ${timestamp}
  - **Devices:** ${devices}
  - **Page:** ${page}
  - **Description:**  
  ${description}

  **Additional resources:**  
  ${resources}  
  `
  return {
    "title": title,
    "body": body
  }
}

function getType(type){
  if (type === null) return '';

  if (type.includes('Visual')) return'Visual';
  else if (type.includes('Functional')) return 'Functional';
  else return 'Other';
}

function getResource(resource){
  let src = 'None';
  if (!resource || resource.trim() == ""){
    return src;
  }
  const resourceList = resource.split(/[,;\n\s]+/).map(r => r.trim()).filter(r => r);
    src = resourceList.map(r => {
      return `- ${r}`;
    }).join('  \n');
  return src;
}
function test(){
  const data = {
    values:[
      "1/4/2026 17:00:37",	"ddd@ddd.dd",	"dddd",	"Visual Issue (i.e. image out of place, overlapping content, ...)"	,"d",	"d",	"d", "https://drive.google.com/open?id=1pXl_XGCFoXaBq0UwoQaEifCaUz8FJBYd, https://drive.google.com/open?id=1z9N2QCAwMDSyK6yWp8ER8ANqL2WIujOs"
    ]
  }
  onFormSubmit(data)
}