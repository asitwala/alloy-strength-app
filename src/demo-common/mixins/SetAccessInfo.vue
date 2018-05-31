<script>

// Use GM for global mixin namespace so vue methods, etc. aren't accidentally overwritten
export default {
    data() {
        return {
            accessLevelGM: null
        }
    },
    methods: {
        resetAccessLevelGM() {
            this.accessLevelGM = null;
        },
        setAccessLevelGM(accessLevel) {
            this.accessLevelGM = accessLevel; 
        },
        handleAccessLevelGM(accessLevel) {
            this.setAccessLevelGM(accessLevel);
            this.handleRoutingGM();
        },
        routeToStepperGM(stepNum) {
            if (this.$route.name !== 'Initialize') {
                this.$router.push({name: 'Initialize', params: { givenStep: stepNum }});
            }
            this.resetAccessLevelGM();
        },
        routeElsewhereGM(name) {
            if (this.$route.name !== name) {
                this.$router.push({name: name});
            }
            this.resetAccessLevelGM();
        },
        handleRoutingGM() {
            switch (this.accessLevelGM) {
                case 0:
                    this.routeToStepperGM(1);
                    break;
                case 1: 
                    this.routeToStepperGM(2);
                    break;
                case 2: 
                    this.routeToStepperGM(3);
                    break;
                case 3: 
                    this.routeElsewhereGM('RenewSubscription');
                    break;
                default: 
                    break;
            }
        }
    }
}
</script>