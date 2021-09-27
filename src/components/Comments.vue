<template>
    <div>
        <VCheckbox off v-on:click="toggleComments()" label="Show only my comments." />
        <div v-if="showAddComment === false">
            <button v-on:click="toggleAddComment" class="form-button">
                Add a New Comment
            </button>
        </div>
        <div v-else>
            <div style="text-align: center;">
                <VTextarea outlined v-model="comment" name="comment" placeholder="Add a new comment" style="width: 80%; margin: auto;" />
                <button v-on:click="toggleAddComment" class="form-button">
                    Cancel
                </button>
                <button v-on:click="handleAddComment()" class="form-button">
                    Save
                </button>
            </div>
        </div>
        <div v-if="showMyComments === false && sortedComments && sortedComments.length > 0">
            <div v-for="comment in sortedComments" :key="comment._id">
                <div style="font-weight: 700; margin: 25px 0px 25px;">Posted by {{comment.owner.firstName}} {{comment.owner.lastName}} on {{comment.formattedDate}}</div>
                <div class="comment">
                    {{comment.comment}}<br /><br />
                </div>
            </div>
        </div>
        <div v-else-if="showMyComments === true && sortedComments && sortedComments.length > 0">
            <div v-for="comment in myComments" :key="comment._id">
                Posted by {{comment.owner.firstName}} {{comment.owner.lastName}} on {{comment.formattedDate}}<br /><br />
                <span class="comment">
                    {{comment.comment}}
                </span>
            </div>
        </div>
        <div v-else class="empty">
            There are currently no comments to display for this recipe. Be the first to add one!
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import { authHeader } from '../helpers/authHeader';
import { getUserInfo } from '../helpers/getUserInfo';

export default {
    name: 'Comments',
    props: {
        recipeId: String,
        comments: Array
    },
    data: function () {
        return {
            comment: '',
            myComments: [],
            showMyComments: false,
            showAddComment: false
        }
    },
    methods: {
        handleAddComment() {
            axios.post(`${process.env.VUE_APP_API_PROTOCOL}${process.env.VUE_APP_API_SERVER}:${process.env.VUE_APP_API_PORT}/api/v1/recipes/comments`, {
                    recipeId: this.recipeId,
                    comment: this.comment
                },
                {
                    headers: authHeader()
                }
            )
            .then(() => {
                this.$emit('refresh');
                this.comment = '';
                this.$vToastify.success('You successfully added a new comment.');
            })
            .catch(err => {
                console.log(err);
                if (err && err.response.status === 401) {
                    this.$vToastify.error('Something went wrong.');
                    this.$router.push('/login');
                }
            })
        },
        toggleComments() {
            const userId = getUserInfo()._id;

            this.showMyComments = !this.showMyComments;
            if (this.showMyComments === true) {
                this.myComments = this.sortedComments.filter(comment => {
                    return comment.owner._id == userId;
                })
            }
        },
        toggleAddComment() {
            return this.showAddComment = !this.showAddComment;
        },
    },
    computed: {
        sortedComments() {
            const comments = [...this.comments];

            comments.sort((date1, date2) => {
                if (date1.createdAt > date2.createdAt) {
                    return -1;
                }
                if (date1.createdAt < date2.createdAt) {
                    return 1;
                }
                return 0;
            })
            for (let i = 0; i < comments.length; i++) {
                const created = comments[i].createdAt;
                const formattedDate = moment(created).format('MM[/]DD[/]YY [at] h:mm:ss a')

                comments[i].formattedDate = formattedDate;
            }
            return comments;
        }
    }
}
</script>