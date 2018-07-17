<template>
    <div class="as-initialize-step-1" style="height: 100%">

        <!-- Loading icon -->
        <div class="as-loading" v-if="loading">
            <v-progress-circular indeterminate color="primary"/>
        </div>

        <transition name="as-fade">
            <div class="as-initialize-step-1-actual-content" v-if="!loading"
                style="width: 100%; display: flex; flex-wrap: wrap;">
                <div class="as-initialize-step-1-packages">
                    <h1>{{ title }}</h1>
                    <p>{{ description }}</p>
                    <v-radio-group v-model="selectedRadio" class="as-select-radio-group">
                        <v-card v-for="asPackage in asPackages" :key="asPackage.name"
                            class="as-initialize-available-package"
                            :class="[{'selected': selectedPackage && asPackage.name === selectedPackage.name}]">
                            <div class="as-package-overlay"></div>
                            <v-card-title @click="selectPackage(asPackage)">
                                <div class="as-package-content">
                                    <div class="as-package-left">
                                        <div class="as-initialize-available-package-title">
                                            <h2>{{ asPackage.name }}</h2>
                                            <div class="as-initialize-title-divider"></div> 
                                            <h4>{{ asPackage.description }}</h4>
                                        </div>
                                        <div class="as-initialize-available-package-desc">
                                            <h4 style="margin-top: 4px;"> {{ asPackage.price }}</h4>
                                        </div>
                                    </div>

                                    <div class="as-package-right">
                                        <v-radio color="primary" :value="asPackage.radioLabel"></v-radio>
                                    </div>
                                </div>
                            </v-card-title>
                        </v-card>
                    </v-radio-group>
                    <p style="font-size: 12px; margin-top: 8px;">{{ trialDescription }}</p>
                </div>

                <div class="as-initialize-step-1-stripe">
            
                    <h4 class="as-package-message" v-if="!selectedPackage">
                        You have not selected a package.
                    </h4>

                    <h4 class="as-package-message" v-else>
                        You have selected the 
                        <v-chip label :class="selectedPackageColorClasses"
                            small
                            text-color="white"
                            style="font-weight:bold; margin: 0 4px;">
                            {{ selectedPackage ? selectedPackage.name: '' }}
                        </v-chip>
                        package.
                    </h4>
                    <v-card class="as-initialize-step-1-stripe-container">
                        <v-card-text>
                            <h2><span style="margin-right: 12px"><v-icon>fa-shopping-cart</v-icon></span>Checkout</h2>
                            <p style="margin-top: 12px; margin-bottom: 4px">Please enter your payment information below</p>
                            <div class="as-initialize-step-1-stripe-component">
                                <as-stripe @created-token="submitStep1"></as-stripe>
                                
                            </div>
                        </v-card-text>
                    </v-card>
                </div>
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
                        description: "6 MONTHS (7-Day Trial)",
                        price: "$90.00 ($15.00/Month)",
                        radioLabel: 'radio-0'
                    },
                    {
                        name: "Silver",
                        description: "MONTHLY (7-Day Trial)",
                        price: "$25.00/Month",
                        radioLabel: 'radio-1'
                    }
                ], 
                selectedPackage: null,
                selectedRadio: null,

                loading: false
            }
        },
        mounted() {
            let defaultPackage = this.asPackages[0]; // set default package to Gold 
            this.selectPackage(defaultPackage);
        },
        methods: {
            selectPackage(asPackage) {
                this.selectedPackage = asPackage;
                this.selectedRadio = this.selectedPackage.radioLabel; // use to populate the radio input
            },
            submitStep1(stripeToken) {
                //{ plan: 'AS_Gold' or 'AS_Silver', stripeToken: stripe token}
                console.log("submitStep1!!!");
                this.loading = true;

                let selectedPlan = null;

                if (this.selectedPackage.name === 'Gold') {
                    selectedPlan = 'AS_Gold'; 
                } else if (this.selectedPackage.name === 'Silver') {
                    selectedPlan = 'AS_Silver'; 
                }

                if (!stripeToken) {
                    this.loading = false;
                    console.log('INCORRECT!!!');
                    return;
                }
                else {
                    console.log('correct credit card!!!');
                    // this.loading = false;
                }
                // return
                let params = {
                    planID: selectedPlan,
                    stripeToken: stripeToken.id
                };
                console.log("LINE 148");
                if (this.renew) {
                    // renewing subscription
                    UsersService.renewSubscription(this.userId, params).then(response => {
                        if (!response.data.paymentError) {
                            this.$emit('submit');
                        }
                    }).finally(() => {
                        this.loading = false;
                    });
                } else {
                    UsersService.subscribe(this.userId, params).then(response => {
                        if (!response.data.paymentError) {
                            this.$emit('submit');
                        }
                    }).finally(() => {
                        this.loading = false; 
                    });
                }
            }
        },
        computed: {
            selectedPackageColorClasses() {
                return {
                    'as-selected-package-gold': this.selectedPackage ? this.selectedPackage.name === 'Gold' : false,
                    'as-selected-package-silver': this.selectedPackage ? this.selectedPackage.name === 'Silver' : false
                };
            },
            userId() {
                return this.$session.get('user').id; 
            }
        }
    };
</script>

<style lang="scss">
    @import '~@/demo-common/styles/colors';

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
        background-color: #8C7853 !important;
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