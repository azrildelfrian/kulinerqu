<template>
  <div class="food-detail">
    <div class="container">
      <!-- breadcrumb -->
      <div class="row mt-5">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-dark">Beranda</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/foods" class="text-dark">Makanan</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Food Order
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-md-6">
          <img
            :src="'../assets/images/' + product.gambar"
            class="img-fluid"
            alt=""
          />
        </div>
        <div class="col-md-6">
          <h2>
            <strong>{{ product.nama }}</strong>
          </h2>
          <hr />
          <h4>
            Harga: <strong>Rp. {{ product.harga }}</strong>
          </h4>
          <form class="mt-4" v-on:submit.prevent>
            <div class="form-group">
              <label for="jumlah_pemesanan">Jumlah Pesan</label>
              <input
                type="number"
                class="form-control"
                v-model="pesan.jumlah_pemesanan"
              />
            </div>
            <div class="form-group">
              <label for="keterangan">Keterangan</label>
              <textarea
                v-model="pesan.keterangan"
                class="form-control"
                placeholder="keterangan"
              ></textarea>
            </div>

            <button type="submit" class="btn btn-success" @click="pemesanan">
              <b-icon icon="cart"></b-icon> Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "@/main";

export default {
  name: "ViewFoodDetail",
  data() {
    return {
      product: {},
      pesan: {},
    };
  },
  methods: {
    setProducts(data) {
      this.product = data;
    },
    pemesanan() {
      // console.log(this.pesan);
      if (this.pesan.jumlah_pemesanan && this.pesan.jumlah_pemesanan >= 1) {
        this.pesan.product = this.product;
        axios
        .post("http://localhost:3000/keranjangs", this.pesan)
        .then(() => {
          // console.log("Berhasil");
          eventBus.$emit('keranjang-updated');
          this.$router.push({ path: "/keranjang" }) //redirect ke /keranjang
            this.$notify({
              group: "foo",
              title: "Berhasil",
              text: "Pesananmu sudah masuk keranjang",
              duration: 5000,
              type: 'success',
            });
        })
        .catch((err) => console.log(err));
      } else {
        this.$notify({
              group: "foo",
              title: "Gagal",
              text: "Jumlah Pesanan Harus Diisi Dengan Benar",
              duration: 5000,
              type: 'error',
            });
      }
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/products/" + this.$route.params.id)
      .then((response) => this.setProducts(response.data))
      .catch((error) => console.log("Gagal: ", error));
  },
};
</script>

<style>
</style>