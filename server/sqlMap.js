// sql语句
var sqlMap = {
    // 用户
    user: {
        add: 'insert into user(username, password, user_type) values (?, ?,0)',
        select_name: 'SELECT * from user where username = ?',  //查询用户名
        select_password: 'SELECT username,user_type from user where username = ? and password = ?' //查询用户密码
    },
    student: {

        add: 'insert into student(sno, sname, sex, sbirthday, dno, spno, class_no, phone, address, enroll_day) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ',
        delete: 'DELETE FROM student where ? = ?',
        select_all: 'SELECT * from student where sno = ?',
        update: 'UPDATE student SET s'

    },
    department: {
        add: 'insert into department(dno, dept_name) values (?, ?)',
        delete: 'DELETE FROM department where ? = ?'
    },
    course: {
        select_info: 'SELECT * from student where sno = ?',
        select_score: 'SELECT sno,score from sc,student where student.sno = ? and sc.sno = student.sno ',
        select_course: 'SELECT * from sc where sno = ?'
    }

}

module.exports = sqlMap;