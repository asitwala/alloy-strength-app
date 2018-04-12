<template>
    <div class="as-initialize">
        <div class="as-initialize-stepper">
            <v-stepper v-model="stepper">
                <v-stepper-header>
                    <v-stepper-step step="1"
                        :complete="stepper > 1">Name of Step</v-stepper-step>
                    <v-divider/>
                    <v-stepper-step step="2"
                        :complete="stepper > 2">Name of Step</v-stepper-step>
                    <v-divider/>
                    <v-stepper-step step="3"
                        :complete="stepper > 3">Name of Step</v-stepper-step>
                    <v-divider/>
                    <v-stepper-step step="4"
                        :complete="stepper > 4">Name of Step</v-stepper-step>
                </v-stepper-header>
                
                <v-stepper-items>
                    <v-stepper-content step="1">
                        <as-initialize-step-1/>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        
                    </v-stepper-content>

                    <v-stepper-content step="3">
                        
                    </v-stepper-content> 

                    <v-stepper-content step="4">
                        
                    </v-stepper-content> 

                    
                    <v-btn @click="incrementStepper" style="float:right">
                        Next
                    </v-btn>

                </v-stepper-items>
            </v-stepper>
        </div>
    </div>
</template>

<script>

    let InitializeStep1 = require('./InitializeStep1').default;
    let InitializeStep2 = require('./InitializeStep2').default;
    let InitializeStep3 = require('./InitializeStep3').default;
    let InitializeStep4 = require('./InitializeStep4').default;

    export default {
        components: {
            'as-initialize-step-1': InitializeStep1,
            'as-initialize-step-2': InitializeStep2,
            'as-initialize-step-3': InitializeStep3,
            'as-initialize-step-4': InitializeStep4
        },
        data() {
            return {
                stepper: 1
            }
        }, 
        methods: {
            incrementStepper() {
                this.stepper += 1; 
            },
            decrementStepper() {
                this.stepper -= 1; 
            }
        }
    };

</script>

<style>

</style>