import service from "./service.js";
async function postRequest(URL, DATA, PARAMS) {
  return await service({
    url: URL,
    method: "POST",
    data: DATA,
    params: PARAMS,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

async function getRequest(URL, PARAMS) {
  return await service({
    url: URL,
    method: "GET",
    params: PARAMS,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

async function postFormData(URL, DATA, PARAMS) {
  return await service({
    url: URL,
    method: "POST",
    data: DATA,
    params: PARAMS,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export { getRequest, postRequest, postFormData };
