<template>
  <div class="publish-library">
    <el-radio-group class="radio-group" v-model="radio" size="mini" @input="handleRadioChange">
      <el-radio-button :label="false">全部</el-radio-button>
      <el-radio-button :label="true">收藏</el-radio-button>
    </el-radio-group>
    <div class="publish-grid-wrap">
      <div class="grid-item" v-for="item in materialList" :key="item.id">
        <el-image
          style="width: 180px; height: 180px"
          :src="item.url"
          fit="cover" />
      </div>
    </div>
    <el-pagination
      class="pagination"
      background
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="totalCount"
      @current-change="handleCurrentChange" />
  </div>
</template>

<script>
import { getMaterialList } from 'https/material'

export default {
  name: 'PublishLibrary',
  data () {
    return {
      materialList: [],
      radio: false,
      pageSize: 8,
      totalCount: 0,
      currentPage: 1
    }
  },
  created () {
    this.loadMaterialData()
  },
  methods: {
    loadMaterialData (page = 1) {
      this.currentPage = page
      getMaterialList({
        page,
        per_page: this.pageSize,
        collect: this.radio
      }).then(res => {
        console.log('res===', res)
        const { data: { data: { results, total_count: total } }, status } = res
        if (status === 200) {
          this.materialList = results
          this.totalCount = total
        }
      })
    },
    handleRadioChange () {
      this.loadMaterialData(1)
    },
    handleCurrentChange (page) {
      this.loadMaterialData(page)
    }
  }
}
</script>

<style lang="less" scoped>
  .radio-group {
    margin: 10px 0;
  }
  .publish-grid-wrap {
    display: flex;
    flex-wrap: wrap;
    .grid-item {
      width: 200px;
      height: 200px;
      margin-bottom: 10px;
    }
  }
</style>
