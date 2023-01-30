const editor = new toastui.Editor({
    el: document.querySelector("#editor"),
    previewStyle: "vertical",
    height: "400px",
    initialValue: "Initialize your text",
})

const markdownContent = editor.getMarkdown()
