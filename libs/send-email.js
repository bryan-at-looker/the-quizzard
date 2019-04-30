export function createEmailHTML(obj) {

  var promise1 = new Promise(function(resolve, reject) {

    var msg = {
      to: obj.email,
      from: { email: process.env.FROM_EMAIL, name: 'The Quizzard' },
      bcc: process.env.BCC_EMAIL,
      dynamic_template_data: {
        question: obj.question,
        explore_url: obj.url,
        dashboard_url: process.env.DASHBOARD_URL,
        results: obj.results
      }
    }
    msg['templateId'] = (obj.passed) ? process.env.SUCCESS_TEMPLATE : process.env.FAIL_TEMPLATE
    const sgMail = require('@sendgrid/mail');
  
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    sgMail.send(msg, (error, result) => {
      if (error) {
        //Log friendly error
        // console.error(error.toString());
    
        //Extract error msg
        const {message, code, response} = error;
        // console.log(message)
        console.log('error');
        console.log(response);
        reject(message)
        //Extract response msg
        const {headers, body} = response;
      }
      else {
        console.log('no errors')
        console.log(result)
        resolve('complete')
      }
    });
  })

  return promise1;

}