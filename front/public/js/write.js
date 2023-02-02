
/* Const Class & ID */
const writer = document.getElementById('writer');
const subject = document.getElementById('subject');
const content = document.getElementById('content');
const submitBtn = document.getElementById('SubmitBtn');
const cancelBtn = document.getElementById('CancelBtn');
/* Const Class & ID */

/* ToastEditor Area*/
const Editor = toastui.Editor;
const editor = new Editor({
    el: document.querySelector('#content'),
    height: '500px',
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    previewHighlight: '',
});

console.log('ts', typeof editor.eventEmitter.eventTypes.addImageBlobHook)

function addDefaultImageBlobHook(eventEmitter) {
    eventEmitter.listen("addImageBlobHook", function (blob, callback) {
        const formData = new FormData();
        formData.append("file", blob);
        comm.post({
            url: "../../uploads.do",
            processData: false,
            contentType: false,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            params: formData,
        },
            function (data) {
                if (data.result.status != "성공") {
                    return false;
                } else {
                    const url = "../../uploads.do?seq=" + data.result.fileSeq;
                    return callback(url)
                }
            })
    })
}

/* ToastEditor Area*/

/* Tagify Area*/
const input = document.querySelector('input[name=tags-outside]')
const tagify = new Tagify(input, {
    whitelist: ["Hynn", "Baek", "Gyeong"],
    maxTags: 5,
    dropdown: {
        position: "input",
        enabled: 0
    }
})
/* Tagify Area*/

/* EventHandle Area */

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let tags = JSON.parse(input.value);
    let tagValues = tags.map(function (tag) {
        return tag.value
    })
    const data = {
        writer: writer.value,
        subject: subject.value,
        content: editor.getHTML(),
        tags: tagValues
    }
    console.log(data);
})
// {writer: '123', subject: '123', content: '123', tags: '[{"value":"123"},{"value":"234"}]'}
// content
// : 
// "123"
// subject
// : 
// "123"
// tags
// : 
// "[{\"value\":\"123\"},{\"value\":\"234\"}]"
// writer
// : 
// "123"

/* EventHandle Area */