import { mapActions } from 'vuex';
export default {
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.updateCrumbs({ to, from });
        });
    },
    beforeRouteUpdate (to, from, next) {
        this.updateCrumbs({ to, from });
        next();
    },
    methods: {
        ...mapActions('breadcrumb', [
            'updateCrumbs'
        ])
    }
};
