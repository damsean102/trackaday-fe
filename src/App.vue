<template>
    <ais-instant-search index-name="tracks" :search-client="searchClient">

        <!-- Search Box -->
        <ais-search-box show-loading-indicator :class-names="{
            'ais-SearchBox-form': 'w-full shadow-md',
        }" />

        <!-- Search Results -->
        <ais-hits>
             <template v-slot="{ items }">
                <h2>Recently added:</h2>
               <!-- component -->
                <main class="grid place-items-center min-h-screen min-h-screen p-5">
                    <div>
                        <section class="grid grid-cols-1 sm:grid-cols-4 gap-3">

                            <!-- CARD -->
                            <div v-for="item in items" :key="item.objectID" class="bg-gray-900 shadow-lg rounded p-3">
                                <div class="group relative">
                                    <img :src="item.thumbnailURL" class="w-full block rounded" />
                                </div>
                                <div class="p-5">
                                    <h3 class="text-white text-lg">{{ item.name }}</h3>
                                    <p class="text-white"><span v-for="artist in item.artists"> {{ artist }}, </span></p>
                                    <p class="text-gray-400"><a :href="item.playlistUrl">{{ item.playlistName }}</a></p>
                                    <p class="text-gray-400">Added: {{ formatDate(item.addedAt) }}</p>
                                    <p class="text-gray-400">Duration: {{ duration(item.duration) }}</p>
                                    <p class="text-gray-400"><a :href="item.externalURL">Track URL</a></p>

                                    <audio controls v-if="item.previewUrl != 'null'">
                                        <source :src="item.previewUrl">
                                        Your browser does not support the audio element.
                                    </audio>
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

    export default {
        data() {
            return {
                searchClient: algoliasearch(
                    'Y9J24EDN41',
                    'f88fc1c54d13cf087ff21fac9294116f'
                ),
            };
        },
        methods: {
            formatDate(dateString) {
                const date = dayjs(dateString);
                // Then specify how you want your dates to be formatted
                return date.format('DD MMM YYYY');
            },
            duration(millis) {
                var minutes = Math.floor(millis / 60000);
                var seconds = ((millis % 60000) / 1000).toFixed(0);
                return (
                    seconds == 60 ?
                    (minutes+1) + ":00" :
                    minutes + ":" + (seconds < 10 ? "0" : "") + seconds
                );
            }
        }
    };
</script>

<style>
@import './assets/base.css';

#app {
    /* max-width: 1280px; */
    margin: 0 auto;
    padding: 2rem;
    font-weight: normal;
}
</style>
