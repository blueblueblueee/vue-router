<template>
    <div class="login">
        <div class="login-content">
            <p class="login-title">后台管理系统</p>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password"></el-input>
                </el-form-item>

                <div class="btn">
                    <el-form-item>
                        <el-button type="primary" class="login-btn" center @click="login('ruleForm')">登录</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="register-btn" @click="goRegister()">注册</el-button>
                    </el-form-item>
                </div>

            </el-form>
        </div>
    </div>
</template>

<script>

import { login } from '../../api'

export default {
    data(){
        return {
            ruleForm:{
                name:'',
                password:''
            },
            rules:{
                name:[
                    {require:true,message:'请输入用户名',trigger:'blur'},
                    {min:3,max:5,message:'长度在3-5个字符',trigger:'blur'}
                ],
                password:[
                    {require:true,message:'请输入密码',trigger:'blur'},
                    {min:8,message:'长度至少8个字符',trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        async login(){
            let data = await login(this.name);
            console.log(data);
        },
        goRegister(){
            this.$router.push('/register');
        }
    }
}
</script>