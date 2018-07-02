<template>
    <div class="as-faq">
        <h1>Frequently Asked Questions</h1>
        <v-divider/>
        <v-expansion-panel expand>
            <v-expansion-panel-content v-for="(item, index) in items" :key="index">
                <div slot="header"><p class="as-faq-question">{{ item.question}}</p></div>
                <v-card>
                    <v-card-text class="grey lighten-3 as-faq-question-text">
                        <div v-html="item.answer"></div>
                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </div>
</template>


<script>

import frequentlyAskedQuestions from '@/demo-home/frequentlyAskedQuestions'; 

export default {
    data() {
        return {
            items: frequentlyAskedQuestions
        }
    }
};  


</script>


<style lang="scss">

    .as-faq {

        &-question {
            font-size: 18px;
            margin-bottom: 0px !important;
        }

        &-question-text {
            div {
                p:last-of-type {
                    margin-bottom: 0px !important;
                }
            }
        }

        .card__text {
            padding-left: 24px; 
        }

        h1 {
            text-align: center;
        }

        .divider {
            margin-bottom: 20px;
        }

        width: 70%;
        margin: 20px auto;

        &-content {
            margin-top: 5px;
        }
    }

</style>