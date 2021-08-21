song_1 = "";
song_2 = "";

song_status_1 = "";
song_status_2 = "";

score_left_wrist = "";
score_right_wrist = "";

left_wristX = "";
left_wristY = "";

right_wristX = "";
right_wristY = "";

function preload()
{
    song_1 = loadSound("Jessiah - Polaroid.mp3");
    song_2 = loadSound("ARTISTIC HALLOWING.mp3");
}

function setup()
{
    canvas = createCanvas(600,400);
    canvas.position(600,400);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded)
    poseNet.on('pose',gotPoses);
}

function modelLoaded()
{
    console.log("Model Loaded Successfully!");
}

function gotPoses(results)
{ 
      if(results.length>0)
      {
           console.log(results);
        score_left_wrist = results[0].pose.keypoints[9].score; 
        score_right_wrist = results[0].pose.keypoints[10].score;
        
        left_wristX = results[0].pose.leftWrist.x;
        left_wristY = results[0].pose.leftWrist.y;
        right_wristX = results[0].pose.rightWrist.x;
        right_wristY = results[0].pose.rightWrist.y;
      }  
      else{
          console.log("error");
      }
}

function draw()
{
    image(video,0,0,600,400);

    song_status_1 = song_1.isPlaying();
    song_status_2 = song_2.isPlaying();

    fill("green");
    stroke("black");

    if(score_left_wrist>0)
    {
        circle(left_wristX,left_wristY,20);
        song_1.stop();

        if(song_status_2 == false)
        {
            song_2.play();
            document.getElementById("song").innerHTML = "Playing - Artistic Hallowing";
        }
    }

    if(score_right_wrist>0)
    {
        circle(right_wristX,right_wristY,20);
        song_2.stop();

        if(song_status_1 == false)
        {
            song_1.play();
            document.getElementById("song").innerHTML = "Playing - Jessiah - Polaroid";
        }
    }

    function play()
    {
        song.play();
        song.setVolume(1);
        song.rate(1);
    }
    
}