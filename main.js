song1="ON.mp3";
song2="Zero-O'clock.mp3";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;


function modelLoaded(){
    console.log("PoseNet model is ready");

}

function gotPoses(results){
    if(results.lenght>0){
        console.log(results);
        scoreLeftWrist= results[0].pose.keypoints[9].score;

        leftWristX= results[0].leftWrist.x;
        leftWristY= results[0].leftWrist.y;

        rightWristX= results[0].rightWrist.x;
        rightWristY= results[0].rightWrist.y;

    }
}

function setup(){
    canvas= createCanvas(600,500);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

} 

function preload(){
    song= loadSound("");
poseNet= ml5.poseNet(video, modelLoaded);
poseNet.on(pose, gotPoses);

}

function modelLoaded(){
    console.log("POSENET MODEL IS INITIALIZED");
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill('#FF0000');
    stroke('FF0000');

    if(scoreLeftWrist>0.2){

    circle(leftWristX,leftWristY,20);
    InNumberleftWristY= Number(leftWristY);
    remove_decimals= floor(InNumberleftWristY);
    volume= remove_decimals/500;

    document.getElementById("volume").innerHTML= "Volume"+ volume;
    song.setVolume(volume);
    }


}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

