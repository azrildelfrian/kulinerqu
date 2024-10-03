<template>
  <div class="home">
    <Navbar />
    <div class="container">
      <Hero />

      <div class="row mt-4">
        <div class="col">
          <h2>Makanan <strong>Rekomendasi</strong></h2>
        </div>
        <div class="col">
          <router-link to="/foods" class="btn btn-success float-right">
            <b-icon icon="eye"></b-icon>Lihat Semua
          </router-link>
        </div>
      </div>

      <div class="row mb-4">
        <div
          class="col-md-4 mt-4"
          v-for="product in products"
          :key="product.id">
          <CardProduct :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from "@/components/Hero.vue";
import CardProduct from "@/components/CardProduct.vue";
import axios from "axios";

export default {
  name: "HomeView",
  components: {
    Hero,
    CardProduct,
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    setProducts(data) {
      this.products = data;
    },
  },
  mounted() {
    //axios mulai dijalankan dibagian mounted
    axios
      .get("http://localhost:3000/best-products")
      // Jika menggunakan bawaaan maka tidak bisa      
      // Maka perlu diubah menjadi arrow function
      .then((response) => this.setProducts(response.data))
      .catch((error) => console.log("Gagal: ", error))
  },
};
</script>
