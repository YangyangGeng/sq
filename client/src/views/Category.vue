<template>
    <div style="margin: 10px 0; text-align: right;">
        <el-button type="primary" @click="showAddCategory(null)">新增一级分类</el-button>
    </div>
    <el-table :data="data" row-key="_id"
        default-expand-all
        border style="width: 100%">
        <el-table-column type="index" label="序号" width="100" />
        <el-table-column prop="name" label="分类名称" />
        <el-table-column prop="date" label="分类图片">
            <template #default="{ row }">
                <el-image style="width: 50px; height: 50px" :src="row.url" fit />
            </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
            <template #default="{ row }">
                <el-tag  :type="row.status ? 'success' : 'warning'">{{ row.status ? '已上线' : '已下线' }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="400">
            <template #default="{ row }">
                <el-button size="small" type="success" @click="online(row)">上线</el-button>
                <el-popconfirm
                    confirm-button-text="确定" confirm-button-type="warning" cancel-button-text="取消"
                    icon-color="#626AEF" :title="`确定要下线${row.name}?`" @confirm="offline(row)">
                    <template #reference>
                        <el-button size="small" type="warning">下线</el-button>
                    </template>
                </el-popconfirm>
                <!-- <el-popconfirm
                    confirm-button-text="确定" confirm-button-type="danger" cancel-button-text="取消"
                    icon-color="#626AEF" :title="`确定要删除${row.name}?`" @confirm="deleteRow(row)">
                    <template #reference>
                        <el-button size="small" type="danger">删除</el-button>
                    </template>
                </el-popconfirm> -->
                <el-button size="small" @click="showEditCategory(row)">编辑</el-button>
                <el-button size="small" type="primary" v-if="row.children" @click="showAddCategory(row)">增加子分类</el-button>
            </template>
        </el-table-column>
  </el-table>
  <!-- 新增一级分类 -->
  <el-dialog v-model="categoryState.show" :title="`新增${categoryState.form.pid ? '二级' : '一级'}分类`" width="450px">
        <el-form ref="addCategoryRef" :model="categoryState.form" label-width="80px">
            <el-form-item label="分类名称" prop="name" :rules="{ required: true, message: '请输入分类名称' }">
                <el-input v-model="categoryState.form.name" placeholder="请输入分类名称" />
            </el-form-item>
            <el-form-item label="分类图片" prop="url" :rules="{ required: true, message: '请上传分类图片' }">
                <el-input v-model="categoryState.form.url"  placeholder="请上传分类图片" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="categoryState.show = false">取消</el-button>
                <el-button type="primary" @click="addCategory(addCategoryRef)">保存</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts">
import { FormInstance } from 'element-plus';
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { _createCategory, _deleteCategory, _getCategory, _updateCategory } from '../api/category'

export default defineComponent({
    setup() {
        // 列表数据
        const state = reactive({
            data: [],
        })

        // 新增一级分类
        const addCategoryRef = ref<FormInstance>();
        let categoryState = reactive({ show: false, form: { _id: '', pid: '', name: '', url: '' } });
        const showAddCategory = (row: any) => {
            categoryState.show = true;
            categoryState.form = {
                _id: '',
                name: '',
                url: '',
                pid: row ? row._id: ''
            }
        }
        // 编辑
        const showEditCategory = (row: any) => {
            categoryState.show = true;
            categoryState.form = {
                _id: row._id,
                pid: row.pid ? row.pid: '',
                name: row.name,
                url: row.url,
            };
        }
        const addCategory = (formEl: FormInstance | undefined) => {
            if (!formEl) return
            formEl.validate((valid) => {
                if (valid) {
                    let res;
                    const { form } = categoryState;
                    if (form._id) {
                        res = _updateCategory(form._id, form)
                    } else {
                        res = _createCategory({ name: form.name, url: form.url, pid: form.pid })
                    }
                    res.then(() => {
                        getCategory();
                        categoryState.show = false;
                    });
                } else {
                    return false
                }
            })
        }

        const getCategory = () => {
            _getCategory().then((res) => {
                console.log('res', res);
                if (res.success) {
                    state.data = res.msg;
                }
            });
        }

        const online = (row: any) => {
            _updateCategory(row._id, { status: 1 }).then(() => {
                getCategory()
            })
        }

        const offline = (row: any) => {
            _updateCategory(row._id, { status: 0 }).then(() => {
                getCategory()
            })
        }

        const deleteRow = (row: any) => {
            _deleteCategory(row._id).then(() => {
                getCategory()
            })
        }

        onMounted(() => {
            getCategory()
        })

        return {
            ...toRefs(state),
            getCategory,
            online,
            offline,
            deleteRow,
            addCategoryRef,
            categoryState,
            showAddCategory,
            addCategory,
            showEditCategory
        }
    },
})
</script>
<style>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
.el-tree-node__content {
    height: 54px !important; line-height: 54px;
}
.categoryImg { margin: 20px 0; width: 50px; height: 50px; border-radius: 50%; }
</style>
