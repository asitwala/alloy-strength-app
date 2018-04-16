<template>
    <div class="as-initialize-step-3">
        <h2>You're almost there! All that's left is to select your workout days.</h2>

        <h3>Select a start date</h3>
        <h3>Select 3 days you'd like to work out on</h3>
        
        <div class="as-initialize-step-3-days">
            <div class="as-initialize-step-3-day">
                <v-checkbox v-for="day in days" :key="day"
                    color="primary"
                    :label="day" v-model="selectedDays" :value="day">
                </v-checkbox>
            </div>
        </div>
    
        <v-date-picker v-model="startDate"></v-date-picker>

    </div>

</template>

<script>
    import moment from 'moment'; 
    export default {
        data() {
            return {
                days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                selectedDays: [], 
                startDate: moment().format(`YYYY-MM-DD`)
            }
        }
    };
</script>

<style lang="scss">

    .as-initialize-step-3-days {
        display: flex; 
        flex-wrap: wrap; 
    }

    .as-initialize-step-3-day {
        display: inline-block;
    }

</style>