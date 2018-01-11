<template>
<div>
	<el-menu
	default-active="1"
	class="el-menu-vertical-demo"
	@select="handleSelect"
	background-color="#545c64"
	text-color="#fff"
	router
	active-text-color="#ffd04b">
	<el-submenu index="1">
		<template slot="title">
		<i class="el-icon-setting"></i>
		<span>学生管理</span>
		</template>
		<el-menu-item index="addS" v-if="userType === 2">新增学生</el-menu-item>
		<el-menu-item index="searchS" >查找学生</el-menu-item>
		<el-menu-item index="updateS">修改学生信息</el-menu-item>
        <el-menu-item index="deleteS" v-if="userType === 2">删除学生</el-menu-item>
	</el-submenu>
	<el-submenu index="2">
		<template slot="title">
			<i class="el-icon-setting"></i>
			<span slot="title">课程管理</span>
		</template>
		<el-menu-item index="addC">增加课程</el-menu-item>
		<el-menu-item index="searchC" v-if="userType === 2">查找课程</el-menu-item>
		<el-menu-item index="updateC" v-if="userType === 2">修改课程信息</el-menu-item>
		<el-menu-item index="deleteC" v-if="userType === 2">删除课程信息</el-menu-item>
	</el-submenu>
	<el-submenu index="3">
		<template slot="title">
			<i class="el-icon-setting"></i>
			<span slot="title">成绩管理</span>
		</template>
		<el-menu-item index="addSC" v-if="userType !== 0">增加成绩</el-menu-item>
		<el-menu-item index="searchSC">查找成绩</el-menu-item>
		<el-menu-item index="updateSC" v-if="userType !== 0">修改成绩</el-menu-item>
		<el-menu-item index="deleteSC" v-if="userType === 2">删除成绩</el-menu-item>
	</el-submenu>
	</el-menu>
</div>
 	
</template>
<script>
	export default {
        name: 'sideMenu',
        props:['type'],
		data() {
			return {
                userType: ''
			}
		},
		methods: {
			handleSelect(key) {
                console.log(key);
            }
        },
        created() {
            this.userType = this.type;
            console.log(typeof(this.userType));
        }
	}
</script>
