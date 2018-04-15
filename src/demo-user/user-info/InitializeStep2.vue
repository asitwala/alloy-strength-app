<template>
    <div class="as-initialize-step-2">
        <div class="as-initialize-step-2-system">
            <h3>Please select your measurement system.</h3>
            <v-select
                auto
                :items="system.options"
                v-model="system.value"
                single-line>
            </v-select>
        </div>
        
        <transition name="as-fade">
            <div v-show="extend" class="as-initialize-step-2-info">
                <div class="as-initialize-step-2-left">
                    <v-card class="as-initialize-step-2-experience">
                        <v-toolbar card>
                            <v-toolbar-title class="white--text">Physical Stats</v-toolbar-title>
                        </v-toolbar>
                        <v-card-title>
                            <div class="as-initialize-step-2-experience-div">
                                <h3>Height</h3>
                                <div class="as-initialize-step-2-experience-height">
                                    <v-text-field
                                        v-model="height1"
                                        :suffix="units.height1"
                                    /> 
                                    <v-text-field
                                        v-model="height2"
                                        :suffix="units.height2"
                                    /> 
                                </div>
                                

                                <h3>Weight</h3>
                                <v-text-field
                                    v-model="snatch"
                                    :suffix="units.weight"
                                /> 

                            </div>
                        </v-card-title>
                    </v-card>

                    <v-card class="as-initialize-step-2-experience">
                        <v-toolbar card>
                            <v-toolbar-title class="white--text">Training Experience</v-toolbar-title>
                        </v-toolbar>
                        <v-card-title>
                            <div class="as-initialize-step-2-experience-div">
                                <h3>Height</h3>
                                <div class="as-initialize-step-2-experience-height">
                                    <v-text-field
                                        v-model="height1"
                                        :suffix="units.height1"
                                    /> 
                                    <v-text-field
                                        v-model="height2"
                                        :suffix="units.height2"
                                    /> 
                                </div>
                                

                                <h3>Weight</h3>
                                <v-text-field
                                    v-model="snatch"
                                    :suffix="units.weight"
                                /> 

                                <v-select
                                    auto
                                    :items="priorExperience.options"
                                    label="Do you have prior RPE Experience?"
                                    v-model="priorExperience.value"
                                    :class="{'input-group--focused' : priorExperience.value !== ''}"
                                    />

                            </div>
                        </v-card-title>
                    </v-card>

                </div>

                <v-card class="as-initialize-step-2-exercises">
                    <v-toolbar card>
                        <v-toolbar-title class="white--text">Known Max Lifts</v-toolbar-title>
                    </v-toolbar>
                    <v-card-title>
                        <div class="as-initialize-step-2-exercises-div">
                            <h3>Leave field blank if unknown</h3>
                            <v-text-field
                                v-model="squat"
                                label="Squat"
                                :suffix="units.weight"
                            /> 
                            <v-text-field
                                v-model="benchPress"
                                label="Bench Press"
                                :suffix="units.weight"
                            /> 
                            <v-text-field
                                v-model="deadlift"
                                label="Deadlift"
                                :suffix="units.weight"
                            /> 
                            <v-text-field
                                v-model="overheadPress"
                                label="Overhead Press"
                                :suffix="units.weight"
                            /> 
                            <v-text-field
                                v-model="powerClean"
                                label="Power Clean"
                                :suffix="units.weight"
                            /> 
                            <v-text-field
                                v-model="cleanAndJerk"
                                label="Clean and Jerk"
                                :suffix="units.weight"
                            /> 
                            <v-text-field
                                v-model="snatch"
                                label="Snatch"
                                :suffix="units.weight"
                            /> 
                        </div>
                    </v-card-title>
                </v-card>
            </div>
        </transition>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                extend: false,

                // physical stats
                units: {
                    weight: '',
                    height1: '',
                    height2: '',
                }, 
                system: {
                    value: '',
                    options: ['Metric System', 'Imperial System (United States)']
                },
                squat: '',
                benchPress: '',
                deadlift: '',
                overheadPress: '',
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
                },
                
                height1: '',
                height2: '',
                weight: ''
            }
        }, 
        watch: {
            "system.value" (newVal) {
                if (newVal === this.system.options[0]) { // Metric 
                    this.units.weight = 'kilograms'; 
                    this.units.height1 = 'meters'; 
                    this.units.height2 = 'centimeters'; 
                    this.extend = true; 
                } else if (newVal === this.system.options[1]) {
                    this.units.weight = 'pounds';
                    this.units.height1 = 'feet'; 
                    this.units.height2 = 'inches'; 
                    this.extend = true;
                } else {
                    this.extend = false; 
                }
            }
        }
    };
</script>

<style lang="scss">
    @import '~@/demo-common/styles/transitions';
    @import '~@/demo-common/styles/colors';

    .as-initialize-step-2-info {
        display: flex; 
        flex-wrap: wrap;
        justify-content: space-between; 
    }

    .as-initialize-step-2-experience {
        flex: 2;
        margin-right: 20px;
        min-width: 350px;

        &-div {
            flex: 1; 
        }

        &-height {
            display: flex; 
            flex-wrap: wrap; 

            .input-group:nth-of-type(1) {
                margin-right: 30px;
            }
        }
    }

    .as-initialize-step-2-exercises {
        flex: 1; 
        min-width: 350px;

        &-div {
            flex: 1; 
        }
    }


</style>