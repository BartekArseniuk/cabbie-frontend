<template>
<div class="messages-container">
    <div class="messages-select">
        <button class="for-someone" :class="{ active: activeTab === 'private' }" @click="selectTab('private')">
            Dla ciebie
        </button>
        <button class="for-someone" :class="{ active: activeTab === 'global' }" @click="selectTab('global')">
            Dla wszystkich
        </button>
    </div>

    <div class="new-message" @click="openModal">
        <img class="pencil-img" src="@/assets/images/Pencil.svg" alt="pencil" />
        <p class="new-message-button">Napisz wiadomość</p>
    </div>

    <div class="messages-list">
        <div v-for="(message, index) in messages" :key="message.id" class="message-item" :class="{ unread: !message.read }" @click="toggleMessage(index)">
            <div class="message-details">
                <p class="sender-email">{{ message.sender_email }}</p>
                <p class="sender-title">{{ message.title }}</p>
                <p class="sender-date">Wysłane: {{ formatDate(message.sent_at) }}</p>
            </div>
            <div class="message-content" :class="{ expanded: message.showMessage }" ref="messageContents">
                <p class="sender-message"><br /><span v-html="formatMessage(message.message)"></span></p>
            </div>
        </div>
    </div>
</div>

<transition @before-enter="beforeEnterOverlay" @enter="enterOverlay" @leave="leaveOverlay">
    <message-modal :isVisible="isModalVisible" @close="closeModal" />
</transition>
</template>

<script>
import {
    mapGetters
} from 'vuex';
import MessageModal from './MessageModal.vue';

export default {
    components: {
        MessageModal,
    },
    data() {
        return {
            isModalVisible: false,
            activeTab: 'private',
        };
    },
    computed: {
        ...mapGetters(['getMessages']),
        messages() {
            return this.getMessages;
        },
    },
    mounted() {
        this.fetchMessages(this.activeTab);
    },
    methods: {
        formatMessage(message) {
            if (!message) return '';
            return message.replace(/\n/g, '<br />');
        },
        async fetchMessages(type) {
            await this.$store.dispatch('fetchMessages', type);

            this.$nextTick(() => {
                if (this.$refs.messageContents && this.$refs.messageContents.length > 0) {
                    this.$refs.messageContents.forEach((messageContent) => {
                        if (messageContent) {
                            messageContent.style.maxHeight = '0';
                        }
                    });
                }
            });
        },
        async toggleMessage(index) {
            const messageContent = this.$refs.messageContents[index];
            if (!messageContent) {
                console.error(`Message content for index ${index} is undefined.`);
                return;
            }

            const isExpanded = this.messages[index].showMessage;
            this.messages[index].showMessage = !isExpanded;

            if (!isExpanded) {
                messageContent.style.maxHeight = messageContent.scrollHeight + 'px';
            } else {
                messageContent.style.maxHeight = 0;
            }

            if (!this.messages[index].read) {
                this.messages[index].read = true;
                await this.updateMessageReadStatus(this.messages[index].id, this.activeTab);
            }
        },
        async updateMessageReadStatus(messageId, type) {
            try {
                await this.$store.dispatch('markMessageAsRead', {
                    messageId,
                    type
                });
            } catch (error) {
                console.error('Failed to update message read status:', error);
            }
        },
        formatDate(dateString) {
            const formattedDate = dateString.replace(' ', 'T');
            const date = new Date(formattedDate);
            return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();
        },
        openModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        selectTab(tab) {
            this.activeTab = tab;
            this.fetchMessages(tab);
        },
        beforeEnterOverlay(el) {
            el.style.opacity = 0;
        },
        enterOverlay(el, done) {
            el.offsetHeight;
            el.style.transition = 'opacity 0.3s ease';
            el.style.opacity = 1;
            done();
        },
        leaveOverlay(el, done) {
            el.style.transition = 'opacity 0.3s ease';
            el.style.opacity = 0;
            setTimeout(() => {
                this.closingModal = false;
                done();
            }, 300);
        },
    },
};
</script>

<style lang="scss" scoped>
.messages-container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.messages-select {
    margin-left: -10px;
    margin-bottom: 15px;
}

.for-someone {
    background-color: transparent;
    border: 0px transparent;
    border-bottom: 4px solid transparent;
    height: 100px;
    width: 120px;
    color: $white;
    font-family: 'Roboto-Light', sans-serif;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
}

.for-someone.active {
    background-color: $messages-color;
    border-bottom: 4px solid $secondary-color;
}

.new-message {
    display: flex;
    flex-direction: row;
    background-color: $messages-color;
    padding: 15px;
    border-radius: 15px;
    gap: 10px;
    max-width: 150px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.new-message:hover {
    background-color: $secondary-color;
}

.pencil-img {
    margin-left: 10px;
    height: 18px;
}

.new-message-button {
    font-family: 'Roboto-Light', sans-serif;
    background-color: transparent;
    border: none;
    color: $title-light-font;
    font-size: 12px;
    margin: 0;
}

.messages-list {
    margin-top: 20px;
    width: 100%;
    max-height: calc(100vh - 200px);
    overflow-y: auto;
    padding-right: 10px;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background: darken($secondary-color, 5%);
        border-radius: 10px;
    }
}

.message-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    background-color: transparent;
    border-radius: 8px;
    border: 3px solid $messages-color;
    margin-bottom: 15px;
    box-sizing: border-box;
    cursor: pointer;
}

.message-item:last-child {
    margin-bottom: 0;
}

.message-details {
    display: flex;
    flex-direction: row;
}

.sender-email {
    font-weight: bold;
    color: $white;
    font-family: 'Roboto-Light', sans-serif;
    flex-grow: 1;
}

.sender-title {
    font-family: 'Roboto-Light', sans-serif;
    color: $white;
    flex-grow: 1;
}

.message-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease;
}

.message-content.expanded {
    max-height: none;
}

.sender-message {
    height: auto;
    font-family: 'Roboto-Light', sans-serif;
    color: $white;
    overflow-wrap: break-word;
    word-wrap: break-word;
    overflow: hidden;
    white-space: normal;
    max-width: 100%;
    hyphens: auto;
    word-break: break-word;
}

.sender-date {
    flex-grow: 1;
    text-align: right;
    color: $white;
    font-family: 'Roboto-Light', sans-serif;
}

.message-item.unread {
    border-left: 5px solid $primary-color;
}

@media (max-width: 1000px) {
    .message-item {
        display: flex;
        flex-direction: column;
    }

    .message-details {
        flex-direction: column;
    }

    .sender-date {
        text-align: left;
    }

    .messages-select {
        display: flex;
        flex-direction: row;
        gap: 15px;
    }
}

@media (max-width: 768px) {
    .for-someone {
        width: 50%;
        border-radius: 20px;
        border: 2px solid $secondary-color;
    }
}
</style>