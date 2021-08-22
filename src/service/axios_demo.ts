// import axios from 'axios';

// axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
//   console.log(res);
// });

// // axios
// //   .get('http://httpbin.org/get', {
// //     params: {
// //       name: 'wts',
// //       age: 18
// //     }
// //   })
// //   .then((res) => {
// //     console.log(res);
// //   });

// // axios
// //   .post('http://httpbin.org/post', {
// //     data: {
// //       name: 'wts',
// //       age: 18
// //     }
// //   })
// //   .then((res) => {
// //     console.log(res);
// //   });

// // axios.defaults.baseURL = 'http://httpbin.org';
// // axios.defaults.timeout = 1000;
// // axios.defaults.headers = {};
// // axios
// //   .get('get', {
// //     params: {
// //       name: 'wts',
// //       age: 18
// //     },
// //     // 每个请求单独的配置
// //     // timeout: 1000,
// //     // headers: {}
// //   })
// //   .then((res) => {
// //     console.log(res);
// //   });
// axios.defaults.baseURL = 'http://httpbin.org';
// axios.defaults.timeout = 10000;
// axios.defaults.headers = {};

// axios
//   .all([
//     axios.get('/get', {
//       params: {
//         name: 'wts',
//         age: 18
//       }
//     }),
//     axios.post('/post', {
//       data: {
//         name: 'wyf',
//         age: 6
//       }
//     })
//   ])
//   .then((res) => {
//     console.log(res);
//   });
// axios.interceptors.request.use(
//   (config) => {
//     console.log(config);
//     return config;
//   },
//   (err) => {
//     console.log(err, '请求发送错误');
//   }
// );
// axios.interceptors.response.use(
//   (res) => {
//     console.log(res);
//     return res.data;
//   },
//   (err) => {
//     console.log(err, '响应发生错误');
//   }
// );
