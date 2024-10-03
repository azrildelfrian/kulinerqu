<template>
  <div class="foods">
    <Navbar />
    <div class="container">
      <div class="row mt-4">
        <div class="col">
          <h2>Daftar <strong>Makanan</strong></h2>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col">
          <div class="input-group mb-3">
            <input
              v-model="search"
              type="text"
              class="form-control"
              placeholder="Cari Makanan"
              aria-label="Cari"
              aria-describedby="basic-addon1"
              @keyup="searchFood"
            />
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1"><b-icon icon="search"></b-icon></span>
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-4">
        <div
          class="col-md-4 mt-4"
          v-for="product in products"
          :key="product.id"
        >
          <CardProduct :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CardProduct from "@/components/CardProduct.vue";
import axios from "axios";

export default {
  name: "ViewFoods",
  components: {
    CardProduct,
  },
  data() {
    return {
      products: [],
      search: '',
    };
  },
  methods: {
    setProducts(data) {
      this.products = data;
    },
    searchFood() {
      axios
      .get("http://localhost:3000/products?q="+this.search)
      // Jika menggunakan bawaaan maka tidak bisa
      // Maka perlu diubah menjadi arrow function
      .then((response) => this.setProducts(response.data))
      .catch((error) => console.log("Gagal: ", error));
    }
  },
  mounted() {
    //axios mulai dijalankan dibagian mounted
    axios
      .get("http://localhost:3000/products")
      // Jika menggunakan bawaaan maka tidak bisa
      // Maka perlu diubah menjadi arrow function
      .then((response) => this.setProducts(response.data))
      .catch((error) => console.log("Gagal: ", error));
  },
};
</script>

<style>
</style>