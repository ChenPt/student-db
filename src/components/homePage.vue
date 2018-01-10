<template>
	<div>
		<input type="text" name="username" v-model="username" placeholder="输入姓名">
		<input type="password" name="password" v-model="password" placeholder="输入密码">
		<button @click="register">注册</button>
		<button @click="login">登录</button>
		<p>name is {{ username }}</p>
		<p>pwd is:{{ md5_pwd }}</p>
	</div>
</template>

<script>
	import md5 from 'js-md5';
    export default {
		name: 'home',
		data(){
			return {
				username: '',
				password: ''
			}
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

				console.log(this.md5_pwd);
				this.$http.post('/api/user/register', {
					username: username,
					password: password
				}).then((res) => {
					console.log(res);
				})
			},
			login() {
				var username = this.username;
				var password = this.md5_pwd;

				this.$http.post('/api/user/login', {
					username: username,
					password: password
				}).then((res) => {
					console.log(res.body);
				})
				
			}
		}
	}
</script>

<style scoped>

</style>

