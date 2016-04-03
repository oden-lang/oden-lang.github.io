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
    }

    function hideSpinners() {
    }

    function display(result) {
      displayConsoleOutput(result);
    }

    function compileAndRun(code) {
      showSpinners();

      $.ajax({
        type: 'POST',
        url: 'https://oden-playground.herokuapp.com/compile',
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

    $run.on('click', function () {
      compileAndRun($code.text());
    });
  });

}

setupRunnables();
