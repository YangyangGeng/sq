<template>
    <div style="margin: 10px 0; text-align: right;">
        <el-button type="primary" @click="showNotice(null)">新增消息</el-button>
    </div>
    <el-table :data="data" row-key="_id" border style="width: 100%">
        <el-table-column type="index" label="序号" width="100" />
        <el-table-column prop="message" label="消息内同" />
        <el-table-column prop="mid" label="绑定消息ID" width="120" />
        <el-table-column prop="status" label="状态" width="120">
            <template #default="{ row }">
                <el-tag  :type="row.status ? 'success' : 'warning'">{{ row.status ? '已上线' : '已下线' }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="240">
            <template #default="{ row }">
                <el-button size="small" type="success" @click="online(row)">上线</el-button>
                <el-popconfirm
                    confirm-button-text="确定" confirm-button-type="warning" cancel-button-text="取消"
                    icon-color="#626AEF" title="确定要下线?" @confirm="offline(row)">
                    <template #reference>
                        <el-button size="small" type="warning">下线</el-button>
                    </template>
                </el-popconfirm>
                <el-button size="small" @click="showNotice(row)">编辑</el-button>
            </template>
        </el-table-column>
  </el-table>
  <el-pagination v-model:currentPage="currentPage" :page-size="pageSize"
      layout="total, prev, pager, next" :total="total" :background="true"
      @size-change="getNotice" @current-change="getNotice"/>
  <!-- 新增消息 -->
  <el-dialog v-model="noticeForm.show" title="新增消息" width="450px">
        <el-form ref="noticeRef" :model="noticeForm" label-width="80px">
            <el-form-item label="消息内容" prop="message" :rules="{ required: true, message: '请输入消息内容' }">
                <el-input v-model="noticeForm.message" placeholder="请输入消息内容" />
            </el-form-item>
            <el-form-item label="消息ID">
                <el-input v-model="noticeForm.mid"  placeholder="请上传分类图片" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="noticeForm.show = false">取消</el-button>
                <el-button type="primary" @click="saveNotice(noticeRef)">保存</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts">
import { FormInstance } from 'element-plus';
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { _createNotice, _getNotice, _updateNotice } from '../api/notice'

export default defineComponent({
    setup() {
        // 列表数据
        const state = reactive({
            data: [],
            loading: false,
            total: 0,
            currentPage: 1,
            pageSize: 3,
        })

        // 新增一级分类
        const noticeRef = ref<FormInstance>();
        let noticeForm = reactive({ show: false, _id: '', message: '', mid: '' });
        const showNotice = (row: any) => {
            noticeForm.show = true;
            if (row) {
                noticeForm._id = row._id;
                noticeForm.message = row.message;
                noticeForm.mid = row.mid;
            }
        }
       
        const saveNotice = (formEl: FormInstance | undefined) => {
            if (!formEl) return
            formEl.validate((valid) => {
                if (valid) {
                    let res;
                    if (noticeForm._id) {
                        res = _updateNotice(noticeForm._id, noticeForm)
                    } else {
                        res = _createNotice({ message: noticeForm.message, mid: noticeForm.mid })
                    }
                    res.then(() => {
                        getNotice();
                        noticeForm.show = false;
                        noticeForm._id = '';
                        noticeForm.message = '';
                        noticeForm.mid = '';
                    });
                } else {
                    return false
                }
            })
        }

        const getNotice = () => {
            state.loading = true;
            _getNotice({
                currentPage: state.currentPage,
                pageSize: state.pageSize,
            }).then(res => {
                if (res.success) {
                    const s = res.msg;
                    state.total = s.total;
                    state.data = s.list;
                }
            }).finally(() => {
                state.loading = false;
            });
        }

        const online = (row: any) => {
            _updateNotice(row._id, { status: 1 }).then(() => {
                getNotice()
            })
        }

        const offline = (row: any) => {
            _updateNotice(row._id, { status: 0 }).then(() => {
                getNotice()
            })
        }

        onMounted(() => {
            getNotice()
        })

        return {
            ...toRefs(state),
            getNotice,
            online,
            offline,
            noticeRef,
            noticeForm,
            showNotice,
            saveNotice,
        }
    },
})
</script>
