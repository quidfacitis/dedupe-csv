const extractDomain = (url) => {

  // NOTE: To make the code more defensive, forward slashes (char code 47) AND division slashes (char code 8725) are being checked for in each RegEx.

  // extract domain name after "www." and before first "/"
  let regex = /(?<=www.)[^\/∕]*/g;

  if (url.match(regex) === null) {
    // extract domain name after initial "//" and before first "/"
    regex = /(?<=\/\/)[^\/∕]*/g;
  }

  if (url.match(regex) === null) {
    // extract domain name from beginning of string to first "/"
    regex = /[^\/∕]*/g;
  }

  const found = url.match(regex)[0];
  return found;
}

module.exports = { extractDomain };
