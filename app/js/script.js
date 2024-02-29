var socket = null;
try {
  socket = new WebSocket("ws://localhost:6441");
  socket.onopen = function () {
    var curr = document.getElementsByClassName("status");
    for (var i = 0; i < curr.length; i++) {
      curr[i].classList.add("is-success");
      curr[i].innerHTML = "UP & RUNNING";
    }
    // document.getElementById('run_server').style.display = 'none';
    return;
  };
  socket.onmessage = function (msg) {
    var msg_ele = document.getElementById("message");
    msg_ele.style.display = "block";
    document.getElementById("notification").className += " is-info";
    document.getElementById("notification").innerHTML = msg.data;
    setTimeout(function () {
      msg_ele.style.display = "none";
      document.getElementById("notification").innerHTML = "";
    }, 5000);
    return;
  };
  socket.onclose = function () {
    var curr = document.getElementsByClassName("status");
    for (var i = 0; i < curr.length; i++) {
      curr[i].classList.add("is-danger");
      curr[i].innerHTML = "NOT CONNECTED";
    }
    return;
  };
} catch (e) {
  console.log(e);
}
checkStatus = function () {
  if (socket.readyState == 1) {
    socket.send(
      JSON.stringify({
        type: "check-status",
      })
    );
    return false;
  } else {
    var curr = document.getElementsByClassName("status");
    for (var i = 0; i < curr.length; i++) {
      curr[i].className += " is-loading";
    }
    setTimeout(function () {
      location.reload();
    }, 500);
    return false;
  }
};

document.addEventListener("DOMContentLoaded", function () {
  if ((testp = document.querySelectorAll(".test-print"))) {
    for (var i = 0; i < testp.length; i++) {
      testp[i].addEventListener("click", function (e) {
        e.preventDefault();
        var print_id = this.getAttribute("data-printer-id");
        printTest(print_id);
      });
    }
  }

  if ((type_ele = document.getElementById("type"))) {
    if (type_ele) {
      var type = type_ele.options[type_ele.selectedIndex].value;
      if (type == "network") {
        document.querySelector(".network").style.display = "block";
        document.querySelector(".path").style.display = "none";
      } else {
        document.querySelector(".network").style.display = "none";
        document.querySelector(".path").style.display = "block";
      }
    }

    type_ele.onchange = function () {
      var type = this.options[this.selectedIndex].value;
      if (type == "network") {
        document.querySelector(".network").style.display = "block";
        document.querySelector(".path").style.display = "none";
      } else {
        document.querySelector(".network").style.display = "none";
        document.querySelector(".path").style.display = "block";
      }
    };
  }
});

function testData() {
  receipt = {};
  receipt.store_name = "IMPRESSORA TESTES\n";

  receipt.header = "";
  receipt.header += "Teste de impressao\n";
  receipt.header += "Rua do Teste, 123\n";
  receipt.header += "Cidade do Teste\n";
  receipt.header += "Tel: 123456789\n";
  receipt.header += "\n\n";
  
  receipt.info = "";
  receipt.info += "Data: " + new Date().toLocaleString() + "\n";
  receipt.info += "Cupom Fiscal: 000000\n";
  receipt.info += "Operador: Teste\n";
  receipt.info += "--------------------------------\n";

  receipt.items = "";
  receipt.items += "#1 FFR06 - Melancia                    *Z" + "\n";
  receipt.items += "   2,500 kg x R$ 2,50             R$ 6,25" + "\n";
  receipt.items += "#2 FFR06 - Melão                       *Z" + "\n";
  receipt.items += "   2,000 kg x R$ 2,00             R$ 4,00" + "\n";

  return receipt;
}

function printTest(printer_id) {
  if (socket.readyState == 1) {
    for (var i = 0; i < printers.length; i++) {
      if (printers[i].id == printer_id) {
        printer = printers[i];
      }
    }
    var receipt_data = testData();
    var socket_data = {
      printer: printer,
      text: receipt_data,
    };
    socket.send(
      JSON.stringify({
        type: "print-receipt",
        data: socket_data,
      })
    );
    return false;
  } else {
    alert("Unable to connect to socket, please make sure that server is up and running fine.");
    return false;
  }
}
