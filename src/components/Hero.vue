<template>
  <div class="hero">

    <!-- desktop -->
    <div class="d-none d-md-block">
    <div class="row mt-4">
      <div class="col-md-6">
        <div class="d-flex h-100">
          <div class="justify-content-center align-self-center">
            <h2>
              <strong>Berbagai Makanan Lezat. </strong> <br />
              Khusus Untukmu
            </h2>
            <p>Ayo segera pilih dan pesan makanan favoritmu!</p>
            <router-link class="btn btn-lg btn-success" to="/foods">
              <b-icon icon="arrow-right"></b-icon> Pesan
            </router-link>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <img src="../assets/images/hero.png" width="100%" alt="" />
      </div>
    </div>
    </div>

    <!-- mobile -->
    <div class="d-sm-block d-md-none">
    <div class="row mt-4">
      <div class="col-md-6 mb-3">
        <img src="../assets/images/hero.png" width="100%" alt="" />
      </div>

      <div class="col-md-6">
        <div class="d-flex h-100">
          <div class="justify-content-center align-self-center">
            <h2>
              <strong>Berbagai Makanan Lezat. </strong> <br />
              Khusus Untukmu
            </h2>
            <p>Ayo segera pilih dan pesan makanan favoritmu! </p>
            <router-link class="btn btn-lg btn-success" to="/foods">
              <b-icon icon="arrow-right"></b-icon> Pesan
            </router-link>
          </div>
        </div>
      </div>

      
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompHero",
};
</script>

<style>
</style>