function getArray(number) {
    var array = new Array();

    for (var i =0; i <= number; i++) {
        array.push(i);
    }

    return array;
}

function fillLine(widthBody, name, data, color) {
    var width = widthBody,
        height = 200;

    var svg = d3.select("section").append("svg");
    
    var line = d3.svg.line()
        .x(function(data){return data.x;})
        .y(function(data){return data.y;})
        .interpolate("basis");

    svg.attr("height", height)
        .attr("width", width); 
            
    svg.append("path").style("stroke", color).attr("d", line(data));
    console.log(data);
}


    
$(document).ready(function() {
    var getData = [
        {x: 7, y: 4, e: 11}
    ];
    var lineBody = $('#linebody');
    var numberArr = getArray(20);

    var number1 = $('#number0');
    var number2 = $('#number1');

    number1.html(getData[0].x);
    number2.html(getData[0].y);
    
    var numberSection = $('.number-section');
    
    var drop = lineBody.width()/20;
    var isRight = true;
    for (var i = 0; i <= getData.length; i++){
            var numHtml = $('#number'+i).html();
            drowSegments(i, drop, numHtml);
            var segHtml = $('#segment'+ i).width();
            console.log(segHtml)
            var data = [
                {x: 0, y: 200},
                {x: drop*parseFloat(numHtml)/2, y: 200 - drop*parseFloat(numHtml)/2},
                {x: drop*parseFloat(numHtml), y: 200}
            ];
            var color;
            if ($('section').find('svg').length < 1) {
                color = "#ff0000"; 
            } else {
                // color = "#fff";
            }
            fillLine(segHtml, 'segment'+i, data, color);
            inpBuild(drop*parseFloat(numHtml)/2, 200 - drop*parseFloat(numHtml)/2, i);
    }
    function drowSegments(number, drop, dataNumber) {
        var segmentBody = '<div class="segment" id="segment'+ number +'" style="width:'+parseInt(dataNumber)*drop+'px;"></div>';
        lineBody.append(segmentBody);
    }
    function inpBuild(x, y, i) {
        var findInput = $('section').find('input') ? $('section').find('input').css('left') : '0';
        if (findInput === undefined)
            findInput = 0;
        if (y > 100)
            y -= 15;
        var inputBody = "<input type='text' class='number-field input"+ i + "' id='"+ i +"input' style='left:"+ ( x + (parseFloat(findInput)*2) ) +"px; top: "+ y +"px;'/>";
        $('section').append(inputBody);
    }

    $("input").last().hide();
    $("svg").last().hide();

    $("input").bind("change paste keyup", function() {
        var thisEl = $(this);
        var thisId = $(this).attr("id");
        var rightEl = $('body').find("#number" + parseFloat(thisId));
        var isRight;
        if ($(this).attr("id") === "input-answer") {
            if(parseFloat(thisEl.val()) === getData[0].e) {
                setTimeout( function(){
                    $("#input-answer").css("border", "2px solid rgba(0,0,0,0)").attr("disabled", "");
                }, 50);
            }
        }
        if (parseFloat(thisEl.val()) === parseFloat(rightEl.html()) && $(this) != $("#answer input")) {
            isRight = true;
            $(this).css("border", "2px solid rgba(0,0,0,0)").attr("disabled", "");
            $(rightEl).removeClass("warning");
            if (isRight) {
                $("input").last().show();
                $("svg").last().show();

                $("input").each(function() {
                    if( $("input").length > 1 && $("input").last().prop("disabled")) {
                        // $("#answer").html(getData[0].e);
                        $("#answer input").attr("disabled", false).val("");
                    }
                });
            }
        } else {
            $(this).css("border", "2px solid red");
            $(rightEl).addClass("warning");
            isRight = false;
        }
    });
    
});
