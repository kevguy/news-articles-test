/**
 * constructParamString constructs query url to be appended at the end of an API url
 * @param {object} params key-value pairs of the parameters
 * 	(If value is undefined, the field will be ignored)
 * @returns {string} The query sub-url
 */
export function constructParamString(params) {
  return Object.keys(params)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
}
