array_1 = ['pen', 'paper', 'book', 'ambulance', 'bus']
random_no = Math.floor((Math.random()*array_1.length) + 1);
element = array_1[random_no];
document.getElementById("sketch_to_draw").innerHTML = "Sketch to be drawn: " + element;

function setup()
{
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function preload()
{
    classifier = ml5.imageClassifier('DoodleNet');
}

function clearCanvas()
{
    background("white");
}

function draw()
{
    strokeWeight(13);
    stroke(0);
    if (mouseIsPressed)
    {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas()
{
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results)
{
    if (error)
    {
        console.error(error);
    }
    console.log(results);

    document.getElementById("your_sketch").innerHTML = 'Your Sketch: ' + results[0].label;
    document.getElementById("confidence").innerHTML = 'Confidence: ' + Math.round(results[0].confidence * 100) + "%";

    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}