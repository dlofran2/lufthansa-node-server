export const jsonToFormUrlEncoded = jsonRequestBody =>
  Object.keys(jsonRequestBody)
    .map(key => `${key}=${encodeURIComponent(jsonRequestBody[key])}`)
    .join("&");
