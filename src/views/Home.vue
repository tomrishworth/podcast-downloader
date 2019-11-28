<template>
  <div>
    <div class="container py-5 mb-5">
      <h1>Podcast Downloader</h1>
      <p>Download indiviual podcast epidsodes to your computer</p>
      <div class="d-flex align-items-center">
        <b-form inline>
          <b-form-input type="number" v-model="id" placeholder="Enter Podcast ID"></b-form-input>
          <b-btn variant="primary" @click="goToPodcast">View Episodes</b-btn>
        </b-form>
        <div class="ml-4">
          <b-btn variant="link" v-b-modal.modal-1>How do I find the ID?</b-btn>
        </div>
      </div>
    </div>
    <div v-if="loading" class="d-flex justify-content-center pt-4">
      <b-spinner variant="secondary" label="Spinning"></b-spinner>
    </div>
    <div class="container-fluid" v-if="podcasts">
      <h1 class="h4 mb-4">Top Podcasts</h1>
      <div class="row justify-content-start">
        <router-link :to="`podcast/${podcast.id}`" class="col podcast" v-for="podcast in podcasts" :key="podcast.id">
          <div>
            <img :src="podcast.artworkUrl100" />
          </div>
          <div>{{ podcast.name }}</div>
          <div>{{ podcast.artistName }}</div>
        </router-link>
      </div>
    </div>
    <b-modal id="modal-1" title="Apple Podcasts" size="xl">
      <img class="img-fluid" src="https://s3.amazonaws.com/tom_rishworth/get-podcast-id.png" />
      <template slot="modal-footer"></template>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'home',
  data() {
    return {
      id: null,
      podcasts: null,
      loading: false
    };
  },
  methods: {
    getStuff() {
      return axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://rss.itunes.apple.com/api/v1/NZL/podcasts/top-podcasts/all/48/explicit.json`
        )
        .then(response => {
          this.podcasts = response.data.feed.results;
          this.loading = false;
        });
    },
    goToPodcast() {
      if (this.id != null) {
        this.$router.push({ path: `podcast/${this.id}` });
      }
    }
  },
  mounted() {
    this.loading = true;
    this.getStuff();
  }
};
</script>
