<template>
<div class="opinions">
    <p class="title">CO MÓWIĄ O NAS KIEROWCY</p>
    <div class="reviews-container">
        <ReviewComponent v-for="(review, index) in reviews" :key="index" :reviewText="review.text" :authorName="review.author_name" />
    </div>
    <p class="opinion" v-if="reviews.length === 0">Brak opinii do wyświetlenia</p>

    <div class="footer" v-if="reviews.length > 0">
        <p class="footer-text">
            Opinie dostarczone przez <img class="google-logo" src="@/assets/images/Google-Logo.wine.svg" alt="Google logo" />
        </p>
    </div>
</div>
</template>

<script>
import {
    mapGetters
} from 'vuex';
import ReviewComponent from './ReviewComponent';

export default {
    components: {
        ReviewComponent,
    },
    computed: {
        ...mapGetters(['getReviews']),
        reviews() {
            return this.getReviews;
        },
    },
    mounted() {
        this.$store.dispatch('fetchReviews');
    },
};
</script>

    
<style lang="scss" scoped>
.opinions {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 4vh;
}

.title {
    color: $primary-color;
    font-family: 'Roboto-Light', 'sans-serif';
    font-size: 36px;
    text-align: center;
    margin-top: 80px;
}

.reviews-container {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
    align-items: center;
}

.opinion {
    font-family: 'Roboto-Light', 'sans-serif';
    color: $white;
}

.footer {
    margin-top: 15px;
    text-align: center;
}

.footer-text {
    font-family: 'Roboto-Light', 'sans-serif';
    font-size: 16px;
    color: $white;
}

.google-logo {
    height: 80px;
    vertical-align: middle;
}

@media (max-width: 768px) {
    .title {
        font-size: 28px;
    }
}
</style>