<template>
  <div v-if="podcast">
    <div class="container-md">
      <div class="d-flex justify-content-center mb-5">
        <div class="podcast-details text-center">
          <img style="width: 200px" class="mb-3 img-fluid" :src="podcast.artworkUrl600" />
          <h1 class="text-md">{{ podcast.collectionName }}</h1>
        </div>
      </div>
      <b-alert show dismissible>
        <h4 class="alert-heading">Instructions</h4>
        <p>
          Clicking 'Copy Download Link' will copy to your clipboard a link you can then paste into your computers
          command line to download the podcast episode. See the <router-link to="/help">Help page</router-link> for more
          details.
        </p>
      </b-alert>
      <div v-if="loading" class="d-flex justify-content-center pt-4">
        <b-spinner variant="secondary" label="Spinning"></b-spinner>
      </div>

      <b-table
        id="episodes"
        :fields="fields"
        :items="items"
        :per-page="perPage"
        :current-page="currentPage"
        striped
        small
        bordered
      >
        <template v-slot:cell(download)="data">
          <b-btn
            size="sm"
            v-clipboard:copy="
              `curl -L ${data.item.enclosure.url} -o ${episodeSlug(podcast.collectionName)}-${episodeSlug(
                data.item.title
              )}.mp3`
            "
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            >Copy Download Link</b-btn
          >
        </template>
      </b-table>
      <div class="py-5 d-flex justify-content-center">
        <b-pagination
          v-if="episodes.length >= perPage"
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="episodes"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Parser from 'rss-parser';
import slugify from '@sindresorhus/slugify';
import { format } from 'date-fns';

export default {
  name: 'Podcast',
  data() {
    return {
      podcast: null,
      episodes: null,
      loading: false,
      perPage: 15,
      currentPage: 1,
      fields: [
        {
          key: 'title',
          thClass: 'w-200px',
          tdClass: 'w-200px'
        },
        // {
        //   key: "time",
        //   thClass: "w-100px",
        //   tdClass: "w-100px"
        // },
        {
          key: 'download',
          thClass: 'w-100px',
          tdClass: 'w-100px'
        }
      ]
    };
  },
  computed: {
    items() {
      return this.episodes;
    },
    rows() {
      if (this.episodes) {
        return this.episodes.length;
      } else {
        return 0;
      }
    }
  },
  methods: {
    episodeSlug(value) {
      return slugify(value);
    },
    date(value) {
      return format(value, 'D MMM YYYY');
    },
    getPodcastFeed() {
      axios
        .get(`https://cors-anywhere.herokuapp.com/https://itunes.apple.com/lookup?id=${this.$route.params.id}`)
        .then(response => {
          this.podcast = response.data.results[0];
          new Parser().parseURL(`https://cors-anywhere.herokuapp.com/${this.podcast.feedUrl}`).then(response => {
            this.episodes = response.items;
          });
          this.loading = false;
        });
    },
    onCopy() {
      console.log('Copied');
      this.$bvToast.toast('Paste this into your terminal to download', {
        variant: 'success',
        title: 'URL copied',
        autoHideDelay: 5000
      });
    },
    onError() {
      alert('Error');
    }
  },
  mounted() {
    console.log('Mounted');
    this.loading = true;
    this.getPodcastFeed();
  }
};
</script>
