import {isEqual} from 'lodash'
export function clean(obj) {
  var out = {}
  for (var propName in obj) { 
    if (obj[propName] === null || obj[propName] === undefined) {
    } else {
      out[propName] = obj[propName]
    }
  }
  return out
}

function c_o(c,r) { return {check: c, reason: r, show: !c} }

function check_fields(question, answer) {
  var checks = {question: true, answer: true};
  for (const field of question) {
    if (answer.indexOf(field) == -1) {
      checks.question = false;
    }
  }
  for (const field of answer) {
    if (question.indexOf(field) == -1) {
      checks.answer = false;
    }
  }

  if (checks.question && checks.answer) {
    return c_o(true, 'Correct!')
  } else if (!checks.question && checks.answer) {
    return c_o(false,'Wrong Field(s) Selected')
  } else if (checks.question && !checks.answer) {
    return c_o(false, 'Missing Field(s)')
  } else {
    return c_o(false, 'Missing and Wrong Field(s)')
  }
}

function check_pivots(question, answer) {
  if (question === null && answer === null) {
    return c_o(true, 'Correct!')
  } else if (question === null && answer !== null) {
    return c_o(false, 'Missing Pivot(s)')
  } else if (answer === null && question !== null) {  
    return c_o(false, 'Wrong Field(s) Pivoted')
  } else {
    var checks = {question: true, answer: true};

    for (const field of question) {
      if (answer.indexOf(field) == -1) {
        checks.question = false;
      }
    }
    for (const field of answer) {
      if (question.indexOf(field) == -1) {
        checks.answer = false;
      }
    }
  
    if (checks.question && checks.answer) {
      return c_o(true, 'Correct!')
    } else if (!checks.question && checks.answer) {
      return c_o(false,'Wrong Field(s) Pivoted')
    } else if (checks.question && !checks.answer) {
      return c_o(false, 'Missing Pivot(s)')
    } else {
      return c_o(false, 'Missing and Wrong Pivot(s)')
    }
  }


}

function check_num_rows(question,answer) {

  if (question > answer) {
    return c_o(false, 'Too Many Rows')
  } else if (question < answer ) {
    return c_o(false, 'Not Enough Rows')
  } else if (question == answer) {
    return c_o(true, 'Correct!')
  } else {
    return c_o(false, 'Rows Not Equal')
  }
}

function check_limit(question,answer) {

  if (question > answer) {
    return c_o(false, 'Limit Too High')
  } else if (question < answer ) {
    return c_o(false, 'Limit Too Low')
  } else if (question == answer) {
    return c_o(true, 'Correct!')
  } else {
    return c_o(false, 'Limit Not Correct!')
  }

}

function check_filters(question,answer) {
  
  if (question == null && answer == null) {
    return c_o(true, 'Correct!')
  }

  if (question == null && answer != null) {
    return c_o(false, 'Filter(s) Are Wrong')
  }

  if (answer == null && question != null) {
    return c_o(false, 'Filter(s) Are Wrong')
  }

  if (isEqual(question, answer)) {
    return (c_o(true, 'Correct!'))
  } else {
    // TODO could use some more logic here
    // https://lodash.com/docs/4.17.11#reduce
    // https://stackoverflow.com/questions/31683075/how-to-do-a-deep-comparison-between-2-objects-with-lodash
    return (c_o(false, 'Filter(s) Are Wrong'))
  }
}

function check_sorts(question,answer) {

  if (question == null && answer == null) {
    return c_o(true, 'Correct!')
  }

  if (question == null && answer != null) {
    return c_o(false, 'Sort(s) Are Wrong')
  }

  if (answer == null && question != null) {
    return c_o(false, 'Sort(s) Are Wrong')
  }

  if (isEqual(question, answer)) {
    return (c_o(true, 'Correct!'))
  } else {
    // TODO could use some more logic here
    // https://lodash.com/docs/4.17.11#reduce
    // https://stackoverflow.com/questions/31683075/how-to-do-a-deep-comparison-between-2-objects-with-lodash
    return (c_o(false, 'Sort(s) Are Wrong'))
  }  
}

function check_vis_config(question,answer) {

  if (question == null && answer == null) {
    return c_o(true, 'Correct!')
  }

  if (question == null && answer != null) {
    return c_o(false, 'Visualization is Wrong')
  }

  if (answer == null && question != null) {
    return c_o(false, 'Visualization is Wrong')
  }

  var vis_check = {}
  
  for (var key in answer) {
    vis_check[key] = (question[key]) ? question[key] : null
  }
  if (isEqual(vis_check, answer)) {
    return (c_o(true, 'Correct!'))
  } else {
    // TODO could use some more logic here
    // https://lodash.com/docs/4.17.11#reduce
    // https://stackoverflow.com/questions/31683075/how-to-do-a-deep-comparison-between-2-objects-with-lodash
    return (c_o(false, 'Visualization is Wrong'))
  }  
}

export function check_question(question, answer, req_check) {
  // req_check object that tells us which ones we care about
  var check = {
    fields: null,
    filters: null,
    vis_config: null,
    sorts: null,
    limit: null,
    pivots: null,
    num_rows: null
  }

  for (var key in answer) {
    if (key == 'fields') {
      // console.log({question: question.fields, answer: answer.fields})
      check.fields = check_fields(question.fields, answer.fields)
    }
    if (key == 'num_rows') {
      check.num_rows = check_num_rows(question.num_rows, answer.num_rows)
    }
    if (key == 'limit') {
      check.limit = check_limit(question.limit, answer.limit)
    }
    if (key == 'filters') {
      check.filters = check_filters(question.filters, answer.filters)
    }
    if (key == 'pivots') {
      check.pivots = check_pivots(question.pivots, answer.pivots)
    }
    if (key == 'sorts') {
      check.sorts = check_sorts(question.sorts, answer.sorts)
    }
    if (key == 'vis_config') {
      check.vis_config = check_vis_config(question.vis_config, answer.vis_config)
    }
  }
  
  return check
}