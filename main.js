function main() {
    let calc = document.getElementById("calc");
    let radio = document.querySelectorAll("input[type='radio']");
    let n = document.getElementById("n");
    let f1 = document.getElementById("f1");
    let f2 = document.getElementById("f2");
    let f3 = document.getElementById("f3");
    let ctxL = document.getElementById("lineChart").getContext('2d');

    let lls = [];
    let data1 = [];
    let data2 = [];
    let data3 = [];


    function calcDynamic(labels, nBCE, f) {

        let data = [];
        labels.forEach(r => {
            let speedup = 1 / (((1 - f) / Math.sqrt(r)) + (f / nBCE));
            data.push(speedup.toFixed(2));
        });
        console.log(data)
        return data;
    }

    function calcSymmeteric(labels, nBCE, f) {

        let data = [];
        labels.forEach(r => {
            let speedup = 1 / (((1 - f) / Math.sqrt(r)) + (f * r/ Math.sqrt(r)*nBCE));
            data.push(speedup.toFixed(2));
        });
        console.log(data)
        return data;
    }
    function calcAsymmeteric(labels, nBCE, f) {

        let data = [];
        labels.forEach(r => {
            let speedup = 1 / (((1 - f) / Math.sqrt(r)) + (f / (Math.sqrt(r)+nBCE-r)));
            data.push(speedup.toFixed(2));
        });
        console.log(data)
        return data;
    }
    calc.addEventListener("click", function(event) {

        event.preventDefault();
        for (let i = 1; i <= n.value; i *= 2) {
            lls.push(i)
        }
        radio.forEach(r => {
            if (r.checked == true) {
                if (r.value == "symmetric") {
                    data1 = calcSymmeteric(lls, parseFloat(n.value), parseFloat(f1.value));
                    data2 = calcSymmeteric(lls, parseFloat(n.value), parseFloat(f2.value));
                    data3 = calcSymmeteric(lls, parseFloat(n.value), parseFloat(f3.value));
                } else if (r.value == "asymmetric") {
                    data1 = calcAsymmeteric(lls, parseFloat(n.value), parseFloat(f1.value));
                    data2 = calcAsymmeteric(lls, parseFloat(n.value), parseFloat(f2.value));
                    data3 = calcAsymmeteric(lls, parseFloat(n.value), parseFloat(f3.value));

                } else if (r.value == "dynamic") {
                    data1 = calcDynamic(lls, parseFloat(n.value), parseFloat(f1.value));
                    data2 = calcDynamic(lls, parseFloat(n.value), parseFloat(f2.value));
                    data3 = calcDynamic(lls, parseFloat(n.value), parseFloat(f3.value));
                }
            }
        });
        var myLineChart = new Chart(ctxL, {
            type: 'line',
            data: {
                labels: lls,
                datasets: [{
                        label: "F0",
                        data: data1,
                        backgroundColor: [
                            'rgba(246,110,110, .2)',
                        ],
                        borderColor: [
                            'rgba(246,110,110, .7)',
                        ],
                        borderWidth: 2
                    },
                    {
                        label: "F2",
                        data: data2,
                        backgroundColor: [
                            'rgba(245,246,110, .2)',
                        ],
                        borderColor: [
                            'rgba(245,246,110, .7)',
                        ],
                        borderWidth: 2
                    },
                    {
                        label: "F3",
                        data: data3,
                        backgroundColor: [
                            'rgba(156,110,246, .2)',
                        ],
                        borderColor: [
                            'rgba(156,110,246, .7)',
                        ],
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true
            }
        });
        
    },false)

}
