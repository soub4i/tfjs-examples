const nr_epochs = 248; // higher=better but slower
var tfinterface;
const model = tf.sequential();


// 3. WRAPPER AROUND PREDICT
function predict(n) {
    return tfinterface.then(() => {
        return model.predict(tf.tensor2d([n], [1, 1]));
    });
}

// Helper for form
function formpredict(v, r) {

}



window.onload = () => {
    const xs = tf.tensor2d([3, 3, 4, 4, 5]);
    const ys = tf.tensor2d([131000, 125000, 235000, 265000, 535000]);

    // 2. ML MODEL - linear regression model
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
    // Prep for training
    model.compile({ loss: "meanSquaredError", optimizer: "sgd" });

    // train -- the higher the number the more accurate you'll get (but longer run time)
    tfinterface = model.fit(xs, ys, { epochs: nr_epochs });
    document.getElementById("res").innerHTML = "&nbsp;";



    document.querySelector("#iForm").addEventListener("submit", (e) => {
        e.preventDefault()
        const value = document.querySelector("#val").value
        predict(value).then(function (res) {
            document.querySelector("#res").innerHTML = 'Price: ' + res.get([0]).toFixed(2) + ' $';
        });

    })

}

