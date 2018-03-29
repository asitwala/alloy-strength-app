<template>
    <tr class='as-tempo-row'>
        <td>{{ tempoRow.name }}</td>
        <td v-for="(tempoInput, inputIndex) in tempoRow.inputs">
            <div class='as-tempo-col'> 
                <div
                    v-for="(tempoItem, itemIndex) in tempoInput.value" :key="itemIndex" 
                >
                    <div class="as-tempo-input">
                        {{ tempoItem }}
                        <div class="as-tempo-divider" v-if="itemIndex < 2"></div> 
                    </div>
                </div> 
            </div>
        </td>
    </tr>
</template>

<script>
    export default {
        props: {
            tempoRow: {
                type: Object,
                required: true
            }
        }
    };
</script>

<style lang="scss">
    .as-tempo-row {
        .as-tempo-col {
            display: flex;
            width: 100px;
            flex-direction: row !important; 
        }
    }
    .as-tempo-divider {
        height: 15px; 
        width: 2px !important; 
        background-size: 1px 2px; 
        background-image: linear-gradient(to bottom, black 50%, transparent 50%);
        background-repeat: repeat-y; 
        margin: 0 12px;
    }

    .as-tempo-input {
        display: flex;
        align-items: center;
    }

</style>