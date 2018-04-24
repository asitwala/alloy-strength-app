<template>
    <div class="notification-container"> 
        <v-alert 
            class="notification"
            :class="[typeClasses]"
            :icon="icon"
            dismissible 
            v-model="showNotification" 
            transition="as-fade" 
        > 
            <slot name="notification-content"/>
        </v-alert> 
    </div>
</template>

<script>

export default {
    props: {
        type: {
            type: String,
            validator: (type) => {
                let validTypes = ["reset", "save", "submit", "resetWarning", "submitWarning"];
                return validTypes.indexOf(type) >= 0; 
            }
        },
        visible: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            icon: "error",
            showNotification: false
        }
    },
    computed: {
        typeClasses() {
            return {
                'save': this.type === 'save',
                'submit': this.type === 'submit', 
                'reset': this.type === 'reset',
                'warning': this.type === 'resetWarning' || this.type === 'submitWarning'
            };
        }
    },
    watch: {
        visible: function(newVal) {
            if (this.type === 'resetWarning' || this.type === 'submitWarning') {
                this.icon = "error";
            } else {
                this.icon = "check_circle"; 
            }
            this.showNotification = newVal; 
        },
        showNotification: function(newVal) {
            if (newVal !== this.visible) {
                this.$emit('update-visibility', newVal)
            }
        }
    }
};

</script>

<style lang="scss">
    @import '~@/demo-common/styles/transitions';
    @import '~@/demo-common/styles/colors';

    .notification-container {
        width: 60%; 
        margin: 0 auto;
    }

    .notification {
        margin-left: 0px;
        position:fixed; 
        width: 50%; 
        z-index: 100; 
        border: none; 
        border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important; 
        border-radius: 5px !important; 
        min-height: 60px;
        
        span {
            margin-right: 5px; 
        }
    }

    .notification-button {

        &.btn {
            min-width: 70px !important;
        }

        &:hover {
            background-color: rgba(0, 0, 0, 0.2);
        }
        .btn__content {
            background-color: rgba(0, 0, 0, 0.1);
        }
    }

    .save {
        background-color: $blueBase !important;
        color: white !important;

    }

    .submit {
        background-color: $greenBase !important; 
        color: white !important;
    }

    .reset {
        background-color: $blueGreyBase !important;
        color: white !important;
    }

    .warning {
        background-color: $amberLighten3 !important; 
        color: black !important;
    }

</style>