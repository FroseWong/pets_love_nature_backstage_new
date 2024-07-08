<template>
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" />
</template>
    
    <script setup>
    import { ref ,watch ,defineEmits , defineProps } from 'vue'
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
    
    const props = defineProps({
        modelValue: {
            type: String,
            required: true
        }
     })
     const emit = defineEmits(['update:modelValue'])


    const editor = ClassicEditor
    // const editorData = ref('<p>Initial editor content</p>')
    const editorConfig = {
        placeholder: 'type the content here',
        // plugins: [
        //     FontSize, FontFamily, FontColor, FontBackgroundColor,
        //     Bold, Italic, Underline, Strikethrough,
        //     Link, Paragraph, Essentials
        // ],
        toolbar: {
            items: [
            'heading',
            'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
            'bold', 'italic', 'underline', 'strikethrough', '|',
            'numberedList', 'bulletedList', '|',
            'link' ,  '|',
            'undo', 'redo', '|'
            ],
            shouldNotGroupWhenFull: true // RWD 自動換行
        },
        
    }

    const editorData = ref(props.modelValue)

    watch(() => props.modelValue, (newValue) => {
        editorData.value = newValue
    })

    watch(editorData, (newValue) => {
    emit('update:modelValue', newValue)
    })

    </script>