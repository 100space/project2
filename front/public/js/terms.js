// const termsCheckbox = document.getElementById("termsCheckbox");
// const iFrameContainer = document.getElementById("iFrameContainer");
// const agreeButton = document.getElementById("agreeButton");

// termsCheckbox.addEventListener("click", function () {
//     initLayerPosition()
//     if (!termsCheckbox.checked) {
//       iFrameContainer.style.display = "block";
//     }
//   });

// window.addEventListener("message", function (event) {
//     if (event.data === "terms-agreed") {
//       termsCheckbox.checked = true;
//       iFrameContainer.style.display = "none";
//     }
//   });

// agreeButton.addEventListener("click", function () {
//     window.parent.postMessage("terms-agreed", "*");
//   });


// const initLayerPosition = () =>{
//     const width = 500;
//     const height = 600;
//     const borderWidth = 1;

//     element_layer.style.width = width + 'px';
//     element_layer.style.height = height + 'px';
//     element_layer.style.border = borderWidth + 'px solid';
//     element_layer.style.left = (((window.innerWidth || document.documentElement.clientWidth) - width)/1.5 - borderWidth) + 'px';
//     element_layer.style.top = (((window.innerHeight || document.documentElement.clientHeight) - height)/2 - borderWidth) + 'px';
// }