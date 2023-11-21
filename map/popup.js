/**
 * 
 */
// 팝업 열기
$(document).on("click", "#placeInput", function (){
  $(".place-pop-up").css("visibility", "visible");
});

// 외부영역 클릭 시 팝업 닫기
$(document).mouseup(function (e){
  var LayerPopup = $(".place-pop-up");
  if(LayerPopup.has(e.target).length === 0){
    LayerPopup.css("visibility", "hidden")
  }
});
