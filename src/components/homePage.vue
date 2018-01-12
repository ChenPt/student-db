<template>

	<div>
		<img src="../assets/logo.png">
		<el-container>
			<el-header>欢迎来到学生信息管理系统</el-header>
			<el-main>
				<el-row>
					<el-col :span="12" :offset="6">
						<el-input type="text" name="username" v-model="username" placeholder="输入账号" clearable></el-input>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="12" :offset="6">
						<el-input type="password" name="password" v-model="password" placeholder="输入密码" clearable></el-input>
					</el-col>
				</el-row>
				
				<el-button @click="register" type="primary">注册</el-button>
				<el-button @click="login" type="primary">登录</el-button>
			</el-main>
		</el-container>
		
	</div>
</template>

<script>
	import md5 from 'js-md5';
	import mg from './management';


    export default {
		name: 'home',
		data(){
			return {
				username: '',
				password: ''
			}
		},
		components:{
			mg
		},

		computed: {
			md5_pwd() {
				return md5(this.password);
			}
		},
		methods: {
			register() {
				var username = this.username;
				var password = this.md5_pwd;
				if(username === '' || password === ''){
					this.showErr('账号和密码不可为空');
					return ;
				}

				console.log(this.md5_pwd);
				this.$http.post('/api/user/register', {
					username: username,
					password: password,
					user_type: 0
				}).then((res) => {

					console.log(res.body);
					if(res.body.code === 202) {
						this.showErr('账号已存在');
					}
					else if(res.body.code === 200) {
							this.showSuccess(res.body.msg);	
							this.$router.push({path:`/mg/${res.body.msg}`})
					}
				})
			},
			login() {
				var username = this.username;
				var password = this.md5_pwd;

				if(username === '' || password === ''){
					this.showErr('账号和密码不可为空');
					return ;
				}

				this.$http.post('/api/user/login', {
					username: username,
					password: password
				}).then((res) => {
					// this.$router.push({path: `/mg/${res.body.data[0]}`})
					console.log(res.body)
					if(res.body.code === 203) {
						this.showErr('账号不存在')
					}
					else if(res.body.code !== 200) {
						this.showErr(res.body.msg)
					}
					else if(res.body.code === 200) {
						this.$router.push({name:'mg',params:{msg: res.body.data[0]}})
					}
				})
				
			},
			showSuccess(msg) {
				this.$message({
					message: msg,
					type: 'success'
				})
			},
			showErr(msg) {
				this.$message.error(msg);
			}
		}
	}
</script>

<style scoped>

</style>

