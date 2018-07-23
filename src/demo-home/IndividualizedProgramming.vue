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
                        <v-stepper-step step="1"
                            :complete="stepper > 1">Submit Payment</v-stepper-step>
                        <v-divider/>
                        <v-stepper-step step="2"
                            :complete="stepper > 2">Get In Touch</v-stepper-step>
                        <v-divider/>
                    </v-stepper-header>
                    
                    <v-stepper-items class="as-initialize-stepper-content-container">
                        <v-stepper-content step="1" class="as-initialize-stepper-content">
                            <v-card class="as-initialize-step-1-stripe-container">
                                <v-card-text>
                                    <h2>Individualized Programming</h2>
                                    <p style="margin-top: 12px; margin-bottom: 4px">
                                        Interested in individualized programming with our coaches? 
                                        <br>
                                        Alex Bryce and Alex Sterner offer individualized programming over email for a rate of $89 every 4 weeks.
                                        Due to their schedules, there may not always be availability for more trainees. 
                                        If there are no remaining slots, please check back again later.
                                        </p>
                                    <h3>Remaining spots: 3</h3>
                                    <br>
                                    <!-- <h2><span style="margin-right: 12px"><v-icon>fa-shopping-cart</v-icon></span>Checkout</h2> -->
                                    <h4>Cost: $89/month</h4>
                                    <div style="max-width:1000px;">
                                        <!-- <p style="margin-top: 12px; margin-bottom: 4px">
                                            Please confirm the email address that your coaches will be corresponding with you through</p>
                                        <v-text-field
                                            type="text"
                                            placeholder="Enter Email Here"
                                        />  -->
                                        <!-- <v-btn color="primary" style="margin-left: 0px !important; margin-top: 0px; margin-bottom:15px !important;" 
                                        class='as-pay-with-stripe'
                                        @click="next">
                                            Confirm Email</v-btn> -->
                                            <!-- <input value="test"></input> -->
                                    </div>
                                    <div style="max-width:1000px;" class="as-initialize-step-1-stripe-component">
                                        <as-stripe 
                                            @created-token="submittedPayment"
                                            :IP="true">
                                        </as-stripe>                         
                                    </div>
                                </v-card-text>
                            </v-card>
                            <!-- <as-initialize-step-1 ref="step1" @submit="next"/> -->
                        </v-stepper-content>
                        <v-stepper-content step="2" class="as-initialize-stepper-content">
                            <v-card class="as-initialize-step-1-stripe-container">
                                <v-card-text style="height:520px; overflow-y:scroll;">
                                    <p>Please fill out and submit the google form below to provide our coaches with more information. 
                                        Your email address should be the same as the one your provided in the previous step.</p>
                                    <h3>Please write out your name</h3>
                                    <v-text-field
                                        type="text"
                                        placeholder="Your answer"
                                        v-model="FormInfo.Name"
                                    /> 
                                    <h3>Do you have any past injuries that we should keep in mind while designing your program? (please include the type of injury, date it occurred, and current state)</h3>
                                    <v-text-field
                                        textarea                                        
                                        placeholder="Your answer"
                                        v-model="FormInfo.PastInjuries"
                                    />     
                                    <h3>What is your strength training experience?</h3>
                                    <v-text-field
                                        type="text"                                        
                                        placeholder="Your answer"
                                        v-model="FormInfo.Experience"
                                    />     
                                    <h3>What equipment do you have at your disposal? (commercial fitness facility, home gym, etc.)</h3>
                                    <v-text-field
                                        textarea                                        
                                        placeholder="Your answer"
                                        v-model="FormInfo.Equipment"
                                    />     
                                    <h3>What are your short and long term goals as they pertain to strength training? 
                                        Goals regarding your respective sport? (change in weight class, strength in specific positions, etc.)</h3>
                                    <v-text-field
                                        textarea                                        
                                        placeholder="Your answer"
                                        v-model="FormInfo.Goals"
                                    />
                                    <h3>Are there any specific exercises you would like us to include?</h3>
                                    <v-text-field
                                        textarea                                        
                                        placeholder="Your answer"
                                        v-model="FormInfo.IncludeExercises"
                                    />
                                    <h3>Are there any specific exercises you would like to avoid? Why?</h3>
                                    <v-text-field
                                        textarea                                        
                                        placeholder="Your answer"
                                        v-model="FormInfo.AvoidExercises"
                                    />
                                    <h3>How many days per week would you like to train?  (if unsure we will program 3)</h3>
                                    <v-text-field
                                        type="text"
                                        placeholder="Your answer"
                                        v-model="FormInfo.TrainingDays"
                                    /> 
                                    <v-btn color="primary" style="margin-left: 0px !important; margin-top: 0px; margin-bottom:15px !important;" 
                                    class='as-pay-with-stripe'
                                    @click="submitIPInfo">
                                    Submit Answers</v-btn>
                                    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSek9qzPW-wR1YlV9oR8cfoWSkoqCH4-pBtokdUIZ_PJImhCJw/viewform?embedded=true" 
                                    style="width:100%;" height="520" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>                            
                                </v-card-text>
                            </v-card>
                            <!-- <as-initialize-step-2 ref="step2" @submit="handleLevel"/> -->
                        </v-stepper-content>

                        <v-stepper-content step="3" class="as-initialize-stepper-content">
                            <!-- <as-initialize-step-3 ref="step3" :given-level="givenLevel" :given-block-num="givenBlockNum"/> -->
                        </v-stepper-content> 
                    </v-stepper-items>
                </v-stepper>
            </div>
        </transition>

    </div>
