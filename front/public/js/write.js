const writer = document.getElementById("writer")
const subject = document.getElementById("subject")
const submitBtn = document.getElementById("SubmitBtn")
const cancelBtn = document.getElementById("CancelBtn")
const editor = document.querySelector("#editor")

const categoryMain = document.querySelector(".categoryMain")
const input = document.querySelector(".tagify--outside")
const request = axios.create({
    baseURL: "http://127.0.0.1:3000",
    withCredentials: true,
})

const tagify = new Tagify(input, {
    whitelist: ["Hynn", "Baek", "Gyeong"],
    maxTags: 10,
    dropdown: {
        position: "input",
        enabled: 0,
    },
})


CKEDITOR.ClassicEditor.create(document.getElementById("editor"), {
    toolbar: {
        items: [
            "heading",
            "|",
            "bold",
            "italic",
            "strikethrough",
            "underline",
            "|",
            "bulletedList",
            "numberedList",
            "todoList",
            "|",
            "outdent",
            "indent",
            "|",
            "undo",
            "redo",
            "-",
            "fontSize",
            "fontFamily",
            "fontColor",
            "fontBackgroundColor",
            "highlight",
            "|",
            "alignment",
            "|",
            "link",
            "imageInsert",
            "blockQuote",
            "insertTable",
            "mediaEmbed",
            "codeBlock",
            "htmlEmbed",
            "|",
            "specialCharacters",
            "horizontalLine",
            "pageBreak",
            "|",
            "textPartLanguage",
            "|",
            "sourceEditing",
        ],
        shouldNotGroupWhenFull: true,
    },
    list: {
        properties: {
            styles: true,
            startIndex: true,
            reversed: true,
        },
    },
    heading: {
        options: [
            { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
            { model: "heading1", view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
            { model: "heading2", view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
            { model: "heading3", view: "h3", title: "Heading 3", class: "ck-heading_heading3" },
            { model: "heading4", view: "h4", title: "Heading 4", class: "ck-heading_heading4" },
            { model: "heading5", view: "h5", title: "Heading 5", class: "ck-heading_heading5" },
            { model: "heading6", view: "h6", title: "Heading 6", class: "ck-heading_heading6" },
        ],
    },
    placeholder: "글을 작성할 수 있습니다.",
    fontFamily: {
        options: [
            "default",
            "Arial, Helvetica, sans-serif",
            "Courier New, Courier, monospace",
            "Georgia, serif",
            "Lucida Sans Unicode, Lucida Grande, sans-serif",
            "Tahoma, Geneva, sans-serif",
            "Times New Roman, Times, serif",
            "Trebuchet MS, Helvetica, sans-serif",
            "Verdana, Geneva, sans-serif",
        ],
        supportAllValues: true,
    },
    fontSize: {
        options: [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, "default"],

        supportAllValues: true,
    },
    htmlSupport: {
        allow: [
            {
                name: /.*/,
                attributes: true,
                classes: true,
                styles: true,
            },
        ],
    },
    htmlEmbed: {
        showPreviews: true,
    },
    link: {
        decorators: {
            addTargetToExternalLinks: true,
            defaultProtocol: "http://",
            toggleDownloadable: {
                mode: "manual",
                label: "Downloadable",
                attributes: {
                    download: "file",
                },
            },
        },
    },
    removePlugins: [
        "CKBox",
        "CKFinder",
        "EasyImage",
        "RealTimeCollaborativeComments",
        "RealTimeCollaborativeTrackChanges",
        "RealTimeCollaborativeRevisionHistory",
        "PresenceList",
        "Comments",
        "TrackChanges",
        "TrackChangesData",
        "RevisionHistory",
        "Pagination",
        "WProofreader",
        "MathType",
    ],
})
    .then((editor) => {
        cancelBtn.addEventListener("click", () => {
            const _pathname = location.pathname.replace("/write", "").replace("/modify", "")
            // console.log(_pathname)
            location.href = `${_pathname}?page=1`
            // location.href = document.referer
        })
        
        if (location.pathname.indexOf("modify") >= 0) {
            console.log('test')
            // console.log('edit', editor)
            console.log('edit2', editor,data)
            console.log('edit3', editor,data.processor)
            console.log('edit4', editor,data.htmlFilter)
            editor.data.processor.htmlFilter.addRules({
                elements: {
                    $: function (element) {
                        // Output dimensions of images as width and height
                        if (element.name === "img") {
                            const width = element.attributes.width
                            const height = element.attributes.height
        
                            if (width) {
                                element.attributes.width = width
                            }
        
                            if (height) {
                                element.attributes.height = height
                            }
                        }
        
                        return element
                    },
                },
            })
        
            editor.data.processor.htmlFilter.addRules({
                elements: {
                    a: function (element) {
                        element.attributes.target = "_blank"
                        return element
                    },
                },
            })
        
            editor.data.processor.htmlFilter.addRules({
                elements: {
                    i: function (element) {
                        if (element.attributes.class === "emoji") {
                            element.name = "img"
                            element.attributes.src = element.attributes.alt
                        }
        
                        return element
                    },
                },
            })
        
            editor.data.set(data)
        }
        
    })
    .catch((error) => {
        // console.error(error)
    })

