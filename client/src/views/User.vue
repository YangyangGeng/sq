<template>
    <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="手机号">
            <el-input v-model="phone" placeholder="手机号查询" />
        </el-form-item>
        <el-form-item label="昵称">
            <el-input v-model="nickname" placeholder="昵称查询" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="getUsers">查询</el-button>
            <el-button type="success" @click="addUserState.show = true">新增</el-button>
        </el-form-item>
    </el-form>
    <el-table :data="users" v-loading="loading" stripe style="width: 100%">
        <el-table-column prop="_id" label="ID" width="240" />
        <el-table-column prop="phone" label="账户" width="150" />
        <el-table-column prop="nickname" label="昵称" width="150" />
        <el-table-column prop="createdAt" label="创建时间" />
        <el-table-column prop="updatedAt" label="修改时间" />
        <el-table-column label="操作"  width="140">
            <template #default="scope">
                <el-button size="small" @click="confirmEdit(scope.$index, scope.row)">编辑</el-button>
                <el-popconfirm
                    confirm-button-text="确定" confirm-button-type="danger"
                    cancel-button-text="取消" :icon="InfoFilled"
                    icon-color="#626AEF" :title="`确定要删除${scope.row.nickname}?`"
                    @confirm="confirmDelete(scope.$index, scope.row)"
                >
                    <template #reference>
                        <el-button size="small" type="danger">删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination v-model:currentPage="currentPage" :page-size="pageSize"
      layout="total, prev, pager, next" :total="total" :background="true"
      @size-change="getUsers" @current-change="getUsers"
    />
    <!-- 新增用户信息 -->
    <el-dialog v-model="addUserState.show" title="新增用户" width="450px">
        <el-form ref="addUserRef" :model="addUserState.form" label-width="80px">
            <el-form-item label="电话号码" prop="phone" :rules="{ required: true, message: '请输入手机号码' }">
                <el-input v-model="addUserState.form.phone" placeholder="请输入手机号码" />
            </el-form-item>
            <el-form-item label="昵称" prop="nickname" :rules="{ required: true, message: '请输入昵称' }">
                <el-input v-model="addUserState.form.nickname"  placeholder="请输入昵称" />
            </el-form-item>
            <el-form-item label="密码" prop="password" :rules="{ required: true, message: '请输入密码' }">
                <el-input type='password' v-model="addUserState.form.password" placeholder="请输入密码" show-password />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="addUserState.show = false">取消</el-button>
                <el-button type="primary" @click="addUser(addUserRef)">保存</el-button>
            </span>
        </template>
    </el-dialog>
    <!-- 编辑用户信息 -->
    <el-dialog v-model="editUserState.show" title="编辑用户信息" width="450px">
        <el-form ref="editUserRef" :model="editUserState.form" label-width="80px">
            <!-- <el-form-item label="电话号码" prop="phone" :rules="{ required: true, message: '请输入手机号码' }">
                <el-input v-model="form.phone" placeholder="请输入手机号码" />
            </el-form-item> -->
            <el-form-item label="昵称" prop="nickname" :rules="{ required: true, message: '请输入昵称' }">
                <el-input v-model="editUserState.form.nickname"  placeholder="请输入昵称" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="editUserState.show = false">取消</el-button>
                <el-button type="primary" @click="editUser(editUserRef)">保存</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { InfoFilled } from '@element-plus/icons-vue'
import { _deleteUser, _getUsers, _updateUser } from '../api/user';
import { FormInstance } from 'element-plus';
import { _register } from '../api/auth';

export default defineComponent({
    setup() {
        // 列表数据
        const state = reactive({
            loading: false,
            users: [],
            total: 0,
            phone: '',
            nickname: '',
            currentPage: 1,
            pageSize: 3,
        });

        const editUserRef = ref<FormInstance>();
        const addUserRef = ref<FormInstance>();
        // 编辑
        const editUserState = reactive({
            show: false,
            form: {
                id: '',
                nickname: '',
            }
        });
        // 新增
        const addUserState = reactive({
            show: false,
            form: {
                phone: '',
                nickname: '',
                password: '',
            }
        });

        // 获取用户列表
        const getUsers = () => {
            state.loading = true;
            _getUsers({
                phone: state.phone,
                nickname: state.nickname,
                currentPage: state.currentPage,
                pageSize: state.pageSize,
            }).then(res => {
                if (res.success) {
                    const s = res.msg;
                    state.total = s.total;
                    state.users = s.list;
                }
            }).finally(() => {
                state.loading = false;
            });
        }
        // 编辑用户信息
        const confirmEdit = (index: number, row: any) => {
            editUserState.form.nickname = row.nickname;
            editUserState.form.id = row._id;
            editUserState.show = true;
        }
       
        // 删除用户
        const confirmDelete = (index: number, row: any) => {
            _deleteUser(row._id).then(res => {
                if (res.success) {
                    state.users.splice(index, 1);
                }
            })
        }

        // 新增
        const addUser = (formEl: FormInstance | undefined) => {
            if (!formEl) return
            formEl.validate((valid) => {
                if (valid) {
                    _register(addUserState.form).then(() => {
                        getUsers();
                        addUserState.show = false;
                    });
                } else {
                    return false
                }
            })
        }

        // 保存
        const editUser = (formEl: FormInstance | undefined) => {
            if (!formEl) return
            formEl.validate((valid) => {
                if (valid) {
                    _updateUser(editUserState.form).then(() => {
                        getUsers();
                        editUserState.show = false;
                    });
                } else {
                    return false
                }
            })
        }

        onMounted(() => {
            getUsers()
        })

        return {
            ...toRefs(state),
            editUserState,
            addUserState,
            InfoFilled,
            getUsers,
            addUserRef,
            editUserRef,
            addUser,
            editUser,
            confirmEdit,
            confirmDelete
        }
    },
})
</script>