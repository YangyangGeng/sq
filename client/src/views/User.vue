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
            <el-button type="success" @click="getUsers">新增</el-button>
        </el-form-item>
    </el-form>
    <el-table :data="users" v-loading="loading" stripe style="width: 100%">
        <el-table-column prop="_id" label="ID" width="240" />
        <el-table-column prop="phone" label="账户" width="150" />
        <el-table-column prop="nickname" label="昵称" width="150" />
        <el-table-column prop="createdAt" label="创建时间" />
        <el-table-column prop="updatedAt" label="修改时间" />
        <el-table-column label="操作">
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
    <el-pagination
      v-model:currentPage="currentPage" :page-size="pageSize"
      layout="total, prev, pager, next" :total="total" :background="true"
      @size-change="getUsers" @current-change="getUsers"
    />
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { InfoFilled } from '@element-plus/icons-vue'
import { _deleteUser, _getUsers } from '../api/user';

export default defineComponent({
    setup() {
        let state = reactive({
            loading: false,
            users: [],
            total: 0,
            phone: '',
            nickname: '',
            currentPage: 1,
            pageSize: 3,
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
            console.log(index, row);
        }
        // 删除用户
        const confirmDelete = (index: number, row: any) => {
            console.log(index, row);
            _deleteUser(row._id).then(res => {
                if (res.success) {
                    state.users.splice(index, 1);
                }
            })
        }

        onMounted(() => {
            getUsers()
        })

        return {
            ...toRefs(state),
            getUsers,
            InfoFilled,
            confirmEdit,
            confirmDelete
        }
    },
})
</script>


