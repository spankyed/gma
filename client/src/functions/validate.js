var constraints = {
  title: { present: true },
  selected: { present: true },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: "must be at least 6 characters"
    },
    pattern: {
      match: ["nicklas"],
      message: "'%{value}' is not allowed"
    }
  },
  file: () => {
    if(!/(\.bmp|\.gif|\.jpg|\.jpeg)$/i.test(fld.value)) {
      alert("Invalid image file type.");           
      return false;   
  }   
  }
};

const check = (form, state, actions, submitAttempt) => {
  if (!(state.submitAttempted || submitAttempt)) return false // dont show errors until after first submit attempt
  if (submitAttempt) actions.setAttempted()   
  for(let error in state.errors) actions.deleteError(error) // clear errors
  var isValid = true
  for (let field in form){
    let constraint = constraints[field]
    if(constraint){
      let value = form[field]
      if (constraint.present){
        if (!(value.length > 0)) throwError(field, `Please provide a ${field}`)
      }
      if (constraint.pattern) {
        if(!(matchPattern(field,value))) throwError(field, constraint.pattern.message)
      }
      if (isValid && state.errors[field]) actions.deleteError(field)
    }
  }
  function throwError(field, message){
    isValid = false
    actions.addError({field: field, message:message})
  }
  function matchPattern(field,value){ return constraints[field].pattern.match.test(value) }
  return isValid
}

const actions = {
  addError: error => state => ({ errors: { ...state.errors, [error.field]: error.message }}),
  deleteError: field => state => {
    delete state.errors[field]
    return {...state.errors}
  },
  setAttempted: _ => state => ({ submitAttempted: true })
}
const state = {
  submitAttempted: false,
  errors: {} // list of errors set after check
}

export default {
  check: check,
  actions: actions,
  state: state
}