</template>

<script>

    import UsersService from '@/services/UsersService'; 
    import StripeCardElement from '@/demo-common/components/StripeCardElement'; 

    export default {
        components: {
            'as-stripe': StripeCardElement
        },
        props: {
            renew: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: 'Available Packages'
            }, 
            description: {
                type: String, 
                default: `Please select one of the packages below to get started with Electrum Performance's
                training system.`
            },
            trialDescription: {
                type: String, 
                default: `All packages start with a 7-day free trial, after which you will be billed automatically. 
                If you cancel your subscription before the trial ends, your card will not be charged.`
            }
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
            console.log(`This.stepper mounted `, this.stepper);
            console.log('this.session: ', this.$session.getAll());
            console.log('IP-Step: ', this.$session.get('IP-Step'));
            if (!this.$session.has('IP-Step')) {
                this.stepper = 1; 
                this.$session.set('IP-Step', 1);
            }
            else if (this.$session.get('IP-Step') === 2) {
                console.log('IP-Step is 2 !!!');
                // this.stepper += 1;
                this.stepper = 2;
            
            }
            console.log('this.stepper new: ', this.stepper);
            this.loading = false;
        },
        methods: {
            submittedPayment(input) {
                this.loading = true;
                let stripeToken = input.stripeToken;
                let email = input.email;
                this.Email = email;
                if (!stripeToken) {
                    this.loading = false;
                    return
                }
                // console.log('submitted Payment. stripe token: ', stripeToken);
                // this.$session.set('IP-email', email);
                // this.$session.set('IP-Step', 2);
                // this.$session.set('IP-Step', 2);
                let params = {
                    payment:true,
                    IPinformation:false,
                    stripeToken: stripeToken.id,
                    email,
                    // email:
                };
                console.log('params to send: ', params);
                UsersService.individualProgram(params).then(response => {
                    if (!response.data.paymentError) {
                        console.log('response form UsersService: ', response);
                        this.stepper += 1;
                        this.$session.set('IP-email', email);
                        this.$session.set('IP-Step', 2);                        
                    }
                    this.loading = false;
                    return
                });
            },
            submitIPInfo(input) {
                this.loading = true;
                console.log('submitting IP Info!!! ', input);
                console.log('FormInfo: ', this.FormInfo);
                let email = this.$session.get('IP-email');
                let params = {
                    payment:false,
                    IPinformation:true,
                    FormInfo:this.FormInfo,  
                    email,
                };
                UsersService.individualProgram(params).then(response => {
                    this.false = true;
                    this.$session.set('IP-Confirmed', true);                        
                    console.log('response form UsersService: ', response);
                });
            },
            next() {
                console.log("next function hit!! this.stepper before: ", this.stepper);
                this.stepper += 1;
                // this.stepper = 2;
                console.log("next function hit!! this.stepper: ", this.stepper);
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

    .as-initialize-available-package:nth-of-type(3) {
        background-color: rgb(34, 168, 216) !important;
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
    .as-selected-trial {
        background-color: rgb(34, 168, 216) !important;
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