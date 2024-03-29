import { defineStore } from "pinia";
import axios from "axios";

const backend = "http://77.77.77.51:80/api";
// const backend = "http://77.77.77.51:80/api";
// const storedToken = sessionStorage.getItem("token");
export const useBrandStore = defineStore("brand", {
  state: () => ({ isLoading: false, brandPage: [] }),
  actions: {
    async getBrnadPage(page, size) {
      await axios
        .get(backend + "/brand/list/" + page + "/" + size, {
          headers: {
            //   Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
          this.brandPage = res.data.result;
        })
        .catch((res) => {
          console.log("getBrnadPage 망했다! : " + res);
        });
    },
    getBrnadNameArray() {
      let result = [];
      this.brandPage.map((brand) => {
        result.push(brand.brandName);
      });
      return result;
    },
  },
});
