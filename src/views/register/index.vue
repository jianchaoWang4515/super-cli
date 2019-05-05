<template>
    <div class="reg-page" sw-role='cell' sw-align='center' sw-valign='middle'>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="名称">
                <el-input v-model="form.userName"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="form.account"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    name: 'register',
    data () {
        return {
            form: {
                userName: '',
                account: '',
                password: ''
            }
        };
    },
    methods: {
        onSubmit () {
            this.axios.post('/wjc/register', this.form).then(res => {
                this.$message({
                    type: 'success',
                    message: '恭喜你，注册成功, 请登录!',
                    duration: 700,
                    onClose: () => {
                        this.$router.go(-1);
                    }
                });
            }).catch(err => {
                this.$message({
                    type: 'error',
                    message: err.message
                });
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.reg-page{
    height: 100%;
    .el-form{
        width: 50%;
        height: fit-content;
    }
}
</style>


