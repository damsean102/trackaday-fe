<template>

    <h1 class="text-4xl text-center">Trackaday Archive</h1>

    <ais-instant-search index-name="tracks" :search-client="searchClient">

        <!-- Search Box -->
        <ais-search-box show-loading-indicator :class-names="{
            'ais-SearchBox': 'my-8 py-4',
            'ais-SearchBox-form': 'w-full',
            'ais-SearchBox-submit': 'p-4 hidden',
            'ais-SearchBox-reset': 'p-4 hidden',

        }" />

        <!-- Search Results -->
        <ais-hits>
             <template v-slot="{ items }">
                <h2 class="text-2xl">Most Recent:</h2>
               <!-- component -->
                <main class="grid place-items-center py-5">
                    <div>
                        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

                            <!-- CARD -->
                            <div v-for="item in items" :key="item.objectID" class="bg-gray-900 shadow-lg rounded p-3">
                                <div class="group relative">
                                    <a :href="item.externalURL" target="_blank" rel="noopener noreferrer"><img :src="item.thumbnailURL" class="w-full block rounded" /></a>
                                    <!-- <img :src="item.thumbnailURL" class="w-full block rounded hover:cursor-pointer" @click="playSound(item.previewUrl)" /> -->
                                </div>
                                <div class="p-5">
                                    <h3 class="text-white text-lg">{{ item.name }}</h3>
                                    <p class="text-white"><span v-for="artist in item.artists"> {{ artist }}, </span></p>
                                    <p class="text-gray-400">Duration: {{ duration(item.duration) }}</p>
                                    <p class="text-gray-400">Added: {{ formatDate(item.addedAt) }}</p>
                                    <p class="text-gray-400 hover:text-gray-100"><a :href="item.playlistUrl" target="_blank" rel="noopener noreferrer">{{ item.playlistName }}</a></p>

                                    <p class="my-4 buttons w-full">
                                        <a :href="item.externalURL" class="rounded-full block w-full text-black font-bold text-center bg-brand-green p-2" target="_blank" rel="noopener noreferrer">View Track</a>
                                    </p>

                                    <!-- Play/Pause -->
                                    <!-- <div v-if="item.previewUrl != 'null'" class="flex justify-center items-center m-5">
                                        <button @click="playSound(item.previewUrl)" v-show="!isAudioPlaying" class="w-24 h-24 rounded-full bg-gray-600 focus:outline-none"><i class="fa fa-play fa-2x text-white" id="play-btn">Play</i></button>
                                        <button @click="stopSound(item.previewUrl)" v-show="isAudioPlaying" class="w-24 h-24 rounded-full bg-gray-600 focus:outline-none"><i class="fa fa-play fa-2x text-white" id="play-btn">Pause</i></button>
                                    </div> -->

                                </div>
                            </div>
                            <!-- END OF CARD -->

                        </section>
                    </div>
                </main>

            </template>
        </ais-hits>

        <ais-pagination :class-names="{
            'ais-Pagination': 'w-full m-12',
            'ais-Pagination-list': 'flex justify-center',
            'ais-Pagination-item': 'w-14',
        }" />

    </ais-instant-search>
</template>

<script>
    import algoliasearch from 'algoliasearch/lite';
    import dayjs from 'dayjs';
    import {Howl, Howler} from 'howler';

    export default {
        data() {
            return {
                searchClient: algoliasearch(
                    'Y9J24EDN41',
                    'f88fc1c54d13cf087ff21fac9294116f'
                ),
                isAudioPlaying: false
            };
        },
        methods: {
            duration(millis) {
                var minutes = Math.floor(millis / 60000);
                var seconds = ((millis % 60000) / 1000).toFixed(0);
                return (
                    seconds == 60 ?
                    (minutes+1) + ":00" :
                    minutes + ":" + (seconds < 10 ? "0" : "") + seconds
                );
            },
            formatDate(dateString) {
                const date = dayjs(dateString);
                // Then specify how you want your dates to be formatted
                return date.format('DD MMM YYYY');
            },
            // playSound(url) {
            //     // Stop all asounds from playing
            //     Howler.stop();

            //     // Setup and play the current sound
            //     var sound = new Howl({
            //         src: [url],
            //         html5: true,

            //         onplay: function() {
            //             this.isAudioPlaying = true
            //         },
            //         onstop: function() {
            //             this.isAudioPlaying = false
            //         },
            //         onend: function() {
            //             this.isAudioPlaying = false
            //         }
            //     });

            //     sound.play();


            // },
            // stopSound() {
            //     Howler.stop();
            // }
        }
    };
</script>

<style>
@import './assets/base.css';

#app {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    font-weight: normal;
}

.ais-SearchBox-input {
    width: 100%;
}

</style>
