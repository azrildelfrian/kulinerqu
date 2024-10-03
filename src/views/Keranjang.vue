<template>
  <div class="keranjang">
    <div class="container">
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
                Keranjang
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h2>Keranjang <strong>Saya</strong></h2>
          <div class="table-responsive mt-3">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Foto</th>
                  <th scope="col">Makanan</th>
                  <th scope="col">Keterangan</th>
                  <th scope="col">Jumlah</th>
                  <th scope="col">Harga</th>
                  <th scope="col">Total Harga</th>
                  <th scope="col">Hapus</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(keranjang, index) in keranjangs"
                  :key="keranjang.id"
                >
                  <th>{{ index + 1 }}</th>
                  <td>
                    <img
                      :src="`/assets/images/${
                        keranjang.products?.gambar ||
                        keranjang.product?.gambar ||
                        'default-image.jpg'
                      }`"
                      class="img-fluid shadow"
                      alt=""
                      width="250"
                    />
                  </td>
                  <td>
                    <strong>{{
                      keranjang.products?.nama ||
                      keranjang.product?.nama ||
                      "Tidak ada nama"
                    }}</strong>
                  </td>
                  <td>{{ keranjang.keterangan || "-" }}</td>
                  <td>{{ keranjang.jumlah_pemesanan || "-" }}</td>
                  <td>
                    {{
                      keranjang.products?.harga ||
                      keranjang.product?.harga ||
                      "Tidak ada harga"
                    }}
                  </td>
                  <td>
                    {{
                      keranjang.jumlah_pemesanan *
                        (keranjang.products?.harga ||
                          keranjang.product?.harga) || "-"
                    }}
                  </td>
                  <td align="center" class="text-danger">
                    <b-icon
                      icon="trash"
                      @click="hapusKeranjang(keranjang.id)"
                    ></b-icon>
                  </td>
                </tr>
                <tr>
                  <td colspan="6" align="right">
                    <strong class="">Total Harga : </strong>
                  </td>
                  <td>
                    <strong>Rp. {{ totalHarga }} </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="row justify-content-end">
        <div class="col">
          <h3>Checkout</h3>
          <form @submit.prevent="checkout">
            <div class="form-group">
              <label for="namaPemesan">Nama Pemesan</label>
              <input
                type="text"
                class="form-control"
                id="namaPemesan"
                v-model="namaPemesan"
              />
            </div>
            <div class="form-group">
              <label for="noMeja">Nomor Meja</label>
              <input
                type="text"
                class="form-control"
                id="noMeja"
                v-model="noMeja"
              />
            </div>
            <button type="submit" class="btn btn-success">Checkout</button>
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
  name: "ViewKeranjang",
  data() {
    return {
      keranjangs: [],
      namaPemesan: "",
      noMeja: "",
    };
  },
  methods: {
    setKeranjangs(data) {
      console.log(data);
      this.keranjangs = data;
    },
    hapusKeranjang(id) {
      // Kirim permintaan DELETE ke server berdasarkan id keranjang
      axios
        .delete(`http://localhost:3000/keranjangs/${id}`)
        .then(() => {
          // Hapus item dari keranjangs secara lokal setelah berhasil dihapus di server
          this.keranjangs = this.keranjangs.filter(
            (keranjang) => keranjang.id !== id
          );
          this.$notify({
            group: "foo",
            title: "Berhasil",
            text: "Pesananmu sudah dihapus",
            duration: 5000,
            type: "success",
          });
          eventBus.$emit("keranjang-updated", this.keranjangs.length);
        })
        .catch((error) => console.log("Gagal menghapus keranjang: ", error));
    },
    checkout() {
      // Periksa apakah keranjang kosong
      if (this.keranjangs.length === 0) {
        this.$notify({
          group: "foo",
          title: "Gagal",
          text: "Keranjang kosong. Silakan tambahkan item terlebih dahulu.",
          duration: 5000,
          type: "error",
        });
        return; // Hentikan eksekusi lebih lanjut
      }

      // Periksa apakah nama pemesan dan nomor meja sudah diisi
      if (!this.namaPemesan || !this.noMeja) {
        this.$notify({
          group: "foo",
          title: "Gagal",
          text: "Nama Pemesan dan Nomor Meja harus diisi.",
          duration: 5000,
          type: "error",
        });
        return; // Hentikan eksekusi lebih lanjut
      }

      // Persiapkan data untuk dikirim ke API
      const pesanan = {
        nama: this.namaPemesan,
        noMeja: this.noMeja,
        keranjangs: this.keranjangs,
      };

      // Kirim data pesanan ke API
      axios
        .post("http://localhost:3000/pesanans", pesanan)
        .then(() => {
          this.hapusSemuaKeranjang(); // Panggil fungsi untuk menghapus semua item
          this.namaPemesan = ""; // Reset field nama pemesan
          this.noMeja = ""; // Reset field nomor meja
          this.$router.push({ path: "/proses-pesanan" });
          this.$notify({
            group: "foo",
            title: "Berhasil",
            text: "Pesanan berhasil dilakukan!",
            duration: 5000,
            type: "success",
          });
        })
        .catch((error) => {
          console.log("Gagal checkout: ", error);
          this.$notify({
            group: "foo",
            title: "Gagal",
            text: "Pesanan gagal dilakukan.",
            duration: 5000,
            type: "error",
          });
        });
    },
    hapusSemuaKeranjang() {
      // Kirim permintaan DELETE untuk setiap item di keranjang
      const hapusRequests = this.keranjangs.map((keranjang) =>
        axios.delete(`http://localhost:3000/keranjangs/${keranjang.id}`)
      );

      // Tunggu hingga semua permintaan DELETE selesai
      Promise.all(hapusRequests)
        .then(() => {
          this.keranjangs = []; // Kosongkan keranjang secara lokal
          this.$notify({
            group: "foo",
            title: "Berhasil",
            text: "Semua item di keranjang telah dihapus.",
            duration: 5000,
            type: "success",
          });
          eventBus.$emit("keranjang-updated", this.keranjangs.length);
        })
        .catch((error) => {
          console.log("Gagal menghapus semua keranjang: ", error);
          this.$notify({
            group: "foo",
            title: "Gagal",
            text: "Gagal menghapus item dari keranjang.",
            duration: 5000,
            type: "error",
          });
        });
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/keranjangs/")
      .then((response) => this.setKeranjangs(response.data))
      .catch((error) => console.log("Gagal: ", error));
  },
  computed: {
    totalHarga() {
      return this.keranjangs.reduce((total, keranjang) => {
        // Periksa apakah harga berasal dari products atau product
        const hargaProduk =
          keranjang.products?.harga || keranjang.product?.harga || 0;
        const jumlahPemesanan = parseInt(keranjang.jumlah_pemesanan) || 0;
        // Tambahkan ke total dengan mengalikan harga produk dengan jumlah pemesanan
        return total + hargaProduk * jumlahPemesanan;
      }, 0); // Mulai dengan nilai awal 0
    },
  },
};
</script>

<style>
</style>