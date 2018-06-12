<style lang="scss" scoped src="./style/index.scss"></style>
<template>
    <div class="login-page">
        <el-form :model="ruleForm2" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="pass">
                <el-input type="password" v-model="ruleForm2.account" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import store from '@/modules/my-vue-plugin/loginStore';
import qs from 'qs';
export default {
    name: 'login',
    beforeCreate() {
        if (!this.$store.state.myLoginStore) this.$store.registerModule('myLoginStore', store);
    },
    data() {
        return {
            ruleForm2: {
                account: '',
                password: ''
            }
        }
    },
    methods: {
        submitForm() {
            let params = {
                mobile: 13989456369,
                password: 'Aa123456'
            }
            this.XHR.post('/platform/login', qs.stringify(params)).then((res) => {
                if (res.code === 'success') {
                    // this.$store.commit('SET_LOGIN_INFOR', res.data);
                    this.$router.push({ path: 'home' });
                }
            });
        }
    }
}
</script>