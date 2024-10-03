<template>
  <div class="order">
    <div class="container">
      <div class="row mt-5">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-dark">Beranda</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Pesanan
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ViewOrder",
  data(){
    return{
      pesanans: [],
    }
  },
  methods: {
    setPesanans(data){
      console.log(data);
      this.pesanans = data;
    }
  },
  mounted() {
    axios
      .get("http://localhost:3000/pesanans")
      .then((response) => this.setPesanans(response.data))
      .catch((error) => console.log("Gagal: ", error))
  },
}
</script>

<style>

</style>