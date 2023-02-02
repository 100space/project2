
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


    previewHighlight :  '',
});

console.log('ts',typeof editor.eventEmitter.eventTypes.addImageBlobHook)



editor.eventEmitter.listen("addImageBlobHook", function(blob, callback){
    const formData = new FormData();
    console.log('123',formData)
    // console.log('4234',addImageBlobHook)
    console.log('123',blob)
    console.log('4444','data')
    console.log(formData.append(data, blob));
    formData.append("File", blob);
    console.log(formData.append({File}, blob));
    console.log(Comm)
    comm.post({
        url : "../../uploads.do",
        processData : false,
        contentType : false,
        headers : {
            "Content-Type" : "multipart/form-data",
        },
        params : formData,
    },
    function(data){
        if(data.result.status != "성공"){
            return false;
        } else{
            const url = "../../uploads.do?seq=" + data.result.fileSeq;
            return callback(url)
        }
    })
})

/* ToastEditor Area*/ 

/* Tagify Area*/ 
const input = document.querySelector('input[name=tags-outside]')
const tagify = new Tagify(input, {
  whitelist: ["Hynn", "Baek", "Gyeong"],
  maxTags : 5,
  dropdown: {
    position: "input",
    enabled : 0 
  }
})
/* Tagify Area*/ 

/* EventHandle Area */

submitBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    let tags = JSON.parse(input.value);
    let tagValues = tags.map(function(tag) {
        return tag.value
    })
    const data = {
        writer : writer.value,
        subject : subject.value,
        content : editor.getMarkdown(),
        tags: tagValues
    }
    console.log(data);
})



/* EventHandle Area */