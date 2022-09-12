<template>
    <div style="margin: 10px 0; text-align: right;">
        <el-button type="primary" @click="showAddCity(null)">新增一级城市</el-button>
    </div>
    <el-table :data="data" row-key="_id"
        border style="width: 100%">
        <el-table-column type="index" label="序号" width="100" />
        <el-table-column prop="name" label="城市名称" />
        <el-table-column prop="preChar" label="城市首字母" />
        <el-table-column label="操作" width="400">
            <template #default="{ row }">
                <el-popconfirm
                    confirm-button-text="确定" confirm-button-type="danger" cancel-button-text="取消"
                    icon-color="#626AEF" :title="`确定要删除${row.name}?`" @confirm="deleteRow(row)">
                    <template #reference>
                        <el-button size="small" type="danger">删除</el-button>
                    </template>
                </el-popconfirm>
                <el-button size="small" @click="showEditCity(row)">编辑</el-button>
                <el-button size="small" type="primary" v-if="row.children" @click="showAddCity(row)">增加子城市</el-button>
            </template>
        </el-table-column>
  </el-table>
  <!-- 新增一级城市 -->
  <el-dialog v-model="CityState.show" :title="`新增/编辑城市`" width="450px">
        <el-form ref="addCityRef" :model="CityState.form" label-width="90px">
            <el-form-item label="城市名称" prop="name" :rules="{ required: true, message: '请输入城市名称' }">
                <el-input v-model="CityState.form.name" placeholder="请输入城市名称" />
            </el-form-item>
            <el-form-item label="城市首字母" prop="preChar" :rules="{ required: true, message: '请输入城市首字母' }">
                <el-input v-model="CityState.form.preChar"  placeholder="请输入城市首字母" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="CityState.show = false">取消</el-button>
                <el-button type="primary" @click="addCity(addCityRef)">保存</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts">
import { FormInstance } from 'element-plus';
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { _createCity, _deleteCity, _getCity, _updateCity } from '../api/city'

export default defineComponent({
    setup() {
        // 列表数据
        const state = reactive({
            data: [],
        })

        // 新增一级城市
        const addCityRef = ref<FormInstance>();
        let CityState = reactive({ show: false, form: { _id: '', pcid: '', name: '', preChar: '' } });
        const showAddCity = (row: any) => {
            CityState.show = true;
            CityState.form = {
                _id: '',
                name: '',
                preChar: '',
                pcid: row ? row._id: ''
            }
        }
        // 编辑
        const showEditCity = (row: any) => {
            CityState.show = true;
            CityState.form = {
                _id: row._id,
                pcid: row.pcid ? row.pcid: '',
                name: row.name,
                preChar: row.preChar,
            };
        }
        const addCity = (formEl: FormInstance | undefined) => {
            if (!formEl) return
            formEl.validate((valid) => {
                if (valid) {
                    let res;
                    const { form } = CityState;
                    if (form._id) {
                        res = _updateCity(form._id, form)
                    } else {
                        res = _createCity({ name: form.name, preChar: form.preChar, pcid: form.pcid })
                    }
                    res.then(() => {
                        getCity();
                        CityState.show = false;
                    });
                } else {
                    return false
                }
            })
        }

        const getCity = () => {
            _getCity().then((res) => {
                if (res.success) {
                    state.data = res.msg;
                }
            });
        }

        const deleteRow = (row: any) => {
            _deleteCity(row._id).then(() => {
                getCity()
            })
        }

        onMounted(() => {
            getCity()
        })

        return {
            ...toRefs(state),
            getCity,
            deleteRow,
            addCityRef,
            CityState,
            showAddCity,
            addCity,
            showEditCity
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
.CityImg { margin: 20px 0; width: 50px; height: 50px; border-radius: 50%; }
</style>
