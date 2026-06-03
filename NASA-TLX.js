// Create a set of parallel arrays for each of the scales
var scale      = new Array();
var left       = new Array();
var right      = new Array();
var def        = new Array();
var NUM_SCALES = 6;

scale[0] =
"精神的要求 / Mental Demand / 心理负荷";
left[0] =
"低い / Low / 低";
right[0] =
"高い / High / 高";
def[0] =
`<p>
点群シーン内の物体を識別し、
適切にラベル付けするために、
どの程度の精神的・知覚的努力が必要でしたか。<br><br>

How much mental and perceptual activity was required
to identify and annotate objects in the point cloud scene?<br><br>

在点云场景中识别并标注目标物体时，
您感受到多大的心理和认知负担？
</p>`;

scale[1] =
"身体的要求 / Physical Demand / 身体负荷";

left[1] =
"低い / Low / 低";

right[1] =
"高い / High / 高";

def[1] =
`<p>
コントローラ操作や視点調整など、
どの程度の身体的活動が必要でしたか。<br><br>

How much physical activity was required,
including controller operation and viewpoint adjustment?<br><br>

包括控制器操作和视角调整在内，
您感受到多大的身体负担？
</p>`;

scale[2] =
"時間的要求 / Temporal Demand / 时间压力";

left[2] =
"低い / Low / 低";

right[2] =
"高い / High / 高";

def[2] =
`<p>
制限時間内でアノテーションを行う際、
どの程度時間的プレッシャーを感じましたか。<br><br>

How much time pressure did you feel
while completing the annotation task?<br><br>

在完成标注任务时，
您感受到多大的时间压力？
</p>`;

scale[3] =
"作業達成度 / Performance / 任务完成度";

left[3] =
"良い / Good / 好";

right[3] =
"悪い / Poor / 差";

def[3] =
`<p>
自分のアノテーション結果に
どの程度満足していますか。<br><br>

How successful do you think you were
in accomplishing the annotation task?<br><br>

您认为自己的标注结果完成得如何？
</p>`;

scale[4] =
"努力 / Effort / 努力程度";

left[4] =
"少ない / Low / 低";

right[4] =
"多い / High / 高";

def[4] =
`<p>
アノテーション作業を達成するために、
どの程度努力しましたか。<br><br>

How hard did you have to work
to accomplish the annotation task?<br><br>

为了完成标注任务，
您付出了多大的努力？
</p>`;

scale[5] =
"不満 / Frustration / 挫折感";

left[5] =
"低い / Low / 低";

right[5] =
"高い / High / 高";

def[5] =
`<p>
作業中にどの程度ストレス、
苛立ち、不安を感じましたか。<br><br>

How insecure, discouraged,
irritated, stressed, or annoyed were you?<br><br>

在任务过程中，
您感受到多大的压力、
挫败感或烦躁感？
</p>`;

window.addEventListener('load', OnLoad);
function OnLoad() {}

// Pairs of factors in order in the original instructions, numbers
// refer to the index in the scale, left, right, def arrays.
let pair = new Array();
pair[0]   = "4 3";
pair[1]   = "2 5";
pair[2]   = "2 4";
pair[3]   = "1 5";
pair[4]   = "3 5";
pair[5]   = "1 2";
pair[6]   = "1 3";
pair[7]   = "2 0";
pair[8]   = "5 4";
pair[9]   = "3 0";
pair[10]  = "3 2";
pair[11]  = "0 4";
pair[12]  = "0 1";
pair[13]  = "4 1";
pair[14]  = "5 0";

// Variable where the results end up
let results_rating = new Array();
let results_tally  = new Array();
for (let i = 0; i < NUM_SCALES; i++) results_tally[i] = 0;
let results_weight = new Array();
let results_overall;
let pair_num = 0;



function clicked1() {
	//alert("次に15の質問をします。それぞれで、どちらがより作業負荷に直結した要因か選んでください。");
	results_rating[0] = Math.floor(document.getElementById("mental").value / 5) * 5;
	results_rating[1] = Math.floor(document.getElementById("physical").value / 5) * 5;
	results_rating[2] = Math.floor(document.getElementById("temporal").value / 5) * 5;
	results_rating[3] = Math.floor(document.getElementById("performance").value / 5) * 5;
	results_rating[4] = Math.floor(document.getElementById("effort").value / 5) * 5;
	results_rating[5] = Math.floor(document.getElementById("frustration").value / 5) * 5;
	// let str = `<h3>${results_rating.join(", ")}</h3>`;
	// let element = document.getElementById("div2");
	// element.insertAdjacentHTML("afterbegin", str);

	document.getElementById("div1").style.display = "none";
	document.getElementById("div2").style.display = "";
	setPairLabels();
}

function setPairLabels(){
	var indexes = new Array();
	indexes = pair[pair_num].split(" ");

	var pair1 = scale[indexes[0]];
	var pair2 = scale[indexes[1]];

	document.getElementById('pair1').value = pair1;
	document.getElementById('pair2').value = pair2;

	document.getElementById('pair1_def').innerHTML = def[indexes[0]];
	document.getElementById('pair2_def').innerHTML = def[indexes[1]];
}

// They clicked the top pair button
function buttonPair1()
{
	var indexes = new Array();
	indexes = pair[pair_num].split(" ");
	results_tally[indexes[0]]++;

	nextPair();
	return true;
}

function buttonPair2()
{
	var indexes = new Array();
	indexes = pair[pair_num].split(" ");
	results_tally[indexes[1]]++;	
	nextPair();
	return true;
}

// Move to the next pair
function nextPair()
{
	pair_num++;
	if (pair_num >= 15)
	{
		document.getElementById('div2').style.display = 'none';
		document.getElementById('div3').style.display = '';
		calcResults();
        console.log(getResultsHTML())
        const scoredata = getResultsHTML();
		document.getElementById('score').value=scoredata;
        //const scorearea = document.getElementById('score');
        const button = document.getElementById('copybutton');

        button.addEventListener('click', () => {
          if (!navigator.clipboard) {
            alert("このブラウザは対応していません");
            return;
          }

          navigator.clipboard.writeText(scoredata).then(
            () => {
              alert('文章をコピーしました。');
            },
            () => {
              alert('コピーに失敗しました。');
            });
        });
	}
	else
	{
		setPairLabels();
	}
}

// Compute the weights and the final score
function calcResults()
{
	results_overall = 0.0;

	for (var i = 0; i < NUM_SCALES; i++)
	{
		results_weight[i] = results_tally[i] / 15.0;
		results_overall += results_weight[i] * results_rating[i];
	}
}

// Output the table of results
function getResultsHTML()
{
	var result = "";
	for (var i = 0; i < NUM_SCALES; i++)
	{
		result += "\n";
		result += scale[i];
		result += ",";


		result += results_rating[i];
		result += ",";

		result += results_tally[i];
		result += ",";

		result += "";
		result += results_weight[i];
		result += ",";
	}

	result += "\n";
	result += "総合スコア,";
	result += results_overall;
	result += ",";

	return result;
}
