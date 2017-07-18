<template>
    <div class="layout">
        <div class="layout-ceiling">
    
            <div class="layout-ceiling-main">
                <Poptip placement="bottom-end" width="320">
                    <a>注册登录</a>
                    <div class="api" slot="content">
                        <h1 style="text-align:center;padding:15px;">账户信息登录</h1>
                        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="40">
                            <Form-item label="账户" prop="username">
                                <i-input type="text" v-model="formCustom.username" placeholder="请输入..."></i-input>
                            </Form-item>
                            <Form-item label="密码" prop="password">
                                <i-input type="password" v-model="formCustom.password" placeholder="请输入..."></i-input>
                            </Form-item>
                            <Form-item>
                                <Button type="primary" @click="handleSubmit('formCustom')">提交</Button>
                                <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
                            </Form-item>
                            <Form-item>
                                <img src="/static/images/login_with_douban_32.png" style="width:168;height:32px;" />
                            </Form-item>
                        </Form>
                    </div>
                </Poptip> |
                <a href="#">帮助中心</a> |
                <a href="#">安全中心</a> |
                <a href="#">服务大厅</a>
            </div>
        </div>
        <div class="layout-header">
            <div class="layout-logo">
                        <img src="/static/images/lg_movie@2x.png" />
                    </div>
        </div>
        <div class="layout-content">
            <router-view :key="key"></router-view>
        </div>
        <div class="layout-copy">
            2016-2017 &copy; Douban data
        </div>
        <Back-top></Back-top>
    </div>
</template>

<script>
// import api from '@api'
export default {
    data() {
        return {
            list: [],
            formCustom: {
                username: '',
                password: ''
            },
            ruleCustom: {
                username: [
                    { required: true, message: '请填写账户信息', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请填写账户密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        key() {
            return this.$route.path.replace(/\//g, '_')
        },
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('提交成功!');
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        }
    },
    // metaInfo() {
    //     return {
    //         title: 'nodejs'
    //     }
    // },
    async mounted() {
        // await api.get('/v2/movie/in_theaters?count=8')
    }
}
</script>

<style scoped>
.layout {
    /*border: 1px solid #d7dde4;*/
    background: #f5f7f9;
    position: relative;
    /*border-radius: 3px;*/
    overflow: hidden;
}

.layout-logo {
    width: 100px;
    height: 30px;
    background: #495060;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}

.layout-logo img {
    position: absolute;
    width: 95px;
    left: 3px;
    top: 5px;
}

.layout-header {
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
}

.layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}

.layout-ceiling {
    background: #464c5b;
    padding: 10px 0;
    overflow: hidden;
}

.layout-ceiling-main {
    float: right;
    margin-right: 15px;
}

.layout-ceiling-main a {
    color: #9ba7b5;
}

.layout-content {
    min-height: 350px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
}

</style>
