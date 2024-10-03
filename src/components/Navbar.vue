<template>
  <div class="container">
    <b-navbar toggleable="lg" type="light">
      <b-navbar-brand class="text-dark">
        <router-link to="/#" class="navbar-brand">Kulinerqu</router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Beranda</b-nav-item>
          <b-nav-item to="/foods">Makanan</b-nav-item>
          <b-nav-item to="/order">Pesanan</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/keranjang" class="nav-item">
            Keranjang
            <b-icon icon="bag"></b-icon>
            <span class="badge badge-success ml-2">
              {{ jumlah_pesanans.length > 0 ? jumlah_pesanans.length : 0 }}
            </span>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "@/main";

export default {
  name: "CompNavbar",
  data() {
    return {
      jumlah_pesanans: [], // pastikan array default
      searchQuery: "", // Menyimpan query pencarian
    };
  },
  methods: {
    setJumlah(data) {
      // Pastikan data berupa array, atau sesuaikan jika datanya object
      this.jumlah_pesanans = Array.isArray(data) ? data : [];
    },
    updateKeranjang() {
      axios
        .get("http://localhost:3000/keranjangs")
        .then((response) => this.setJumlah(response.data))
        .catch((error) => console.log("Gagal: ", error));
    },
  },
  mounted() {
    this.updateKeranjang(); // Ambil data keranjang ketika komponen dimuat

    // Dengarkan event bus untuk update data keranjang
    eventBus.$on("keranjang-updated", () => {
      this.updateKeranjang(); // Perbarui keranjang jika ada event
    });
  },
};
</script>

<style scoped>
/* Tambahkan styling sesuai kebutuhan */
</style>
