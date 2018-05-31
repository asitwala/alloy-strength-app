<template>
    <div class="as-initialize">
        <div class="as-initialize-stepper">
            <v-stepper v-model="stepper">
                <v-stepper-header>
                    <v-stepper-step step="1"
                        :complete="stepper > 1">Select a Package</v-stepper-step>
                    <v-divider/>
                    <v-stepper-step step="2"
                        :complete="stepper > 2">Provide Training Experience</v-stepper-step>
                    <v-divider/>
                    <v-stepper-step step="3"
                        :complete="stepper > 3">Select Workout Days</v-stepper-step>
                </v-stepper-header>
                
                <v-stepper-items class="as-initialize-stepper-content-container">
                    <v-stepper-content step="1" class="as-initialize-stepper-content">
                        <as-initialize-step-1 ref="step1" @submit="next"/>
                    </v-stepper-content>

                    <v-stepper-content step="2" class="as-initialize-stepper-content">
                        <as-initialize-step-2 ref="step2" @submit="next"/>
                    </v-stepper-content>

                    <v-stepper-content step="3" class="as-initialize-stepper-content">
                        <as-initialize-step-3 ref="step3"/>
                    </v-stepper-content> 
                </v-stepper-items>
            </v-stepper>
        </div>
    </div>
</template>

<script>

    let InitializeStep1 = require('./InitializeStep1').default;
    let InitializeStep2 = require('./InitializeStep2').default;
    let InitializeStep3 = require('./SetLevels').default;

    export default {
        components: {
            'as-initialize-step-1': InitializeStep1,
            'as-initialize-step-2': InitializeStep2,
            'as-initialize-step-3': InitializeStep3
        },
        props: {
            givenStep: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                stepper: this.givenStep
            }
        }, 
        methods: {
            next() {
                this.stepper += 1; 
            }
        }
    };

</script>

<style lang="scss">
    @import '~@/demo-common/styles/colors';

    .as-initialize-stepper {
        width: 95%; 
        margin: 0 auto;

        .stepper {
            .stepper__header {
                box-shadow: none !important;
            }

            box-shadow: none !important;
        }
    }

    .theme--light .stepper {
        background: none !important; 
    }

    .as-initialize-stepper-content-container {
        width: auto !important;
        margin: 0 20px;
    }

    .as-initialize-stepper-content {
        background-color: $greyLighten2;
        flex: none !important;
    }

    .as-initialize-increment-button {
        float: right;
        margin-right: 0 !important;
        margin-top: 12px !important;
    }

</style>