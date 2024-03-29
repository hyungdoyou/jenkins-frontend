import { defineStore } from "pinia";
import axios from "axios";

const backend = "http://77.77.77.51:80/api";
// const backend = "http://77.77.77.51:80/api";
//const storedToken = sessionStorage.getItem("token");

export const useSellerStore = defineStore("seller", {
  state: () => ({ seller: {}, isSuccess: false }),
  actions: {
    // 로그인
    async sendSellerLoginData(sellerEmail, sellerPassword) {
      let loginSeller = { email: sellerEmail, password: sellerPassword };
      try {
        let response = await axios.post(
          backend + "/seller/login",
          loginSeller,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.result.token !== null) {
          const token = response.data.result.token;
          sessionStorage.removeItem("token");
          sessionStorage.setItem("token", token);

          window.location.href = "/";
        }
      } catch (e) {
        this.seller.email = "";
        this.seller.password = "";
        sessionStorage.removeItem("token");
        alert("이메일과 비밀번호가 일치하지 않습니다. 다시 확인해 주세요.");
      }
    },

    // 회원가입
    async sendSellerSignUpData(seller) {
      try {
        let response = await axios.post(backend + "/seller/signup", seller, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.data.isSuccess === true) {
          this.isSuccess = true;
        } else {
          this.isSuccess = false;
        }
      } catch (e) {
        console.log(e);
        this.isSuccess = false;
        alert("잘못된 요청입니다.");
      }
    },
  },
});
