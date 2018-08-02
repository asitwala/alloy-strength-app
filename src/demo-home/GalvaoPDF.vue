<template>
    <div class="as-initialize" style="height: 100%">

        <!-- Loading icon -->
        <div class="as-loading" v-if="loading">
            <v-progress-circular indeterminate color="primary"/>
        </div>

        <transition name="as-fade">
            <div class="as-initialize-stepper">
                <v-stepper v-model="stepper">
                    <v-stepper-header>
                    </v-stepper-header>
                    
                    <v-stepper-items class="as-initialize-stepper-content-container">
                        <v-stepper-content step="1" class="as-initialize-stepper-content">
                            <v-card class="as-initialize-step-1-stripe-container">
                                <v-layout row>
                                    <v-flex xl-3>
                                        <v-card-media
                                        src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                                        height="300px"
                                        style="width:150px; display:inline-block;"
                                        ></v-card-media>                                    
                                    </v-flex>
                                    <v-flex xl-6>
                                        <v-card-text
                                        style="display:inline-block;"
                                        >
                                            <h2>Galvao PDF</h2>
                                            <p style="margin-top: 12px; margin-bottom: 4px">
                                                Description goes here. 
                                                <br>
                                                A strength training pdf designed to... etc.
                                                <br>
                                                Interested in individualized programming with our coaches? 
                                                <br>
                                                Alex Bryce and Alex Sterner offer individualized programming over email for a rate of $89 every 4 weeks.
                                                Due to their schedules, there may not always be availability for more trainees. 
                                                If there are no remaining slots, please check back again later.
                                                </p>
                                            <h3>Cost: $12</h3>
                                            <br>
                                            <p>Enter a valid email and payment information to receive pdf</p>
                                            <div style="max-width:1000px;" class="as-initialize-step-1-stripe-component">
                                                <as-stripe 
                                                    :IP="true"
                                                    @created-token="submittedPayment">
                                                </as-stripe>                         
                                            </div>
                                        </v-card-text>
                                    </v-flex>
                                </v-layout>
                            </v-card>
                            <!-- <as-initialize-step-1 ref="step1" @submit="next"/> -->
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </div>
        </transition>
    </div>
</template>

<script>

    // import UsersService from '@/services/UsersService'; 
    import MiscService from '@/services/MiscService'; 
    import StripeCardElement from '@/demo-common/components/StripeCardElement'; 

    export default {
        components: {
            'as-stripe': StripeCardElement
        },
        props: {

        },
        data() {
            return {
                asPackages: [
                    {
                        name: "Gold",
                        description: "6 MONTHS (7-Day Trial Included)",
                        price: "$90.00 ($15.00/Month)",
                        radioLabel: 'radio-0'
                    },
                    {
                        name: "Silver",
                        description: "MONTHLY (7-Day Trial Included)",
                        price: "$25.00/Month",
                        radioLabel: 'radio-1'
                    },
                ], 
                selectedPackage: null,
                selectedRadio: null,
                loading: false,
                stepper: 1,
                FormInfo: {
                    Name:'',
                    PastInjuries:'',
                    Experience:'',
                    Equipment:'',
                    Goals:'',
                    IncludeExercises:'',
                    AvoidExercises:'',
                    TrainingDays:'',
                },
                Email:'',
            }
        },
        created() {
        },
        methods: {
            submittedPayment(input) {
                this.loading = false;
                this.Email = input.email;
                if (!stripeToken) {
                    this.loading = false;
                    // return
                }

                let buyerEmail = input.email;
                let stripeToken = input.stripeToken;
                
                let params = {
                    // stripeToken: stripeToken.id,
                    buyerEmail,
                };
                console.log('params to send: ', params);

                MiscService.purchaseGalvaoPDF(params).then(response => {
                    if (!response.data.paymentError) {
                        // console.log('response form UsersService: ', response);
                        // this.stepper += 1;
                        // this.$session.set('IP-email', email);
                        // this.$session.set('IP-Step', 2);                        
                    }
                    this.loading = false;
                    return
                });
            },
        },
        computed: {
            userId() {
                return this.$session.get('user').id; 
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




    .as-initialize-step-1 {
        display: flex; 
        flex-wrap: wrap;

        min-height: 400px;
        position: relative;

        .as-loading {
            position: absolute;
            right: 50%;
        }
    }

    .as-initialize-step-1-packages {
        min-width: 280px; 
        max-width: 350px;
        margin-right: 24px;

        .as-select-radio-group {
            padding: 0px !important;

            .input-group__details {
                display: none !important;
            }
        }
    }

    .as-initialize-available-package {
        min-width: 280px;
        max-width: 350px;
        margin-bottom: 12px;

        &-title {
            display: flex;
            align-items: center;
        }

        &:hover {
            cursor: pointer;
        }

        &:hover .as-package-overlay {
            width: 100%;
            height: 100%;
            position: absolute;
            background-color: rgba(0, 0, 0, 0.4);
            cursor: pointer;
            pointer-events: none; 
        }

        &.selected {
            border: 1px solid rgba(0, 0, 0, 0.1); // rgba(33, 150, 243, 0.5);
        }

        .as-selected-package-icon {
            position: absolute;
            right: 25px;
            top: 30px;
        }
    }

    .as-initialize-available-package:nth-of-type(1) {
        background-color: $amberLighten1 !important;
    }

    .as-initialize-available-package:nth-of-type(2) {
        background-color: $greyLighten1 !important;
    }

    .as-initialize-title-divider {
        height: 18px; 
        width: 2px !important; 
        background-size: 1px 2px; 
        background-image: linear-gradient(to bottom, black 50%, transparent 50%);
        background-repeat: repeat-y; 
        margin: 0 12px;
    }

    .as-package-content {
        width: 100%;
        display: flex; 
        justify-content: space-between;
        align-items: center;
    }


    .as-selected-package-gold {
        background-color: $amberLighten1 !important;
    }

    .as-selected-package-silver {
        background-color: $greyLighten1 !important;
    }

    .as-initialize-step-1-stripe {
        min-width: 280px; 
        flex: 1; 

        .as-package-message {
            margin-top: 47px;
            margin-bottom: 8px;
            height: 38px;
            display: flex; 
            align-items: center;
        }

        &-container {
            
        }

        &-component {
            display: flex;
            align-items: center;
            //justify-content: center;

        }
    }



</style>