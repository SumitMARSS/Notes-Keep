import axios from "axios";

// export const axiosInstance = axios.create({});
export const axiosInstance = axios.create({
  timeout: 600000, // 60 seconds
});


export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};

// import axios from 'axios';
// export const axiosInstance=axios.create({
//   timeout:5000,
// });

// export const apiConnector=(method,url,bodyData)=>{
//   return axiosInstance({
//     method:`${method}`,
//     url:`${url}`,
//     data:bodyData?bodyData:null,
//   });
// };