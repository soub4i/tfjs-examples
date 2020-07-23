import * as tf from "@tensorflow/tfjs";

import "./styles.scss";

const classes = ["معدنوس", "قزبر"];
let model;
(async () => {
  document.querySelector("#desc").textContent = "Loading model";
  document.querySelector("#test-img").setAttribute("disabled", "true");

  model = await tf.loadLayersModel(
    `https://raw.githubusercontent.com/AbderrahimSoubaiElidrissi/9azbor-ma3dnos-classifier-tfjs/master/static/model/model.json`
  );

  document.querySelector("#test-img").removeAttribute("disabled");

  document.querySelector("#desc").textContent = "";
})();

const readURL = input => {
  return new Promise((resolve, reject) => {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = e => {
        document
          .querySelector("#display-img")
          .setAttribute("src", e.target.result);
        document.querySelector("#display-img").setAttribute("width", "150");

        const image = new Image();
        image.src = e.target.result;
        image.crossOrigin = "Anonymous";

        image.onload = () => resolve(image);
        image.onerror = err => reject(err);
        resolve(reader);
      };
      reader.readAsDataURL(input.files[0]);
    }
  });
};

document
  .querySelector("#file-upload-btn")
  .addEventListener("click", () => document.querySelector("#test-img").click());

document
  .querySelector("#test-img")
  .addEventListener("change", async function(event) {
    document.querySelector("#desc").textContent = "";

    const meanImageNetRGB = tf.tensor1d([123.68, 116.779, 103.939]);

    readURL(this)
      .then(async (img: any) => {
        let imgElm = document.querySelector("#display-img");

        const tensor = tf.browser
          .fromPixels(imgElm)
          .resizeNearestNeighbor([150, 150])
          .toFloat()
          .sub(meanImageNetRGB)
          .reverse(2)
          .expandDims();

          const prediction = model.predict(tensor);

        // get the model's prediction results
        console.log(await prediction.data());


        document.querySelector("#desc").textContent =
          classes[
            prediction
              .as1D()
              .argMax()
              .dataSync()[0]
          ];
      })
      .catch(err => console.log(err));
  });
