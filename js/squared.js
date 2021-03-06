var lastOMoveCol = 0;
var lastOMoveRow = 0;
var windowHeight = $(window).outerHeight();
var headerHeight = $('header').outerHeight();
var gridHeight = $('#grid').outerHeight();
if( windowHeight > (gridHeight + headerHeight) )
{
	var marginTop = (((windowHeight-headerHeight) - gridHeight)/2);
	$('#grid').css('margin-top',marginTop + 'px');
}
else
{
	$('#grid').css('margin-top', '0px');
	$('#info').css('position','relative');
	$('#moreModalLink').css('position','relative');
}

$('.dot').click(function(){
	if( $('#currentPlayer').val() == 'player' )
	{
		if( $('#' + this.id).attr('clicked') == 'false' )
		{
			playerMove(this);
		}
	}
});

function checkAdjacent(dotid)
{
	var dot = $('#' + dotid);
	
	var north = $("#dot" + dot.attr('col') + (dot.attr('row') - 1));
	var south = $("#dot" + dot.attr('col') + (dot.attr('row')*1 + 1));
	var east = $("#dot" + (dot.attr('col')*1 + 1) + dot.attr('row'));
	var west = $("#dot" + (dot.attr('col') - 1) + dot.attr('row'));

	if( north.attr('clicked') == 'true' )
	{
		connect(dot.attr('id'),north.attr('id'));
	}
	if( south.attr('clicked') == 'true' )
	{
		connect(south.attr('id'),dot.attr('id'));
	}
	if( east.attr('clicked') == 'true' )
	{
		connect(dot.attr('id'),east.attr('id'));
	}
	if( west.attr('clicked') == 'true' )
	{
		connect(west.attr('id'),dot.attr('id'));
	}

	checkForScore(dot);
	
}

function connect(id1,id2)
{
	var offset1 = $('#'+id1).offset();
	var offset2 = $('#'+id2).offset();
	drawline(offset1,offset2);
}

function checkForScore(dot)
{
	//Only necessary if we haven't already checked this dot
	if( dot.attr('clicked') == 'false' )
	{
		var x = dot.attr('col')*1;
		var y = dot.attr('row')*1;
		var scoreCount = 0;
		var north = $('#dot' + x + (y-1) ).attr('clicked');
		var northeast = $('#dot' + (x+1) + (y-1) ).attr('clicked');
		var east = $('#dot' + (x+1) + y ).attr('clicked');
		var southeast = $('#dot' + (x+1) + (y+1) ).attr('clicked');
		var south = $('#dot' + x + (y+1) ).attr('clicked');
		var southwest = $('#dot' + (x-1) + (y+1) ).attr('clicked');
		var west = $('#dot' + (x-1) + y ).attr('clicked');
		var northwest = $('#dot' + (x-1) + (y-1) ).attr('clicked');

		//Check SW square
		if( west == 'true' )
		{
			if( southwest == 'true' )
			{
				if( south == 'true' )
				{
					scoreCount++;
				}
			}
		}

		//Check NW square
		if( west == 'true' )
		{
			if( northwest == 'true' )
			{
				if( north == 'true' )
				{
					scoreCount++;
				}
			}
		}

		//Check NE square
		if( north == 'true' )
		{
			if( northeast == 'true' )
			{
				if( east == 'true' )
				{
					scoreCount++;
				}
			}
		}

		//Check SE square
		if( east == 'true' )
		{
			if( southeast == 'true' )
			{
				if( south == 'true' )
				{
					scoreCount++;
				}
			}
		}

		if( $('#currentPlayer').val() == 'player' )
		{
			$('#playerScore').val( $('#playerScore').val()*1 + scoreCount );
		}
		else
		{
			$('#opponentScore').val( $('#opponentScore').val()*1 + scoreCount );
		}
	}
}

