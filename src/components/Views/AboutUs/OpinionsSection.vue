<template>
<div class="opinions">
    <p class="title">CO MÓWIĄ O NAS KIEROWCY</p>
    <div class="reviews-container">
        <ReviewComponent v-for="(review, index) in reviews" :key="index" :reviewText="review.text" :authorName="review.author_name" />
    </div>
    <p class="opinion" v-if="reviews.length === 0">Brak opinii do wyświetlenia</p>

    <div class="footer">
        <p class="footer-text">
            Opinie dostarczone przez <img class="google-logo" src="@/assets/images/Google-Logo.wine.svg" alt="Google logo" />
        </p>
    </div>
</div>
</template>

<script>
import ReviewComponent from './ReviewComponent';

export default {
    components: {
        ReviewComponent
    },
    data() {
        return {
            reviews: []
        };
    },
    mounted() {
        this.fetchReviews();
    },
    methods: {
        async fetchReviews() {
            try {
                const response = await fetch(`http://localhost:8000/reviews/ChIJI7_8IzvHkwgRjBdfCt_u4cg`);
                const data = await response.json();
                this.reviews = data;
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.opinions {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 5vh;
}

.title {
    color: $primary-color;
    font-family: 'Roboto-Light', 'sans-serif';
    font-size: 42px;
    text-align: center;
    margin-top: 100px;
}

.reviews-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    align-items: center;
}

.opinion {
    font-family: 'Roboto-Light', 'sans-serif';
    color: $white;
}

.footer {
    margin-top: 20px;
    text-align: center;
    padding: 0 50px;
}

.footer-text {
    font-family: 'Roboto-Light', 'sans-serif';
    font-size: 18px;
    color: $white;
}

.google-logo {
    height: 100px;
    vertical-align: middle;
}

@media (max-width: 768px) {
    .title {
        font-size: 36px;
    }
}
</style>