<template>
    <div class="as-initialize">
        <!-- Loading icon -->
        <div class="as-loading" v-if="!stepper && !hasFinished">
            <v-progress-circular indeterminate color="primary"/>
        </div>
        
        <transition name="as-fade">
            <div class="as-initialize-stepper" v-if="stepper && !hasFinished">
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
                            <as-initialize-step-1 ref="step1" @submit="handlePayment"/>
                        </v-stepper-content>

                        <v-stepper-content step="2" class="as-initialize-stepper-content">
                            <as-initialize-step-2 ref="step2" @submit="handleLevel"/>
                        </v-stepper-content>

                        <v-stepper-content step="3" class="as-initialize-stepper-content">
                            <as-initialize-step-3 ref="step3" :given-level="givenLevel" :given-block-num="givenBlockNum"/>
                        </v-stepper-content> 
                    </v-stepper-items>
                </v-stepper>
            </div>
        </transition>

        <transition name="as-fade">
            <div class="as-initialize-finished" v-if="hasFinished">
                <h2>You have already completed the initial sign-up process!</h2>
            </div>
        </transition>
       
    </div>
</template>

<script>
    import UsersService from '@/services/UsersService';

    let InitializeStep1 = require('./InitializeStep1').default;
    let InitializeStep2 = require('./InitializeStep2').default;
    let InitializeStep3 = require('./SetLevels').default;

    export default {
        components: {
            'as-initialize-step-1': InitializeStep1,
            'as-initialize-step-2': InitializeStep2,
            'as-initialize-step-3': InitializeStep3
        },
        mounted() {
            UsersService.getAccessInfo(this.$session.get('user').id).then(response => {
                if (this.validAccessLevelGM(response.data.accessLevel)) {

                    if (response.data.accessLevel > 2) {
                        this.hasFinished = true;
                    } else {
                        this.handleAccessLevelGM(response.data.accessLevel);
                    }
                }
            });
        },
        data() {
            return {
                stepper: null,
                hasFinished: false,
                givenLevel: null,
                givenBlockNum: null
            }
        }, 
        methods: {
            next() {
                this.stepper += 1; 
            },
            handlePayment(val) {
                console.log('handlePayment line 86');
                if (val.renew) {
                    console.log('handlePayment renew case');
                    this.$router.push({name: 'Workout'});
                } else {
                    this.next();
                }
            },
            handleLevel(levelInfo) {
                this.givenLevel = levelInfo.level; 
                this.givenBlockNum = levelInfo.blockNum;
                this.next();
            }
        },
        watch: {
            officialStepGM: function(newVal) {
                if (this.stepper !== newVal && (newVal > 0 && newVal < 4)) {
                    this.stepper = newVal;
                }
            }
        }
    };

</script>

<style lang="scss">
    @import '~@/demo-common/styles/colors';

    .as-initialize {
        height: 100%;
    }

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


    .as-initialize-finished {
        height: 100%;
        display: flex; 
        align-items: center; 
        justify-content: center;
    }
</style>