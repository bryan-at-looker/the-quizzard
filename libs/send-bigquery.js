import {BigQuery} from '@google-cloud/bigquery';



export function bigquery(obj) {

  var promise1 = new Promise(function(resolve, reject) {

    const credentials = require('../bqconfig')
    var data = []
    obj['submitted_at'] = BigQuery.timestamp(new Date())
  
    data.push(obj)
  
    const bqc = new BigQuery({
      projectId: process.env.BQ_PROJECT,
      credentials: credentials
    });
    // console.log(bqc)
    // bqc.dataset(process.env.BQ_DATASET).table(process.env.BQ_TABLE)
    
    bqc
    .dataset(process.env.BQ_DATASET)
    .table(process.env.BQ_TABLE)
    .insert(data)
    .then((out) => {
      console.log('coool')
      console.log(`Inserted ${data.length} rows`)
      resolve(`Inserted ${data.length} rows`)
    })
    .catch(error => {
      console.log(error)
      console.log(error.response.insertErrors[0].errors[0])
      reject(error.response.insertErrors[0].errors[0])
    })
  });

  return promise1;
  
  // console.log(bqc)

}