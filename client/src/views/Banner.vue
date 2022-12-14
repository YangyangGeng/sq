<template>
    <div style="margin: 10px 0; text-align: right;">
        <el-button type="primary" @click="showBanner(null)">新增Banner</el-button>
    </div>
    <el-table :data="data" row-key="_id" border style="width: 100%">
        <el-table-column type="index" label="序号" width="100" />
        <el-table-column prop="name" label="Banner标题" />
        <el-table-column label="Banner图片">
            <template #default="{ row }">
                <el-image style="width: 50px; height: 50px" :src="row.url" fit />
            </template>
        </el-table-column>
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
                <el-button size="small" @click="showBanner(row)">编辑</el-button>
            </template>
        </el-table-column>
  </el-table>
  <el-pagination v-model:currentPage="currentPage" :page-size="pageSize"
      layout="total, prev, pager, next" :total="total" :background="true"
      @size-change="getBanner" @current-change="getBanner"/>
  <el-dialog v-model="bannerForm.show" title="新增消息" width="450px">
        <el-form ref="bannerRef" :model="bannerForm" label-width="110px">
            <el-form-item label="Banner名字" prop="name" :rules="{ required: true, message: '请输入Banner名字' }">
                <el-input v-model="bannerForm.name" placeholder="请输入Banner名字" />
            </el-form-item>
            <el-form-item label="Banner图片" prop="url" :rules="{ required: true, message: '请输入Banner图片' }">
                <el-input v-model="bannerForm.url" placeholder="请输入Banner图片" />
            </el-form-item>
            <el-form-item label="消息ID">
                <el-input v-model="bannerForm.mid"  placeholder="请输入消息ID" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="bannerForm.show = false">取消</el-button>
                <el-button type="primary" @click="saveBanner(bannerRef)">保存</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts">
import { FormInstance } from 'element-plus';
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { _createBanner, _getBanner, _updateBanner } from '../api/banner'

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
        const bannerRef = ref<FormInstance>();
        let bannerForm = reactive({ show: false, _id: '', name: '', url: '', mid: '' });
        const showBanner = (row: any) => {
            bannerForm.show = true;
            if (row) {
                bannerForm._id = row._id;
                bannerForm.name = row.name;
                bannerForm.url = row.url;
                bannerForm.mid = row.mid;
            }
        }
       
        const saveBanner = (formEl: FormInstance | undefined) => {
            if (!formEl) return
            formEl.validate((valid) => {
                if (valid) {
                    let res;
                    if (bannerForm._id) {
                        res = _updateBanner(bannerForm._id, bannerForm)
                    } else {
                        res = _createBanner({ name: bannerForm.name, url: bannerForm.url, mid: bannerForm.mid })
                    }
                    res.then(() => {
                        getBanner();
                        bannerForm.show = false;
                        bannerForm._id = '';
                        bannerForm.name = '';
                        bannerForm.url = '';
                        bannerForm.mid = '';
                    });
                } else {
                    return false
                }
            })
        }

        const getBanner = () => {
            state.loading = true;
            _getBanner({
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
            _updateBanner(row._id, { status: 1 }).then(() => {
                getBanner()
            })
        }

        const offline = (row: any) => {
            _updateBanner(row._id, { status: 0 }).then(() => {
                getBanner()
            })
        }

        onMounted(() => {
            getBanner()
        })

        return {
            ...toRefs(state),
            getBanner,
            online,
            offline,
            bannerRef,
            bannerForm,
            showBanner,
            saveBanner,
        }
    },
})
</script>
