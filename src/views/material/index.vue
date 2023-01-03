<template>
  <el-card class="box-card">
  <!-- 面包屑导航 -->
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>素材管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="material-collect">
      <el-radio-group v-model="radio" size="medium">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button size="medium" type="primary" icon="el-icon-upload">上传</el-button>
    </div>
    <el-row :gutter="10">
      <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4" v-for="item in materialList" :key="item.id">
        <el-image
          style="width: 200px; height: 200px; margin-bottom: 20px;"
          :src="item.url"
          fit="cover" />
      </el-col>
    </el-row>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000" />
    </div>
  </el-card>
</template>

<script>
import { getMaterialList } from 'https/material'

export default {
  name: 'MaterialIndex',
  data () {
    return {
      radio: false,
      materialList: []
    }
  },
  created () {
    this.loadMaterialData()
  },
  methods: {
    loadMaterialData () {
      getMaterialList({
        collect: false,
        page: 1,
        per_page: 10
      }).then(res => {
        const { data: { data: { results } }, status } = res
        if (status === 200) {
          this.materialList = results
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .material-collect {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .pagination {
    margin-top: 20px;
    width: 100%;
    text-align: center;
  }
</style>
