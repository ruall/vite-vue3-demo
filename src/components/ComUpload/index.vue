<template>
  <div>
    <el-upload
      v-if="!loading"
      :list-type="fileType === 'image' ? 'picture-card' : 'text'"
      :action="`${path}`"
      name="file"
      :class="{ isHidden: isMax }"
      :file-list="fileList"
      :headers="headers"
      :data="data"
      :disabled="disabled"
      :limit="limit"
      :on-success="onHandleImageSuccess"
      :on-preview="handlePreview"
      :on-exceed="onExceed"
      :on-change="onChange"
      :on-remove="onRemove"
      :before-upload="onImageBeforeUpload"
    >
      <i v-if="fileType === 'image'" class="el-icon-plus"></i>
      <el-button v-else>上传</el-button>
      <template #tip>
        <div v-if="!loading" class="el-upload__tip">{{ placeholderStr }}</div>
      </template>
    </el-upload>
    <div v-else-if="loading" class="w-20 h-20 loading-box flex justify-center items-center">
      <i class="el-icon-loading"></i>
      <i>上传中</i>
    </div>
    <el-dialog v-model="dialogVisible" append-to-body style="text-align: center">
      <img style="width: 100%" :src="imageUrl" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent, watch, computed } from 'vue'
import { ElMessage } from 'element-plus'
import Compressor from 'compressorjs'
import { preview, fileExt } from '@/utils'

export default defineComponent({
  name: 'ComUploader',
  props: {
    fileType: {
      type: String,
      default: 'image',
      validator: (val: any) => {
        return ['image', 'file', 'video'].includes(val)
      }
    },
    path: {
      type: String,
      default: '/common/uploadFile'
    },
    limit: {
      type: Number,
      default: 1
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fileList: {
      type: Array,
      default: () => []
    },
    width: {
      type: Number,
      default: 9999
    },
    height: {
      type: Number,
      default: 9999
    }
  },
  emits: ['file-change'],
  setup(props: any, { emit }) {
    const state = reactive({
      baseUrl: import.meta.env.VITE_API_BASEPATH,
      headers: {
        // Authorization: 'bearer ' + store.state.layout.token.ACCESS_TOKEN,
      } as any,
      data: {
        fileType: 'png'
      },
      fileList: [],
      loading: false,
      isMax: false,
      dialogVisible: false,
      imageUrl: ''
    })

    const placeholderStr = computed(() => {
      if (props.placeholder.length > 0) {
        return props.placeholder
      }
      return '只能上传 jpg/png/jpeg 文件，且不超过 2M'
    })

    watch(
      () => props.fileList,
      (val) => {
        if (val.length > 0) {
          // @ts-ignore
          state.fileList = val
        } else {
          state.fileList = []
        }

        if (val.length >= props.limit) {
          state.isMax = true
        } else {
          state.isMax = false
        }
      },
      { deep: true }
    )

    const onHandleImageSuccess = (response, file) => {
      if (response.code === 0) {
        ElMessage.success('上传成功')
        // @ts-ignore
        state.fileList.push({ url: response.data.fileUrl, name: file.name })
        state.loading = false
        emit('file-change', state.fileList)
      } else {
        ElMessage.error(response.message)
      }
    }

    const onImageBeforeUpload = (file) => {
      const ext = fileExt(file.name)
      state.data.fileType = ext
      state.loading = true
      if (props.fileType === 'image') {
        const isImage =
          file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
        const size = file.size / 1024 / 1024 < 2
        if (!isImage) {
          state.loading = false
          ElMessage.error('上传图片只能是 JPG/PNG/JPEG 格式')
          return false
        }
        if (!size) {
          state.loading = false
          ElMessage.error('上传图片大小不能超过 2MB')
          return false
        }
        const compressor = new Promise((resolve) => {
          // compressorjs 默认开启 checkOrientation 选项
          // 会将图片修正为正确方向
          new Compressor(file, {
            quality: 0.6,
            success: resolve,
            error(err) {
              state.loading = false
              ElMessage.error(err.message)
              console.log(err.message)
            }
          })
        })
        return compressor
      } else if (props.fileType === 'video') {
        const isVideo = file.type === 'video/*'
        if (!isVideo) {
          state.loading = false
          ElMessage.error('只能上传视频格式文件')
          return false
        }
        return isVideo
      } else {
        const isFile = file.type === 'application/pdf'
        if (!isFile) {
          state.loading = false
          ElMessage.error('上传附件只能是 PDF 格式')
          return false
        }
        return isFile
      }
    }

    const onChange = (file, fileList) => {
      if (file && file.status === 'success') {
        if (fileList.length >= props.limit) {
          state.isMax = true
        } else {
          state.isMax = false
        }
      }
    }

    const onRemove = (file, fileList) => {
      if (file && file.status === 'success') {
        state.fileList = fileList
      }
      if (fileList.length >= props.limit) {
        state.isMax = true
      } else {
        state.isMax = false
      }
      emit('file-change', state.fileList)
    }

    const onExceed = () => {
      ElMessage.warning(
        `最多只能上传${props.limit}张${props.fileType === 'image' ? '图片' : '附件'}~`
      )
    }

    const handlePreview = (file) => {
      if (
        fileExt(file.url) === 'jpg' ||
        fileExt(file.url) === 'png' ||
        fileExt(file.url) === 'jpeg'
      ) {
        state.imageUrl = file.url
        state.dialogVisible = true
      } else if (fileExt(file.url) === 'pdf') {
        preview(file.url)
      } else if (fileExt(file.url) === 'mp4') {
        preview(file.url)
      }
    }

    return {
      ...toRefs(state),
      onHandleImageSuccess,
      onImageBeforeUpload,
      onExceed,
      onChange,
      onRemove,
      handlePreview,
      placeholderStr
    }
  }
})
</script>

<style lang="less">
.isHidden .el-upload--picture-card {
  display: none;
}

.el-upload-list__item {
  display: block !important;
  width: 148px !important;
}
</style>
