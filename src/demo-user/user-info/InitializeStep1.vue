<template>
    <div class="as-initialize-step-1">
        <div class="as-initialize-step-1-packages">
            <h1>Available Packages</h1>
            <p>Please select one of the packages below to get started with Alloy Strength's
                training system.
            </p>
            <v-radio-group v-model="selectedRadio">
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
</template>

<script>

    import UsersServices from '@/services/UsersService'; 

    import StripeCardElement from '@/demo-common/components/StripeCardElement'; 

    export default {
        components: {
            'as-stripe': StripeCardElement
        },
        data() {
            return {
                asPackages: [
                    {
                        name: "Gold",
                        description: "6 MONTHS",
                        price: "$90.00 ($15.00/Month)",
                        radioLabel: 'radio-0'
                    },
                    {
                        name: "Silver",
                        description: "MONTHLY",
                        price: "$25.00/Month",
                        radioLabel: 'radio-1'
                    }
                ], 
                selectedPackage: null,
                selectedRadio: null
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
                // { plan: 'AS_Gold' or 'AS_Silver', stripeToken: stripe token}

                // let selectedPlan = null; 

                // if (this.selectedPackage.name === 'Gold') {
                //     selectedPlan = 'AS_Gold'; 
                // } else if (this.selectedPackage.name === 'Silver') {
                //     selectedPlan = 'AS_Silver'; 
                // }

                // let params = {
                //     plan: selectedPlan,
                //     stripeToken: stripeToken
                // };

                // UsersService.subscribe(userId, params).then(() => {
                //     this.$emit('submit'); 
                // });

                this.$emit('submit');
            }
        },
        computed: {
            selectedPackageColorClasses() {
                return {
                    'as-selected-package-gold': this.selectedPackage ? this.selectedPackage.name === 'Gold' : false,
                    'as-selected-package-silver': this.selectedPackage ? this.selectedPackage.name === 'Silver' : false
                };
            }
        }
    };
</script>

<style lang="scss">
    @import '~@/demo-common/styles/colors';

    .as-initialize-step-1 {
        display: flex; 
        flex-wrap: wrap;
    }

    .as-initialize-step-1-packages {
        min-width: 280px; 
        max-width: 350px;
        margin-right: 24px;
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