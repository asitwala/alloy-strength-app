<template>
    <div class="as-initialize-step-1">
        <div class="as-initialize-step-1-packages">
            <h1>Available Packages</h1>
            <p>Please select one of the packages below to get started with Alloy Strength's
                training system.
            </p>
            <v-card v-for="asPackage in asPackages" :key="asPackage.name"
                class="as-initialize-available-package"
                :class="[{'selected': asPackage.name === selectedPackage.name}]">
                <div class="as-package-overlay"></div>
                <div class="as-selected-package-icon" v-if="asPackage.name === selectedPackage.name"><v-icon right>check_circle</v-icon></div>
                <v-card-title @click="selectPackage(asPackage)">
                    <div>
                        <div class="as-initialize-available-package-title">
                            <h2>{{ asPackage.name }}</h2>
                            <div class="as-initialize-title-divider"></div> 
                            <h4>{{ asPackage.description }}</h4>
                        </div>
                        <div class="as-initialize-available-package-desc">
                            <h4 style="margin-top: 4px;"> {{ asPackage.price }}</h4>
                        </div>
                    </div>
                </v-card-title>
            </v-card>
        </div>

        <div class="as-initialize-step-1-stripe">
        
            <h4 class="as-package-message">{{ selectedPackageMessage }}</h4>
            <v-card class="as-initialize-step-1-stripe-container">
                <v-card-text>
                    <h2><span style="margin-right: 12px"><v-icon>fa-shopping-cart</v-icon></span>Checkout</h2>
                    <p style="margin-top: 12px; margin-bottom: 4px">Please enter your payment information below</p>
                    <div class="as-initialize-step-1-stripe-component">
                        <as-stripe></as-stripe>
                        
                    </div>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash'; 

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
                        price: "$90.00 ($15/Month)"
                    },
                    {
                        name: "Silver",
                        description: "MONTHLY",
                        price: "$25.00"
                    }
                ], 
                selectedPackage: {},
            }
        },
        methods: {
            selectPackage(asPackage) {
                this.selectedPackage = asPackage; 
            }
        },
        computed: {
            selectedPackageMessage() {
                return (_.isEmpty(this.selectedPackage) ? `You have not selected a package.` : 
                    `You have selected the ${this.selectedPackage.name} package.`);
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


    .as-initialize-step-1-stripe {
        min-width: 280px; 
        flex: 1; 

        .as-package-message {
            margin-top: 64px;
            margin-bottom: 16px;
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