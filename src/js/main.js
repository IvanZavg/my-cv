$(function(){

	let $html = $("html"),
		$btnCV = $("#btn_cv"),
		$bar = $("#bar"),
	 	$openBar = $("#open-bar"),
	 	$closeBar = $("#close-bar"),
		$abMe = $("#about_me"),
	 	$mSkill = $("#my_skills"),
	 	$nav =$("#main-menu-container");

	let windowHeight = document.documentElement.clientHeight,
		abMe_offsetTop = $abMe.offset().top,
	 	mSkill_offsetTop = $mSkill.offset().top,
	 	barOffset = parseInt($bar.css("top")) +  $bar.height();

/*---------------- События------------------------------------*/
	
	$(window).on("scroll", startScrolControl());// ОТСЛЕЖИВАНИЕ СКРОЛЛА ДЛЯ ГЕНЕРАЦИИ ПОЛЬЗОВАТЕЛЬСКОГО СОБЫТИЯ
												// ПО НАСТУПЛЕНИИ КОТОРОГО МЕНЯЕТСЯ ЦВЕТ БАРА И ЗАПУСКАЕТСЯ АНИМАЦИЯ
	$btnCV.on("click", function(){
		openModlWindow("#cv");
	});

	$bar.on("click", toggleBarClass);

	$bar.on("barToBlack", function(){
		$bar.toggleClass("bar_black");	
	});

	$bar.on("barToWhite", function(){
		$bar.toggleClass("bar_black");
	});	

	$abMe.on("animateAbMe", animationAbMe);

	$mSkill.on("animateSkills", animationSkills);

	$("#nav-ab-me").on("click",function(){
		scrollTo($abMe);
		toggleBarClass();
	});
	$("#nav-my-skills").on("click",function(){
		scrollTo($mSkill);
		toggleBarClass();
	});
	$("#nav-my-cv").on("click",function(){
		$btnCV.trigger("click");
		toggleBarClass();
	});
	$("#nav-contact-details").on("click",function(){
		openModlWindow("#contact-details");
		toggleBarClass();
	});

/*-------------- Функции -------------------------------------*/
	function startScrolControl(){

		let posToggleBar = abMe_offsetTop - barOffset,
		 	posAbMeAnimate = abMe_offsetTop + $abMe.height()/4,
		 	posSkillsAnimate = mSkill_offsetTop + $mSkill.height()/4;

		let tollBar = false,
		 	abMeAnimated =false,
		 	skillsAnimated =false;

		let timer;

		return function(){

			if(timer)clearInterval(timer);

			timer = setTimeout(function(){

				let htmlScrollTop = $html.scrollTop(),
					htmlBottom = windowHeight + htmlScrollTop;

				/*----------Изменение цвееа кнопки меню-----------------*/

				if(!tollBar && htmlScrollTop >= posToggleBar ){

					tollBar = true;
					$bar.trigger("barToBlack");

				}else if( tollBar && htmlScrollTop <= posToggleBar){

					tollBar = false;
					$bar.trigger("barToWhite");
				}
				/*-------------------------------------------------------*/

				/*-------------запуск анимации секции обо мне------------*/
				if(!abMeAnimated && htmlBottom >= posAbMeAnimate){

					abMeAnimated = true;
					$abMe.trigger("animateAbMe");
				}
				/*-------------------------------------------------------*/

				/*-------------запуск анимации секции мои навыки---------*/
				if(!skillsAnimated && htmlBottom > posSkillsAnimate){

					skillsAnimated = true;
					$mSkill.trigger("animateSkills");
				}
				/*-------------------------------------------------------*/

			}, 100);
		};

	}

	function scrollTo(selector,duration=300){

		let currentSPos = $html.scrollTop(),
			finPosTop = $(selector).offset().top,
			docLength = document.documentElement.scrollHeight,
			finPosBottom = finPosTop + windowHeight;

		if(finPosBottom >= docLength){
			finPosTop -= (finPosBottom - docLength);
		};

		let lengthS = finPosTop - currentSPos, //ростояние скролла
			stepCounts = duration/20,
			stepPx = Math.floor(lengthS/stepCounts), //один шаг в px		
			counter = 0;


		let timer = setInterval(function(){

			if(counter < stepCounts){
				counter++;
				$html.scrollTop(currentSPos += stepPx);
			}else{
				clearInterval(timer);
				$html.scrollTop(finPosTop);
			}

		},20);
		
	}

	function animationAbMe(){

		$("#ab_me_article").removeClass("hidden").addClass("animated bounceInDown");

		setTimeout(function(){

			let $advList = $(".adv_li"),
				duration;

			$("#ab_me_advantages").removeClass("hidden").addClass("animated fadeInUp");

			for(let i = 0; i < $advList.length; i++ ){

				duration = (i == 0)?1000 : duration + 500;

				setTimeout(function(){

					let animateE = (i % 2 == 0)?"fadeInLeft":"fadeInRight";

					$($advList[i]).removeClass("hidden").addClass("animated " + animateE);

				}, duration);
			};

		},1000);
	}

	function animationSkills(){

		let $skillList = $(".skill"),
			duration =  600;

		for(let i = 0; i < $skillList.length; i++ ){

			setTimeout(function(){

				$($skillList[i]).removeClass("hidden").addClass("animated flipInX");

			}, duration*i);
		};
	}

	function openModlWindow(selector){
		let elem = $(selector),
			close = $(selector + " .close");

		toggleModlClass(elem);

		elem.on("click",closeModlWindow);

		function closeModlWindow(e){
			let target = $(e.target);

			if(target[0] == elem[0]||target[0] == close[0]){

				elem.off("click", closeModlWindow);
				toggleModlClass(elem);
			}
		}
	}
	
	
	function toggleModlClass(elem){
		elem.toggleClass("d-show");
		$html.toggleClass("block-scroll");
	}

	function toggleBarClass(){
		$openBar.toggleClass("d-hide");
		$nav.toggleClass("d-hide");
		$closeBar.toggleClass("d-hide");
		$bar.toggleClass("bar_white");
	}

});