function calcScore(dot)
{
	if( dot.attr('clicked') == 'false' )
	{
		var x = dot.attr('col')*1;
		var y = dot.attr('row')*1;
		var scoreCount = 0;
		var north = $('#dot' + x + (y-1) ).attr('clicked');
		var northeast = $('#dot' + (x+1) + (y-1) ).attr('clicked');
		var east = $('#dot' + (x+1) + y ).attr('clicked');
		var southeast = $('#dot' + (x+1) + (y+1) ).attr('clicked');
		var south = $('#dot' + x + (y+1) ).attr('clicked');
		var southwest = $('#dot' + (x-1) + (y+1) ).attr('clicked');
		var west = $('#dot' + (x-1) + y ).attr('clicked');
		var northwest = $('#dot' + (x-1) + (y-1) ).attr('clicked');

		//Check SW square
		if( west == 'true' )
		{
			if( southwest == 'true' )
			{
				if( south == 'true' )
				{
					scoreCount++;
				}
			}
		}

		//Check NW square
		if( west == 'true' )
		{
			if( northwest == 'true' )
			{
				if( north == 'true' )
				{
					scoreCount++;
				}
			}
		}

		//Check NE square
		if( north == 'true' )
		{
			if( northeast == 'true' )
			{
				if( east == 'true' )
				{
					scoreCount++;
				}
			}
		}

		//Check SE square
		if( east == 'true' )
		{
			if( southeast == 'true' )
			{
				if( south == 'true' )
				{
					scoreCount++;
				}
			}
		}

		return scoreCount;
	}
}

function chooseOnHighestScore()
{
	var col,row,max=0,bestChoice=null;
	for( row=1; row<=size; row++ )
	{
		for( col=1; col<=size; col++ )
		{
			if( $('#dot' + col + row).attr('clicked') == 'false' )
			{
				var score = calcScore( $('#dot' + col + row) );
				if( score > max )
				{
					max = score;
					bestChoice = '#dot' + col + row;
				}
			}
		}
	}

	return $(bestChoice);
}

function drawline(of1,of2)
{
	var top,left,height,width;
	if( of1.left == of2.left )
	{
		top = of2.top + 7.5;
		left = of2.left + 6;
		height = of1.top - of2.top;
		width = 5;
	}
	else
	{
		top = of2.top + 6;
		left = of1.left + 7.5;
		height = 5;
		width = of2.left - of1.left;
	}

	var htmlLine = '<div id="line"></div>';
	$( "body" ).prepend( htmlLine );
	htmlLine = $('#line');
	htmlLine.css('position','absolute');
	htmlLine.css('top',top + 'px');
	htmlLine.css('left',left + 'px');
	htmlLine.css('min-height',height + 'px');
	htmlLine.css('min-width',width + 'px');
	htmlLine.css('border-radius','5px');

	if( $('#currentPlayer').val() == 'player' ) htmlLine.css('background-color', playerColor);
	else htmlLine.css('background-color', opponentColor);
}

function playerMove(dot)
{
	playersound.playclip();
	$(dot).addClass('player-clicked');
	checkAdjacent(dot.id);
	$(dot).attr('clicked','true');
	
	if( $('#currentPlayer').val() == 'player' )
	{
		$('#currentPlayer').val('computer');
		setTimeout(compMove, 1000);
	}
}

