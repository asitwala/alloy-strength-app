<script>

// Use GM for global mixin namespace so vue methods, etc. aren't accidentally overwritten
export default {
    beforeRouteEnter (to, from, next) {
        console.log('Before route enter!');
        next(vm => {
            const loggedIn = vm.$session && vm.$session.has('user');
            const requireAuth = to.meta.requireAuth; 
            if (!loggedIn && requireAuth) {
                vm.$router.push({name: 'Unauthorized', params: {path: to.path}});
            } else {
                return; 
            }
        });
    },
    data() {
        return {
            accessLevelGM: null,
            officialStepGM: null
        }
    },
    methods: {
        validAccessLevelGM(accessLevel) {
            return (accessLevel >= 0);
        },
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
            const notInStepper = this.$route.name !== 'Initialize';

            if (notInStepper) {    
                this.$router.push({name: `Initialize`});
            } 

            this.officialStepGM = stepNum;
        },
        routeElsewhereGM(name) {
            if (this.$route.name !== name) {
                this.$router.push({name: name});
            }
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