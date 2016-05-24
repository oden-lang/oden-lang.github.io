function setupRunnables() {
  $('.playground-runnable').each(function () {
    var $runnable = $(this);
    var $code = $runnable.find('.highlight code');
    var $output = $('<pre class="output hidden"><code></code></pre>').appendTo($runnable);
    var $run = $('<button class="run">Run</button>').appendTo($runnable);

    function displayError(result) {
      $output
        .removeClass('hidden')
        .addClass('error')
        .text(result.error);
    }

    function displayEvent(event) {
      $output.append($('<div>').text(event.Message));
    }

    function displayConsoleOutput(result) {
      if (result.consoleOutput.Errors) {
        $output
          .addClass('error')
          .removeClass('hidden')
          .text(result.consoleOutput.Errors);
      } else if (result.consoleOutput.Events) {
        $output
          .removeClass('error')
          .removeClass('hidden')
          .empty();
        result.consoleOutput.Events.forEach(displayEvent);
      } else {
        $output
          .removeClass('error')
          .removeClass('hidden')
          .empty();
      }
    }

    function showSpinners() {
      $output
        .empty()
        .removeClass('hidden')
        .append('<div class="loader"><span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></div>');
    }

    function hideSpinners() {
      $output.find('.loader').remove();
    }

    function display(result) {
      displayConsoleOutput(result);
    }

    function compileAndRun(code) {
      showSpinners();

      $.ajax({
        type: 'POST',
        url: 'https://playground.oden-lang.org/compile',
        data: JSON.stringify({ odenSource: code }),
        dataType: 'json'
      }).done(function (result) {
        if (result.error) {
          displayError(result);
        } else {
          display(result);
        }
      }).fail(function (e) {
        console.error('Failed to run code:', e);
        displayError({
          error: 'An unexpected error occured.'
        });
      }).always(function () {
        hideSpinners();
      });
    }

    function isScrolledIntoView($elem)
    {
        var $window = $(window);

        var docViewTop = $window.scrollTop();
        var docViewBottom = docViewTop + $window.height();

        var elemTop = $elem.offset().top;
        var elemBottom = elemTop + $elem.height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }

    $run.on('click', function () {
      compileAndRun($code.text());
      if (!isScrolledIntoView($code)) {
        $('html, body').animate({
          scrollTop: $code.offset().top + ($code.height() / 2) - ($(window).height() / 2)
        }, 200);
      }
    });
  });

}

setupRunnables();
