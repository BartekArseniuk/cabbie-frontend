<template>
<div class="opinions">
    <p class="review">{{ reviewText }}</p>
    <p class="author">{{ authorName }}</p>
</div>
</template>

  
<script>
export default {
    props: {
        reviewText: {
            type: String,
            required: true
        },
        authorName: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.opinions {
    height: 250px;
    width: 200px;
    background-color: $secondary-color;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: $white;
    overflow: hidden;
}

.review {
    height: 50%;
    text-align: center;
    font-family: 'Roboto-Extra-Light', sans-serif;
    padding: 0 20px;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: $primary-color;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background: $scroll-track;
        border-radius: 10px;
    }
}

.author {
    text-align: center;
    font-family: 'Roboto-Light', sans-serif;
}
</style>
