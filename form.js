import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const answers = require('./answers.js')
  const options = answers.slice(1).map((ans, i)=>{
    return {
      "label": ans.label, "name": String(i+1)
    }
  })

  const fields = {
    "state": null,
    "fields": [
      {
        "name": "question",
        "label": "Which Question?",
        "description": "Which question are your trying to answer?",
        "type": "select",
        "required": true,
        "default": "1",
        "options": options
      }
    ]
  }

  try {
    return success(fields);
  } catch (e) {
    return failure({ status: false });
  }
}
