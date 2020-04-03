<style lang="scss" scoped src="./style/index.scss"></style>
<template>
    <div class="login-page" sw-role='cell' sw-align='center' sw-valign='middle'>
        <el-form :model="ruleForm2" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="手机号" prop="pass">
                <el-input v-model="ruleForm2.account" auto-complete="off" @keyup.enter.native="submitForm"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.password" auto-complete="off" @keyup.enter.native="submitForm"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button type="primary" @click="onReg">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    name: 'login',
    data () {
        return {
            ruleForm2: {
                account: '',
                password: ''
            }
        };
    },
    methods: {
        submitForm () {
            let params = { ...this.ruleForm2 };
            this._api.login.logIn({
                type: 'post',
                data: params
            }).then((res) => {
                this.$router.push({ name: 'home' });
            }).catch(err => {
                this.$message(err.message);
            });
        },
        onReg () {
            this.$router.push({ path: 'register' });
        }
    }
};
</script>