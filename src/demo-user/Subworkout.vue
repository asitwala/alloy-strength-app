<template>
    <div class="as-subworkout">
        <v-expansion-panel>
            <v-expansion-panel-content>
                <div slot="header">
                    <div>
                        <h3>{{ name }}</h3>
                        <v-btn class="as-video-button" @click.stop="">Watch Video</v-btn>
                    </div>
                </div>
                <v-card>
                    <v-data-table
                        hide-headers
                        hide-actions
                        :items="dataTableItems"
                        >
                        <template slot="items" slot-scope="props">
                            <as-rep-row v-if="props.item.id===1"
                                :rep-row="props.item"/>

                            <as-weight-row v-else-if="props.item.id===2"
                                :weight-row="props.item"/>

                            <as-RPE-row v-else-if="props.item.id===3"
                                :RPERow="props.item"
                                :RPEOptions="RPEOptions"/>
                            
                            <as-tempo-row v-else-if="props.item.id===4"
                                :tempo-row="props.item"/>

                        </template>
                    </v-data-table>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </div>
    
</template>
<script>

// TODO -- figure out what's the issue with imports 
let RepsRow = require('./RepsRow.vue').default;
let WeightsRow = require('./WeightsRow.vue').default;
let RPERow = require('./RPERow.vue').default; 
let TempoRow = require('./TempoRow.vue').default; 

export default {
    components: {
        'as-rep-row': RepsRow,
        'as-weight-row': WeightsRow,
        'as-RPE-row': RPERow,
        'as-tempo-row': TempoRow
    },
    props: {
        name: {
            type: String,
            required: true
        },
        RPEOptions: {
            type: Array,
            required: true
        },
        dataTableItems: {
            type: Array,
            required: true
        }
    }
};

</script>

<style lang="scss">

    @import '~@/demo-common/styles/colors';

    .as-subworkout {
        width: 100%;
        margin-bottom: 20px;

        .as-video-button {
            margin: 6px 0px;

            .btn__content {
                background-color: $lightBlueDarken3;
                color: white;
            }
        }

        .expansion-panel {
            margin-bottom: 20px;
        }

        .small-dialog {
            display: block !important; 
        }
    }

</style>