<template>
    <div class="as-initialize-step-3">
        <div class="as-initialize-step-3-packages">
            <h1>Available Packages</h1>
            <p>Please select one of the packages below to get started with Alloy Strength's
                training system.
            </p>
            <v-card v-for="asPackage in asPackages" :key="asPackage.name"
                class="as-initialize-available-package">
                <v-card-title>
                    <div>
                        <div class="as-initialize-available-package-title">
                            <h2>{{ asPackage.name }}</h2>
                            <h4>{{ asPackage.description }}</h4>
                        </div>
                        <div class="as-initialize-available-package-desc">
                            <h4> {{ asPackage.price }}</h4>
                        </div>
                    </div>
                </v-card-title>
            </v-card>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                asPackages: [
                    {
                        name: "Gold",
                        description: "12 MONTHS",
                        price: "$480.00 ($40/Month)"
                    },
                    {
                        name: "Silver",
                        description: "6 MONTHS",
                        price: "$300.00 ($50/Month)"
                    },
                    {
                        name: "Bronze",
                        description: "3 MONTHS",
                        price: "$165.00 ($55/Month)"
                    }
                ]
            }
        }
    };
</script>

<style lang="scss">
    @import '~@/demo-common/styles/colors';

    .as-initialize-step-3-packages {
        min-width: 350px; 
        width: 350px;
        max-width: 350px;
    }

    .as-initialize-available-package {
        width: 350px;
        margin-bottom: 12px;

        &-title {
            display: flex;
        }
    }

    .as-initialize-available-package:nth-of-type(1) {
        background-color: $amberLighten1;
    }

    .as-initialize-available-package:nth-of-type(2) {
        background-color: $greyLighten1;
    }

    .as-initialize-available-package:nth-of-type(3) {
        background-color: #8C7853;
    }

    

</style>