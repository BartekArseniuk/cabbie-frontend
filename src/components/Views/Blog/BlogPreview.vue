<template>
<div class="blog-preview">
    <div class="image-container">
        <img :src="fullImage" alt="Blog Image" />
    </div>
    <div class="info">
        <p class="news-label">Nowości - {{ formattedDate }}</p>
        <h3 class="title">{{ title }}</h3>
        <button class="learn-more">
            <span class="circle" aria-hidden="true">
                <span class="icon arrow"></span>
            </span>
            <span class="button-text">Więcej</span>
        </button>
    </div>
</div>
</template>

<script>
export default {
    props: {
        date: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        imageBase64: {
            type: String,
            required: true
        }
    },
    computed: {
        formattedDate() {
            const date = new Date(this.date);
            return date.toLocaleDateString();
        },
        fullImage() {
            return `data:image/jpeg;base64,${this.imageBase64}`;
        }
    }
};
</script>

<style lang="scss" scoped>
.blog-preview {
    width: 250px;
    height: 300px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin: 10px;
    display: flex;
    flex-direction: column;
}

.image-container {
    flex: 1;
    display: flex;
}

.image-container img {
    width: 100%;
    height: 120px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    object-fit: cover;
}

.info {
    flex: 2;
    padding-left: 20px;
    padding-bottom: 10px;
    background: rgba(71, 71, 71, 0.75);
    backdrop-filter: blur(2px);
    display: flex;
    flex-direction: column;
    position: relative;
}

.news-label {
    font-size: 18px;
    color: $white;
    margin-bottom: 2px;
    font-family: 'Roboto-Light', sans-serif;
}

.title {
    font-size: 14px;
    margin-top: 8px;
    margin-bottom: 3px;
    color: $white;
    font-family: 'Roboto-Extra-Light', sans-serif;
}

button {
    position: relative;
    display: inline-block;
    cursor: pointer;
    outline: none;
    border: 0;
    vertical-align: middle;
    text-decoration: none;
    background: transparent;
    padding: 0;
    font-size: inherit;
    font-family: 'Roboto-Light', sans-serif;
}

button.learn-more {
    position: absolute;
    bottom: 10px;
    left: 20px;
    width: 6rem;
    height: auto;
}

button.learn-more .circle {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    position: relative;
    display: block;
    margin: 0;
    width: 1.5rem;
    height: 1.5rem;
    background: $primary-color;
    border-radius: 1.5rem;
}

button.learn-more .circle .icon {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    background: $white;
}

button.learn-more .circle .icon.arrow {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    left: 0.2rem;
    width: 0.75rem;
    height: 0.125rem;
    background: none;
}

button.learn-more .circle .icon.arrow::before {
    position: absolute;
    content: "";
    top: -0.25rem;
    right: 0.001rem;
    width: 0.5rem;
    height: 0.5rem;
    border-top: 0.125rem solid $white;
    border-right: 0.125rem solid $white;
    transform: rotate(45deg);
}

button.learn-more .button-text {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0.2rem 0;
    margin: 0 0 0 1rem;
    color: $white;
    font-weight: 600;
    font-size: 12px;
    line-height: 1.4;
    text-align: center;
    text-transform: uppercase;
}

button:hover .circle {
    width: 100%;
}

button:hover .circle .icon.arrow {
    background: $white;
    transform: translate(0.8rem, 0);
}

button:hover .button-text {
    color: $white;
}
</style>