<template>
    <div>

        <div class="kanban-card container card" :content="content">
            <div class="card-title">
                <p>{{ content.title }}</p>
            </div>
            <div class="card-subtitle">
                <p>{{ content.subtitle }}<p>
            </div>
            <div class="card-buttons">
                <p class="btn btn-danger" v-on:click="delete_card(content.id)">Delete</p>
                <p class="btn btn-warning" v-on:click="open_edit(content.id)">Edit</p>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
export default {
    props: ['base_url', 'content'],
    data: function () {
        return {
            inputTitle: 'content.title',
            inputSubtitle: 'content.subtitle',
            inputStatus: 'content.status',
            inputDeadline: 'content.deadline',
        }
    },
    methods: {
        delete_card: function (id) {
            Swal.fire({
                icon: 'warning',
                title: 'Delete this card?',
                text: "You won't be able to revert this!",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Delete'
            })
            .then((result) => {
                if (result.value) {
                    axios({
                        method: 'DELETE',
                        url: `${this.base_url}/kanban/${id}`,
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                    .then((deleted) => {
                        this.$emit('delete_card_data', id)
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    })
                    .catch((err) => {
                        // console.log(err)
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                            footer: 'The entry failed to delete'
                        })
                    })
                }
            })
            .catch(() => {
            })
        },
        open_edit: function (id) {
            this.$emit('open_edit', id)
        },
        hide_edit: function () {
            this.$modal.hide('edit-card-form');
        },
    },
}
</script>