function compMove()
{
	if( $('#currentPlayer').val() == 'computer' )
	{
		if( checkForEnd() ) return false;

		var low,mid;
		if(difficulty == 'easy')
		{
			low = 30;
			mid = 85;
		}
		else if(difficulty == 'medium')
		{
			low = 60;
			mid = 90;
		}
		else
		{
			low = 100;
			mid = 100;
		}

		while(true)
		{
			var choice = getRand(1,100);
			//Choose highest score
			if(choice < low){

				var high = chooseOnHighestScore();

				if( typeof high.attr('id') == 'string' )
				{
					high.addClass('opponent-clicked');
					opponentsound.playclip();
					checkAdjacent( high.attr('id') );
					$('#currentPlayer').val('player');
					high.attr('clicked','true');
					checkForEnd();
					return true;
				}
			}

			//Choose based on last move
			else if(choice < mid)
			{
				//Base on Opponent Last Move
				//Check N
				var north = $('#dot' + lastOMoveCol + (lastOMoveRow-1));
				if( north.attr('clicked') == 'false' )
				{
					lastOMoveRow--;
					north.addClass('opponent-clicked');
					opponentsound.playclip();
					checkAdjacent( north.attr('id') );
					$('#currentPlayer').val('player');
					north.attr('clicked','true');
					checkForEnd();
					return true;
				}
				//Check NE
				var northeast = $('#dot' + (lastOMoveCol*1+1) + (lastOMoveRow-1));
				if( northeast.attr('clicked') == 'false' )
				{
					lastOMoveCol++;
					lastOMoveRow--;
					northeast.addClass('opponent-clicked');
					opponentsound.playclip();
					checkAdjacent( northeast.attr('id') );
					$('#currentPlayer').val('player');
					northeast.attr('clicked','true');
					checkForEnd();
					return true;
				}
				//Check E
				var east = $('#dot' + (lastOMoveCol*1+1) + lastOMoveRow);
				if( east.attr('clicked') == 'false' )
				{
					lastOMoveCol++;
					east.addClass('opponent-clicked');
					opponentsound.playclip();
					checkAdjacent( east.attr('id') );
					$('#currentPlayer').val('player');
					east.attr('clicked','true');
					checkForEnd();
					return true;
				}
				//Check SE
				var southeast = $('#dot' + (lastOMoveCol*1+1) + (lastOMoveRow*1+1));
				if( southeast.attr('clicked') == 'false' )
				{
					lastOMoveCol++;
					lastOMoveRow++;
					southeast.addClass('opponent-clicked');
					opponentsound.playclip();
					checkAdjacent( southeast.attr('id') );
					$('#currentPlayer').val('player');
					southeast.attr('clicked','true');
					checkForEnd();
					return true;
				}
				//Check S
				var south = $('#dot' + lastOMoveCol + (lastOMoveRow*1+1));
				if( south.attr('clicked') == 'false' )
				{
					lastOMoveRow++;
					south.addClass('opponent-clicked');
					opponentsound.playclip();
					checkAdjacent( south.attr('id') );
					$('#currentPlayer').val('player');
					south.attr('clicked','true');
					checkForEnd();
					return true;
				}
				//Check SW
				var southwest = $('#dot' + (lastOMoveCol-1) + (lastOMoveRow*1+1));
				if( southwest.attr('clicked') == 'false' )
				{
					lastOMoveCol--;
					lastOMoveRow++;
					southwest.addClass('opponent-clicked');
					opponentsound.playclip();
					checkAdjacent( southwest.attr('id') );
					$('#currentPlayer').val('player');
					southwest.attr('clicked','true');
					checkForEnd();
					return true;
				}
				//Check W
				var west = $('#dot' + (lastOMoveCol-1) + lastOMoveRow);
				if( west.attr('clicked') == 'false' )
				{
					lastOMoveCol--;
					west.addClass('opponent-clicked');
					opponentsound.playclip();
					checkAdjacent( west.attr('id') );
					$('#currentPlayer').val('player');
					west.attr('clicked','true');
					checkForEnd();
					return true;
				}
				//Check NW
				var northwest = $('#dot' + (lastOMoveCol-1) + (lastOMoveRow-1));
				if( northwest.attr('clicked') == 'false' )
				{
					lastOMoveCol--;
					lastOMoveRow--;
					northwest.addClass('opponent-clicked');
					opponentsound.playclip();
					checkAdjacent( northwest.attr('id') );
					$('#currentPlayer').val('player');
					northwest.attr('clicked','true');
					checkForEnd();
					return true;
				}
			}

			//Choose random
			else
			{
				while(true)
				{
					var row = getRand(1,size);
					var col = getRand(1,size);
					
					var randDot = $('#dot' + col + row);
					if( randDot.attr('clicked') == 'false' )
					{
						lastOMoveCol = col;
						lastOMoveRow = row;
						randDot.addClass('opponent-clicked');
						opponentsound.playclip();
						checkAdjacent( randDot.attr('id') );
						$('#currentPlayer').val('player');
						randDot.attr('clicked','true');
						checkForEnd();
						return true;
					}
				}
			}
		}
	}
}

function getRand(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function checkForEnd()
{
	var pScore = $('#playerScore').val()*1;
	var oScore = $('#opponentScore').val()*1;
	var totalScore = pScore + oScore;
	var possiblePoints = (size-1) * (size-1);
	if( possiblePoints == totalScore )
	{
		if( pScore < oScore )
		{
			$('#endGameModal #modalBody').html('<h1>You Lose!</h1>');
		}
		else if( pScore > oScore )
		{
			$('#endGameModal #modalBody').html('<h1>You Win!</h1>');
		}
		else
		{
			$('#endGameModal #modalBody').html('<h1>You Tied!</h1>');
		}
		$('#endGameModal').modal('show');
		return true;
	}
	return false;
}