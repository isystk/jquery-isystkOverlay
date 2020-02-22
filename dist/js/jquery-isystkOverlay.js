
(function($) {
  /*
   * オーバーレイ表示
	 */
	$.fn.isystkOverlay = function(opts) {

		// 引数に値が存在する場合、デフォルト値を上書きする
		var settings = $.extend({}, $.fn.isystkOverlay.defaults, opts);
		
		// パネルの表示位置を調整します。
		var adjustPanelPosition = function (){
			var h = $(window).height();
			var w = $(window).width();
			var ph = $('#sample').height();
			var pw = $('#sample').width();
			var scrollTop = $(window).scrollTop();
			var scrollLeft = $(window).scrollLeft();
			$('#sample').css('top', scrollTop + Math.floor((h - ph)/2) + 'px');
			$('#sample').css('left', scrollLeft + Math.floor((w - pw)/2) + 'px');
		}
		$(window).resize(function() {
			adjustPanelPosition();
		});
	
		var init = function(panel) {

			panel.find('.js-close').click(function(e) {
				e.preventDefault();
				closeDialog();
			});

			// ダイアログ非表示
			var showDialog = this.showDialog = function() {
				if ($('#overlay-background').length === 0) {
					$('body').append('<div id="overlay-background"></div>');
					$('#overlay-background').click(function() {
						closeDialog();
					});
				}
	
				panel.addClass('open');
				$('#overlay-background').fadeIn();
				
				if (settings.openCallback) {
					settings.openCallback();
				}
			}
			
			// ダイアログ非表示
			var closeDialog = function() {
				loading = false;
				panel.removeClass('open');
				$('#overlay-background').fadeOut();
				if (settings.closeCallback) {
					settings.closeCallback();
				}
			}

			// 表示位置の調整
			adjustPanelPosition();

			return this;
		}

		$(this).each(function() {
			// ボタン押下時にパネル表示
			$(this).click(function(e) {
				e.preventDefault();
				var self = $(this),
					panel = $(self.data('panel'));
				var obj = new init(panel);
				obj.showDialog();
			});
		});

		return this;
	}

	$.fn.isystkOverlay.defaults = {
		closeCallback: null, // 画面を閉じた際のコールバック
		openCallback: null // 画面を開いた際のコールバック
	};

})(jQuery);


