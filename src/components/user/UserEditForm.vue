<template>
  <div class="user-edit-form">
    <div class="inputbox">
      <div class="control">
        <AppLabel for="username" class="label" text="ユーザーネーム" />
        <AppInput
          id="username"
          v-model="formData.name"
          type="text"
          placeholder="ユーザーネーム"
        />
      </div>
      <div class="control -img">
        <AppLabel class="label" text="プロフィール画像" />
        <PreviewImgInput @change="onFileInput" />
      </div>
      <div class="control">
        <AppLabel for="jobtype" class="label" text="職種" />
        <AppSelectbox
          id="jobtype"
          v-model="formData.type"
          :options="jobTypeOptions"
        />
      </div>
      <div class="control -tag">
        <AppLabel class="label" text="タグ" />
        <TagSelectInput
          :data-list="statusOptions"
          :selected-items="formData.statusTags"
          placeholder="タグを検索"
          @change="onChangeStatusTag"
        />
      </div>
      <div class="control">
        <AppLabel for="copy" class="label" text="一言" />
        <AppInput
          id="copy"
          v-model="formData.copy"
          type="text"
          placeholder="一言コメント"
        />
      </div>
      <div class="control">
        <AppLabel for="comment" class="label" text="コメント" />
        <AppTextarea
          id="comment"
          v-model="formData.comment"
          rows="12"
          type="text"
          placeholder="近況報告や今後やりたいことなど、自由に書きましょう。"
        />
      </div>
      <div class="control">
        <AppLabel for="url1" class="label" text="URL(1)" />
        <AppInput
          id="url1"
          v-model="formData.url1"
          type="text"
          placeholder="URL"
        />
      </div>
      <div class="control">
        <AppLabel for="url2" class="label" text="URL(2)" />
        <AppInput
          id="url2"
          v-model="formData.url2"
          type="text"
          placeholder="URL"
        />
      </div>
    </div>
    <div class="btnbox">
      <AppBtn class="-primary -big -full" @click="submit">編集する</AppBtn>
    </div>
  </div>
</template>

<script>
import PreviewImgInput from '~/components/PreviewImgInput'
import TagSelectInput from '~/components/TagSelectInput'
import { JobType, StatusTags } from '~/lib/definitions/userdata'

export default {
  components: {
    PreviewImgInput,
    TagSelectInput,
  },
  data() {
    return {
      formData: {
        name: '',
        type: '',
        statusTags: [],
        copy: '',
        comment: '',
        url1: '',
        url2: '',
        newFile: null,
      },
    }
  },
  computed: {
    jobTypeOptions: () =>
      JobType.map((type) => ({
        label: type,
        value: type,
      })),
    statusOptions: () => StatusTags,
  },
  methods: {
    onFileInput(newFile) {
      this.formData.newFile = newFile
    },
    onChangeStatusTag({ type, targetItem }) {
      if (type === 'select') {
        this.formData.statusTags.push(targetItem)
      } else {
        const targetIndex = this.formData.statusTags.findIndex(
          (item) => item === targetItem
        )
        this.formData.statusTags.splice(targetIndex, 1)
      }
    },
    submit() {
      this.$emit('onSubmit', this.formData)
    },
  },
}
</script>

<style lang="scss" scoped>
.user-edit-form {
  padding: 40px 60px;
  background-color: $color-white;
  border-radius: 10px;
}

.user-edit-form > .inputbox {
  margin-bottom: 42px;
}

.user-edit-form > .inputbox > .control {
  &:not(:last-child) {
    margin-bottom: 32px;
  }
}

.user-edit-form > .inputbox > .control > .label {
  margin-bottom: 8px;
}

.user-edit-form > .btnbox {
  width: 60%;
}
</style>
