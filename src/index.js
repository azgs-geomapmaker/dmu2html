var dmu2html = require('./dmu2html');

if (window.FileReader) {
    function fileDragHover(e) {
        e.stopPropagation();
        e.preventDefault();
        dropzone.style.borderColor = "#20be20";
        dropzone.style.borderStyle = "solid";
        return false;
    }

    function fileDragLeave(e) {
        e.stopPropagation();
        e.preventDefault();
        dropzone.style.borderColor = "#add8e6";
        dropzone.style.borderStyle = "dashed";
        return false;
    }

    function fileDrop(e) {
        e.stopPropagation();
        e.preventDefault();

        var files = e.target.files || e.dataTransfer.files,
            reader = new FileReader();

        reader.onload = function (e) {
            dmu2html(e.target.result, function (html) {
                dropzone.style.borderColor = "#add8e6";
                dropzone.style.borderStyle = "dashed";

                document.write(html + '<a id="download" href=""><img style="position: absolute; top: 0; right: 0; border: 0;" src="download.png" alt="Download this Document"></a>');

                var file = new Blob([html], {type: 'text/html'});
                var a = document.getElementById('download');
                a.href = window.URL.createObjectURL(file);
                a.download = 'map-units.html';
            });
        };

        reader.onerror = function (e) {
            console.log(e.target.error.code);
            dropzone.style.borderColor = "#add8e6";
            dropzone.style.borderStyle = "dashed";
        };

        reader.readAsText(files[0]);
    }

    var dropzone = document.getElementById('drop');
    dropzone.addEventListener('dragover', fileDragHover, false);
    dropzone.addEventListener('dragleave', fileDragLeave, false);
    dropzone.addEventListener('drop', fileDrop, false);
}