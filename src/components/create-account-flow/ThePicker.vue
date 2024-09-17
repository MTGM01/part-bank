<script setup>
import { onMounted, ref } from 'vue';

defineProps(['footerText'])

// select elements from DOM
const inputFile = ref(null)
const labelPicker = ref(null)
const uploadedFile = ref(null)
const more = ref(null)
const subMenu = ref(null)
const editOptions = ref(null)
const deleteOptions = ref(null)

// callback listeners
const triggerAnotherElements = (objectEvent) => {
    if (more.value) {
        if (!more.value.contains(objectEvent.target)) {
            // you can clicked outside of more element to apply this scope
            subMenu.value.style.visibility = 'hidden'
        }
        if (!more.value.contains(objectEvent.target)) {
            // you can clicked outside of more element to apply this scope
            subMenu.value.style.visibility = 'hidden'
        }
    }
}

const pickerHandler = (objectEvent) => {

    const file = objectEvent.srcElement.files[0]

    if (file) {
        let fileReader = new FileReader();

        fileReader.onload = function (fileLoadedEvent) {
            const srcData = fileLoadedEvent.target.result;
            uploadedFile.value.src = srcData;
        }

        fileReader.readAsDataURL(file);
    }

    uploadedFile.value.style.display = 'inline'
    labelPicker.value.style.display = 'none'
    more.value.style.display = 'inline'
}
const openSubMenu = () => {
    subMenu.value.style.visibility = 'visible'
}

const editUpload = () => {
    labelPicker.value.click()
}

const deleteUpload = () => {
    uploadedFile.value.style.display = 'none'
    uploadedFile.value.src = ''
    inputFile.value.style.display = 'inline'
    labelPicker.value.style.display = 'flex'
    more.value.style.display = 'none'
}

// set events
onMounted(() => {
    document.addEventListener('click', triggerAnotherElements)
})
</script>

<template>
    <div class="card-wrapper">
        <img ref="uploadedFile" class="card-wrapper__uploaded-file" src="" alt="uploaded-file" />
        <label ref="labelPicker" class="card-wrapper__picker-container">
            <img src="/src/assets/icons/upload-cloud.svg" class="card-wrapper__upload-cloud" alt="upload-cloud" />
            <p class="card-wrapper__drag-drop-text">
                تصویر را بکشید و اینجا رها کنید
                <br />
                یا <span class="card-wrapper__click-text">کلیک کنید</span>.
            </p>
            <input ref="inputFile" @change="pickerHandler" type="file" name="national-card" id="file-reader"
                class="card-wrapper__input-picker" />
        </label>
        <div class="card-wrapper__footer-wrapper">
            <span class="card-wrapper__footer-text">
                {{ footerText }}
            </span>
            <img ref="more" @click="openSubMenu" src="/src/assets/icons/more.svg" alt="more"
                class="card-wrapper__more" />
            <div ref="subMenu" class="card-wrapper__sub-menu">
                <div ref="editOptions" @click="editUpload" class="card-wrapper__menu-option_edit">
                    <img src="/src/assets/icons/edit.svg" alt="edit" />
                    <span class="card-wrapper__option-text">ویرایش</span>
                </div>
                <div class="card-wrapper__sub-line"></div>
                <div ref="deleteOptions" @click="deleteUpload" class="card-wrapper__menu-option_delete">
                    <img src="/src/assets/icons/delete.svg" alt="delete" />
                    <span class="card-wrapper__option-text">حذف</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card-wrapper {
    &__uploaded-file {
        display: none;
        width: 20rem;
        height: 11.25rem;
    }

    &__picker-container {
        @include flexBox($dir: column,
            $align: center,
            $justify: center,
            $gap: 0.5rem);
        width: 100%;
        height: 11.25rem;
        border-radius: 0.75rem 0.75rem 0rem 0rem;
        border: 1px dashed var(--Line, #e2edff);
        background: var(--Surface-Lightblue, #f9fafb);
        cursor: pointer;
    }

    &__drag-drop-text {
        @include font($size: 0.875rem, $weight: 600);
        text-align: center;
        color: var(--Text-Gray, #8999b9);
    }

    &__click-text {
        @include font($size: 0.875rem, $weight: 600);
        color: var(--Primary-Primary-500, #4152a0);
    }

    &__input-picker {
        opacity: 0;
        width: 0;
        height: 0;
    }

    &__footer-wrapper {
        @include flexBox($dir: row, $align: center, $justify: space-between);
        @include position($pos: relative);
        padding: 1rem 0.75rem;
        border-radius: 0rem 0rem 0.75rem 0.75rem;
        background: var(--Surface-Lightblue, #f9fafb);
        width: 100%;
    }

    &__footer-text {
        @include font($size: 0.875rem, $weight: 400);
        color: var(--Black-black-500, #3c4351);
        text-align: right;
    }

    &__more {
        cursor: pointer;
        display: none;
    }

    &__sub-menu {
        visibility: hidden;
        @include flexBox($dir: column, $align: flex-start, $gap: 0.5rem);
        @include position($pos: absolute, $bottom: 0.75rem, $left: 1rem);
        padding: 0.5rem 0.75rem;
        border-radius: 0.5rem;
        background: var(--Surface, #fff);
        box-shadow: 0px 0px 4px 0px rgba(0, 67, 101, 0.05);
    }

    &__menu-option_edit,
    &__menu-option_delete {
        @include flexBox($dir: row, $align: center, $gap: 0.5rem);
        cursor: pointer;
    }

    &__option-text {
        @include font($size: 0.875rem, $weight: 400);
        color: var(--Text-Title, #3c4351);
        text-align: right;
    }

    &__sub-line {
        width: 100%;
        height: 0.0625rem;
        background: #e2edff;
    }
}
</style>