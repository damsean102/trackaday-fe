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
                <div class="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 my-12">

                    <section class="border-solid border-2 border-slate-100 p-3" v-for="item in items" :key="item.objectID">
                        <img :src="item.thumbnailURL" />

                        <h3>{{ item.name }} - <span v-for="artist in item.artists"> {{ artist }}, </span></h3>

                        <audio controls>
                            <source :src="item.previewUrl">
                            Your browser does not support the audio element.
                        </audio>

                        <ul>
                            <li><a :href="item.externalURL">Track URL</a></li>
                            <li>Date Added: {{ item.addedAt }}</li>
                            <li>Duration: {{ item.duration }}</li>
                            <li><a :href="item.playlistUrl">{{ item.playlistName }}</a></li>
                        </ul>
                    </section>

                </div>
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

    export default {
        data() {
            return {
                searchClient: algoliasearch(
                    'Y9J24EDN41',
                    'f88fc1c54d13cf087ff21fac9294116f'
                ),
            };
        },
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
</style>
