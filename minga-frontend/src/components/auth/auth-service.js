// import axios from "axios";

// const API_URL = "http://127.0.0.1:36783/api/users/";

// class AuthService {
//   login(email, password) {
//     return axios
//       .post(API_URL + `${id}`, {
//         email,
//         password,
//       })
//       .then((response) => {
//         if (response.data.accessToken) {
//           localStorage.setItem("email", JSON.stringify(response.data));
//         }
//         return response.data;
//       });
//   }

//   logout() {
//     localStorage.removeItem("email");
//   }

//   getCurrentUser() {
//     return JSON.parse(localStorage.getItem("email"));
//   }
// }

// export default new AuthService();
