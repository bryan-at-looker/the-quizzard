import { success, failure } from "./libs/response-lib";
import {createEmailHTML} from "./libs/send-email"
import {bigquery} from "./libs/send-bigquery"
import {check_question, clean} from './libs/check-answers'


export function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const body = JSON.parse(event.body);

  const scheduled_plan = body.scheduled_plan;
  const {url, scheduled_plan_id} = scheduled_plan;
  const {email, user_id} = body.data;
  const {question} = body.form_params;
  const details = (body.attachment && body.attachment.data) ? JSON.parse(body.attachment.data) : null

  var {query} = scheduled_plan
  query['data'] = (details) ? details.data : null
  query['num_rows'] = (details) ? details.data.length : null


  const answers = require('./answers.js')

  const answer = answers[Number(question)];
  var passed = true;

  var results = check_question(query, answer)
  var results_clean = clean(results)


  for (var key in results_clean) {
    if (results_clean[key].check == false) {
      passed = false;
    }
  }

  var email_obj = {
    url: url,
    email: email,
    question: question,
    passed: passed,
    results: results_clean   
  }

  var bq_out = {
    url: url,
    email: email,
    user_id: user_id,
    question: question,
    passed: passed,
    results: results_clean,
    scheduled_plan_id: scheduled_plan_id
  }

  // console.log(bq_out);
  createEmailHTML(email_obj)
  .then(() => {
    bigquery(bq_out)
    .then(()=>{
      console.log('tada')
      // return success({})
      callback(null, success({}))
    })
    .catch((e)=>{
      console.log('bqfail')
      callback(failure(e))
    })
  })
  .catch((e)=>{
      console.log('emailfail')
    callback(failure(e))
  })
}
