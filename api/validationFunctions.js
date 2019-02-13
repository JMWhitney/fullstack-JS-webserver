function isBlank(value) {
  return typeof value === 'undefined' ? true : false;
}

export default function validName(name) {
  //Make sure there is data
  if(isBlank(name)) {
    return false;
  //Make sure it is a string
  } else if(typeof name !== 'string') {
    return false
  //Between 3 and 255 chars
  } else if (name.length > 255 || name.length < 3) {
    return false;
  } else {
    return true;
  }
}