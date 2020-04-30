export const crumbsMap = (function () {
    const crumbs = [];
    return {
        isExist (path) {
            let index = crumbs.findIndex((item) => {
                return item.path === path;
            });
            return index > -1;
        },
        setVal ({ path, breadName }) {
            if (!this.isExist(path)) {
                crumbs.push({
                    path,
                    breadName
                });
            }
        },
        getVal () {
            return crumbs;
        }
    };
})();
