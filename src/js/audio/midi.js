import showToast from '../utils/utils'

var MIDI_TRANSPOSE = -12;



export default function InitMIDI(synth, noteEventUIUpdater) {

  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(function(midi) {
      function midimessagehandler(evt) {
        if (!evt.target.enabled)
          return;
        var channel = evt.data[0] & 0xf;
        var cmd = evt.data[0] >> 4;
        var note_number = evt.data[1] + MIDI_TRANSPOSE;
        var vel = evt.data[2];

        if (cmd == 8 || (cmd == 9 && vel == 0)) {
          synth.release(note_number);
        } else if (cmd == 9) {
          synth.press(note_number, vel / 100);
          noteEventUIUpdater(note_number, vel/100);

         } 

      }

      function plug() {
        if (midi.inputs.size > 0) {
          var inputs = midi.inputs.values();
          for (var input_it = inputs.next(); input_it && !input_it.done; input_it = inputs.next()) {
            var input = input_it.value;
            input.onmidimessage = midimessagehandler;
            if (input.enabled !== false) {
              input.enabled = true;
            }

          }
        }
        if (midi.outputs.size > 0) {
          var outputs = midi.outputs.values();
          for (var output_it = outputs.next(); output_it && !output_it.done; output_it = outputs.next()) {
            var output = output_it.value;
            //output.enabled = false; // edit: don't touch
            }
          var gMidiOutTest = function(note_name, vel, delay_ms) {
            var note_number = MIDI_KEY_NAMES.indexOf(note_name);
            if (note_number == -1)
              return;
            note_number = note_number + 9 - MIDI_TRANSPOSE;

            var outputs = midi.outputs.values();
            for (var output_it = outputs.next(); output_it && !output_it.done; output_it = outputs.next()) {
              var output = output_it.value;
              if (output.enabled) {
                output.send([
                  0x90, note_number, vel
                ], window.performance.now() + delay_ms);
              }
            }
          }
        }
        showConnections(false);
      }

      midi.addEventListener("statechange", function(evt) {
        if (evt instanceof MIDIConnectionEvent) {
          plug();
        }
      });

      plug();

      var connectionsNotification;

      function showConnections(sticky) {
        var inputs_ul = document.createElement("ul");
        if (midi.inputs.size > 0) {
          var inputs = midi.inputs.values();
          for (var input_it = inputs.next(); input_it && !input_it.done; input_it = inputs.next()) {
            var input = input_it.value;
            var li = document.createElement("li");
            li.connectionId = input.id;
            li.classList.add("connection");
            if (input.enabled)
              li.classList.add("enabled");
            li.textContent = input.name;
            li.addEventListener("click", function(evt) {
              var inputs = midi.inputs.values();
              for (var input_it = inputs.next(); input_it && !input_it.done; input_it = inputs.next()) {
                var input = input_it.value;
                if (input.id === evt.target.connectionId) {
                  input.enabled = !input.enabled;
                  evt.target.classList.toggle("enabled");
                  return;
                }
              }
            });
            inputs_ul.appendChild(li);
          }
        } else {
          inputs_ul.textContent = "(none)";
        }
        var outputs_ul = document.createElement("ul");
        if (midi.outputs.size > 0) {
          var outputs = midi.outputs.values();
          for (var output_it = outputs.next(); output_it && !output_it.done; output_it = outputs.next()) {
            var output = output_it.value;
            var li = document.createElement("li");
            li.connectionId = output.id;
            if (output.enabled)
              li.classList.add("enabled");
            li.textContent = output.name;
            li.addEventListener("click", function(evt) {
              var outputs = midi.outputs.values();
              for (var output_it = outputs.next(); output_it && !output_it.done; output_it = outputs.next()) {
                var output = output_it.value;
                if (output.id === evt.target.connectionId) {
                  output.enabled = !output.enabled;
                  evt.target.classList.toggle("enabled");
                  return;
                }
              }
            });
            outputs_ul.appendChild(li);
          }
        } else {
          outputs_ul.textContent = "(none)";
        }
        var div = document.createElement("div");
        var h3 = document.createElement("h3");
        h3.textContent = "Inputs";
        div.appendChild(h3);
        div.appendChild(inputs_ul);
        h3 = document.createElement("h3");
        h3.textContent = "Outputs";
        div.appendChild(h3);
        div.appendChild(outputs_ul);
        var connectionsNotification = showToast({
          "id": "MIDI-Connections",
          "title": "MIDI Connections",
          "duration": sticky
            ? "-1"
            : "4500",
          "content": div,
          "target": "midi-btn"
        });
      }

      document.getElementById("midi-btn").addEventListener("click", function(evt) {
        if (!document.getElementById("Notification-MIDI-Connections")) {
          showConnections(true);
        } else {
          connectionsNotification.close();
        }
      });
    return midi;
  }, function(err) {
      console.log(err);
    }
  );
  }
  else {
	  alert('MIDI device not supported in your browser. We recommned Chrome ');
	  }
}
