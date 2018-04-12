<template>
    <div class="as-initialize-step-2">
    </div>

</template>

<script>
    export default {
        data() {
            return {
                // physical stats
                system: {
                    value: '',
                    options: ['Metric System', 'Imperial System (United States)']
                },
                squat: '',
                bench: '',
                deadlift: '',
                benchPress: '',
                powerClean: '',
                cleanAndJerk: '', 
                snatch: '',

                // experience
                years: '',
                months: '',
                sport1: '',
                sport2: '',
                sport3: '',
                priorExperience: {
                    value: '',
                    options: ['No', 'Yes']
                }
            }
        }
    };

</script>

<style lang="scss">

</style>