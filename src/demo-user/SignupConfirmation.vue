<template>
    <div>
        <v-dialog
            v-model="showTestModal"
            max-width="750px"
            :persistent="true"
            transition="as-fade"
            scrollable
            >
            <as-modal-card @close="closeTestModal">
                <template slot="card-header">
                    <h3>CONFIRMATION</h3>
                </template>
                <template slot="card-body">
                    <div class="as-signup-confirmation">
                        <div>
                            <h2>Congratulations!</h2>
                            <p>You have successfully signed up for Alloy Strength!</p>
                        </div>
                    </div>
                </template>
                <template slot="card-footer">
                    <v-btn color="primary" @click="closeTestModal">Ok</v-btn>
                </template>
            </as-modal-card>
        </v-dialog>
    </div>


</template>


<script>

    import AuthCard from '@/demo-common/components/AuthCard'; 
    export default {
        components: {
            'as-modal-card': AuthCard
        },
        data() {
            return {
                showTestModal: true,
            };
        }, 
        methods: {
            openTestModal() {
                this.showTestModal = true; 
            },
            closeTestModal() {
                this.showTestModal = false;
            }
        }
    };

</script>

<style lang="scss">

    .as-signup-confirmation {
        text-align: center; 
        min-height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
</style>
