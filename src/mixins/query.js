export default {
    computed: {
        query () {
            return {
                ...this.$route.query
            };
        }
    }
};
