;(function($){
	$.fn.placeholder = function(){
		function valueIsPlaceholder(input){
			return ($(input).value() == $(input).attr("placeholder"));
		}
		return this.each(function(){
			$(this).find(":input").each(function(){
				//@功能：解决密码类型输入框文字提示问题
				//@原理：动态生成text类型输入框，通过轮换实现文字提示
				if($(this).attr("type") == "password"){
					var new_field = $("<input type='text'>");
					new_field.attr("rel",$(this).attr("id"));
					new_field.attr("value",$(this).attr("placeholder"));
					$(this).parent().append(new_field);
					new_field.hide();

					function showPasswordPlaceHolder(input){
						if($(input).val()=="" || valueIsPlaceholder(input)){
							$(input).hide();
							$('input[rel=' + $(input).attr("id") + ']').show();
						};
					};

					new_field.focus(function(){  
						$(this).hide();
						$('input#' + $(this).attr("rel")).show().focus();
					});
					$(this).blur(function(){
						showPasswordPlaceHolder(this,false);
					});
					showPasswordPlaceHolder(this);
				}
				//@功能：解决text类型输入框文字提示问题
				else{
					function showPlaceholder(input,reload){
						if($(input).val()=="" || (reload && valueIsPlaceholder(input))){
							$(input).val($(input).attr("placeholder"));
						}
					};
					$(this).focus(function(){
						if($(this).val()==$(this).attr("placeholder")){
							$(this).val("");
						};
					});
					$(this).blur(function(){
						showPlaceholder($(this),false);
					});
					showPlaceholder(this,true);
				};
			});

			//禁止表单默认提交
			$(this).submit(function(){
				$(this).find(":input").each(function(){
					if($(this).val()==$(this).attr("placeholder")){
						$(this).val("");
					}
				});
			});
		});
	};
})(jQuery);