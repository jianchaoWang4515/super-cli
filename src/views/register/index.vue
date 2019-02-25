<template>
    <div class="reg-page" sw-role='cell' sw-align='center' sw-valign='middle'>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="名称">
                <el-input v-model="form.user"></el-input>
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
                user: '',
                account: '',
                password: ''
            }
        };
    },
    methods: {
        onSubmit () {
            this.XHR.post('/wjc/register', this.form).then(res => {
                if (res.code === 'success') {
                    this.$message({
                        type: 'success',
                        message: '注册成功， 请登录！'
                    });
                    this.$router.push({ path: 'login' });
                }
            });
        }
    },
    mounted () {
        this.XHR.post('/wjc/login', { account: 'wangjianchao', password: '123456' });
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


