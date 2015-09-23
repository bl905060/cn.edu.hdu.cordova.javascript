var getMedia = new Object ({

    //use mode to select camera source to take photo
    takePhoto : function (mode, showImgDivId, showImgId) {
        var cameraSource;
        
        if (mode == 1) {
            cameraSource = Camera.PictureSourceType.CAMERA;
        }
        else if (mode == 2){
            cameraSource = Camera.PictureSourceType.PHOTOLIBRARY;
        }
        
        //alert("takePhoto");
        navigator.camera.getPicture(onCameraSuccess, onCameraError, {
                                    quality: 100,
                                    sourceType: cameraSource,
                                    destinationType: Camera.DestinationType.FILE_URI,
                                    targetWidth: 480,
                                    targetHeight: 800
                                    });
        
        //Callback function when the photo has been caputred
        function onCameraSuccess(imageURL) {
            
            console.log(imageURL);
            var photoid = new Date.getTime();
            var newFileName = photoid + ".jpg";
            var dirName = "image";
            
            window.resolveLocalFileSystemURL(imageURL, resolveOnSuccess, resOnError);
            
            //Callback function when the file system url has been resolved
            function resolveOnSuccess(fileEntry){
                console.log("resolve is success!");
                
                //request for file system
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, getFileSystemSuccess,resOnError);
                
                function getFileSystemSuccess(fileSys) {
                    console.log("get file system is success!");
                    //The folder is created if doesn't exist
                    fileSys.root.getDirectory(dirName, {create:true, exclusive: false}, getDirSuccess, getDirFail);
                    
                    function getDirSuccess(directory) {
                        console.log("get dir is success!");
                        fileEntry.moveTo(directory, newFileName,  successMove, resOnError);
                    }
                    
                    function getDirFail(){
                        console.log("get dir is failed!");
                    }
                }
            }
            
            //Callback function when the file has been moved successfully - inserting the complete path
            function successMove(fileEntry) {
                console.log("move file is success!");
                //I do my insert with "fileEntry.fullPath" as for the path
                //Get a handle to the image container div
                ic = document.getElementById(showImgDivId);
                //Then write an image tag out to the div using the
                //URL we received from the camera application.
                ic.innerHTML = '<img id="' + showImgId + '" src="' + fileEntry.toURL() + '" width=100% title="' + fileEntry.name + '" />';
                console.log(document.getElementById(showImgId).src);
                console.log(document.getElementById(showImgId).title);
                console.log(showImgId);
            }
            
            function resOnError(error) {
                alert(error.code);
            }
        }
        
        function onCameraError() {
            navigator.notification.alert("onCameraError");
        }
    },
                           
    /*var recorder = null,
    var mediaRecFile = null,
    var progressTimmer = null,
    var recTime = 0,

    startRecording : function () {
        console.log("***test: startRecording***");

        var d = new Date();
        var n = d.getTime();

        var mediaFileFullName = null;
        var mediaFileURL = null;

        mediaRecFile = n + ".wav";

        console.log("***test: file name is " + mediaRecFile);

        //enableMic(1);
        //document.getElementById('stopRecID').removeAttribute("style");
        // change buttons state
        //setButtonState(myMediaState.recording);

        //first create the file
        //checkFileOnly = false;
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, getAudioFileSystemSuccess, getAudioFileSystemError);

        function getAudioFileSystemSuccess(fileSys) {
            console.log("***test: fileSystem.root.name: " + fileSys.root.name);

            fileSys.root.getDirectory("audio", {create:true, exclusive: false}, getDirSuccess, null);
        }

        function getDirSuccess(directory) {
            directory.getFile(mediaRecFile, { create: true, exclusive: false }, getFileSuccess, null);
        }

        function getFileSuccess(fileEntry) {
            console.log("***test: File " + mediaRecFile + " at " + fileEntry.fullPath);

            // save the File URL
            mediaFileURL = fileEntry.toURL();
            // save the full file name
            mediaFileFullName = "documents://audio/" + mediaRecFile;

            console.log(mediaFileFullName);
            console.log("***test: new Media() for ios***");

            mediaRecFile = mediaFileFullName;
            // create media object using full media file name
            recorder = new Media(mediaFileFullName, onMediaCallSuccess, onMediaCallError);
            recordNow();
        }

        function recordNow() {
            if (recorder) {
                recorder.startRecord();
                //document.getElementById('RecStatusID').innerHTML = "Status: recording";
                console.log("***test: recording started: in startRecording()***");
            }
            else
                console.log("***test: recorder == null: in startRecording()***");

            // reset the recTime every time when recording
            recTime = 0;

            // Stop recording after 10 sec
            progressTimmer = setInterval(function() {
                            recTime = recTime + 1;
                            setAudioPosition('media_rec_pos', recTime + " sec");
                            console.log("***test: interval-func()***");
                            }, 1000);

        }
    },

    stopRecording : function () {
        //enableMic(0);
        //document.getElementById('stopRecID').style.display="none";
        // enable "record" button but disable "stop"
        //setButtonState(myMediaState.finishRec);

        if (recorder) recorder.stopRecord();

        clearProgressTimmer();

        //document.getElementById('RecStatusID').innerHTML = "Status: stopped record";

        console.log("***test: recording stopped***");
    },

    clearProgressTimmer : function () {
        if (progressTimmer) {
            clearInterval(progressTimmer);
            progressTimmer = null;
        }
    }

    setAudioPosition : function (audioPosID, position) {
    if(audioPosID == "media_rec_pos"){
    document.getElementById(audioPosID).innerHTML = "Recording position: 00:00:"+position;
    }
    if(audioPosID == "media_pos"){
    document.getElementById(audioPosID).innerHTML = "Playback position: 00:00:"+position;
    }
    }

    onMediaCallSuccess : function () {
    console.log("***test: new Media() succeeded ***");
    }

    onMediaCallError : function () {
    console.log("***test: new Media() failed ***");
    }

    getAudioFileSystemError : function () {
    console.log("***test: failed in creating media file in requestFileSystem");
    }*/
});