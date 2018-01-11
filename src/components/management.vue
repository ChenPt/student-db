<template>
    <div>        
        
        <el-container>
            <el-header>
                <p>PT学生信息管理系统</p>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <sideMenu :type="type"></sideMenu>
                </el-aside>
                <el-main>
					<searchS @getform="selectStudent" v-if="Pipei('searchS', index)"></searchS>
					<el-button type="primary" @click="selectAll" v-if="Pipei('searchS', index)">查找全部学生</el-button>
                    <stable :tData="tableData" v-if="Pipei('searchS', index)"></stable>
					<addS v-if="Pipei('addS', index)"></addS>
                </el-main>
            </el-container>
        </el-container>
    </div>
    
</template>
<script>
    import stable from './studentTable';
	import sideMenu from './sideMenu';
	import searchS from './searchStudent';
	import addS from './addStudent';

    export default {
        name: 'mg',
        props: {
            msg: {
            }
        },
        data() {
            return {
                tableData: [],
                index: '',
				clickKey: '',
				type: ''
            }
        },
        computed:{
            
        },
        watch: {
            $route(to, from){
                this.index = to.params.msg;
                console.log(from);
                console.log(to);
                console.log(this.index === 'search')
            }
        },
        components:{
            stable,
			sideMenu,
			searchS,
			addS
		},
        created() {
			this.type = this.msg.user_type;
            console.log(this.msg.user_type);
        },
        methods: {
            Pipei(key, index) {
                if(key==='' && index==='') return ;
                return key === index;
            },
            selectAll() {
                this.$http.get('/api/student/selectAll', {

                }).then((res) => {
                    this.tableData = res.body.data;
                    console.log(res.body);
                })
			},
			selectStudent(data){ 
				if(data.num == 1){
					this.selectSBykey(data);
				}
				else if(data.num == 2) {
					this.selectSByTwoKey(data);
					console.log('selectBy2');
				}
				console.log(data);

			},
			selectSBykey(form) {
				this.$http.post('/api/student/selectBykey', {
					key: form.key,
					value: form.value
				}).then((res) => {
					this.tableData = res.body.data;
					console.log(res.body);
				})
			},
			selectSByTwoKey(form) {
				this.$http.post('/api/student/selectBytwoKey', {
					key1: form.key1,
					key2: form.key2,
					value1: form.value1,
					value2: form.value2
				}).then((res) => {
					this.tableData = res.body.data;
					console.log(res.body);
				})
			}
            
        }
    }
</script>
<style scoped>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }
    
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 30px;
        min-height: 300px;
    }
    .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
