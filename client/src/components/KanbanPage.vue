<template>
    <div>
        <div style="display: flex; justify-content: center;">
            <button v-on:click="show" class="btn btn-dark m-4">Add New Task</button>
            <button v-on:click="user_logout" class="btn btn-dark m-4">Log Out</button>
        </div>
        
        <div id="main-page" style="display: flex; justify-content: space-around;">
            
            <div id="kanban-column-1" class="container m-3">
                <h5>Back-log</h5>

                <backlog v-for="item in backlog" :key="item.id" :content="item" :base_url="base_url" @delete_card_data="delete_card" @open_edit="show_edit_form">
                </backlog>

            </div>

            <div id="kanban-column-2" class="container m-3">
                <h5>Development</h5>

                <development v-for="item in development" :key="item.id" :content="item" :base_url="base_url" @delete_card_data="delete_card" @open_edit="show_edit_form">
                </development>

            </div>

            <div id="kanban-column-3" class="container m-3">
                <h5>Testing</h5>

                <testing v-for="item in testing" :key="item.id" :content="item" :base_url="base_url" @delete_card_data="delete_card" @open_edit="show_edit_form">
                </testing>

            </div>

            <div id="kanban-column-4" class="container m-3">
                <h5>Completed</h5>

                <completed v-for="item in completed" :key="item.id" :content="item" :base_url="base_url" @delete_card_data="delete_card" @open_edit="show_edit_form">
                </completed>

            </div>

        </div>

        <modal name="add-card-form" height="auto" :scrollable="true">
            <div class="container p-4">
                <h5 class="text-center">Add New Card</h5>
                <form v-on:submit.prevent="add_card" class="my-4">
                    <div class="form-group">
                        <label>Task Name:</label>
                        <input type="text" class="form-control" v-model="inputTitle">
                    </div>
                    <div class="form-group">
                        <label>Description:</label>
                        <textarea class="form-control" v-model="inputSubtitle"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Insert to:</label>
                        <select class="form-control" v-model="inputStatus">
                            <option>Back-Log</option>
                            <option>Development</option>
                            <option>Testing</option>
                            <option>Completed</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Deadline:</label>
                        <input type="date" class="form-control" v-model="inputDeadline">
                    </div>
                    <input class="btn btn-success" type="submit">
                </form>
            </div>
        </modal>

        <modal name="edit-card-form" height="auto" :scrollable="true" >
            <div class="container p-4">
                <h5 class="text-center">Edit Kanban Card</h5>
                <form v-on:submit.prevent="edit_card(cardID)" class="my-4">
                    <div class="form-group">
                        <label>Task Name:</label>
                        <input type="text" class="form-control" v-model="editTitle">
                    </div>
                    <div class="form-group">
                        <label>Description:</label>
                        <textarea class="form-control" v-model="editSubtitle"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Insert to:</label>
                        <select class="form-control" v-model="editStatus">
                            <option value="Backlog">Back-Log</option>
                            <option>Development</option>
                            <option>Testing</option>
                            <option>Completed</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Deadline:</label>
                        <input type="date" class="form-control" v-model="editDeadline">
                    </div>
                    <input class="btn btn-success" type="submit">
                </form>
            </div>
        </modal>

    </div>
</template>

<script>
import backlog from './status/BackLog.vue'
import development from './status/Development.vue'
import testing from './status/Testing.vue'
import completed from './status/Completed.vue'
import axios from 'axios'
export default {
    props: ['base_url', 'rt_data'],
    components: {
        backlog,
        development,
        testing,
        completed
    },
    data: function () {
        return {
            information: [],
            //----- Add Card Form -----//
            inputTitle: '',
            inputSubtitle: '',
            inputStatus: '',
            inputDeadline: '',
            //----- Edit Card Form -----//
            cardID: '',
            editTitle: '',
            editSubtitle: '',
            editStatus: '',
            editDeadline: '',
        }
    },
    methods: {
        user_logout: function() {
            this.$emit('setToken', false)
        },
        get_all_cards: function () {
            axios({
                method: 'GET',
                url: `${this.base_url}/kanban`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(result => {
                // console.log(result)
                this.information = []
                result.data.forEach(info => {
                    this.information.push(info)
                })
            })
            .catch(err => {
                console.log('Get card error', err)
            })
        },
        show: function () {
            this.$modal.show('add-card-form');
        },
        hide: function () {
            this.$modal.hide('add-card-form');
        },
        delete_card: function (id) {
            this.information = this.information.filter(item => item.id !== id)
        },
        show_edit_form: function (id) {
            this.cardID = this.information.filter(item => item.id === id)[0].id
            this.editTitle = this.information.filter(item => item.id === id)[0].title
            this.editSubtitle = this.information.filter(item => item.id === id)[0].subtitle
            this.editStatus = this.information.filter(item => item.id === id)[0].status
            this.editDeadline = this.information.filter(item => item.id === id)[0].deadline.split("T")[0]
            this.$modal.show(`edit-card-form`);
        },
        add_card: function () {
            axios({
                method: 'POST',
                url: `${this.base_url}/kanban`,
                data: {
                    title: this.inputTitle,
                    subtitle: this.inputSubtitle,
                    status: this.inputStatus,
                    deadline: this.inputDeadline,
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(() => {
                console.log('Successfully added the data!')
                this.get_all_cards()
                this.$modal.hide('add-card-form')
            })
            .catch(err => {
                // console.log('Add card error', err.response)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: `Hint: ${err.response.data.error[0] ? err.response.data.error[0] : 'Internal server error (500)'}`
                })
            })
        },
        edit_card: function (id) {
            axios({
                method: 'PUT',
                url: `${this.base_url}/kanban/${id}`,
                data: {
                    title: this.editTitle,
                    subtitle: this.editSubtitle,
                    status: this.editStatus,
                    deadline: this.editDeadline,
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(() => {
                // console.log('Successfully updated the data!')
                this.get_all_cards()
                this.$modal.hide('edit-card-form')
            })
            .catch(err => {
                // console.log('Edit card error', err.response)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: `Hint: ${err.response.data.errors[0].message ? err.response.data.errors[0].message : 'Internal server error (500)'}`
                })
            })
        }
    },
    computed: {
        backlog: function() {
            // console.log('Back-log tasks: ', this.information.filter(item => item.status == 'Backlog'))
            return this.information.filter(item => item.status == 'Backlog')
        },
        development: function() {
            // console.log('Development tasks: ', this.information.filter(item => item.status == 'Development'))
            return this.information.filter(item => item.status == 'Development')
        },
        testing: function() {
            // console.log('Testing tasks: ', this.information.filter(item => item.status == 'Testing'))
            return this.information.filter(item => item.status == 'Testing')
        },
        completed: function() {
            // console.log('Completed tasks: ', this.information.filter(item => item.status == 'Completed'))
            return this.information.filter(item => item.status == 'Completed')
        }
    },
    created: function () {
        if (localStorage.getItem('token')) {
            this.get_all_cards()
        }
    }
}
</script>