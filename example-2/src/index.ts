import * as mobilenet from '@tensorflow-models/mobilenet';


const images = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuSDo5OMaLarIs4UpR7uuiq64XpzvwKvOfmFPaEJU87LoWdq0W&s',
  'data:image/jpeg;base64,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',
  'https://media.4rgos.it/i/Argos/8684576_R_Z001A?w=750&h=440&qlt=70',
  'https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG',
  'https://images.immediate.co.uk/production/volatile/sites/4/2018/08/iStock_000044061370_Medium-fa5f8aa.jpg?quality=45&crop=5px,17px,929px,400px&resize=960,413'

];

const image = document.querySelector("#img");
const btn = document.querySelector("#btn");
const list = document.querySelector("#list");

let model;

(async () => {

  model = await mobilenet.load();

})()


btn.addEventListener('click', async () => {


  image.setAttribute('src', images[Math.floor(Math.random() * 5)])


  setTimeout(async _ => {

    let predictions = await model.classify(image);

    list.innerHTML = ""

    predictions.map(p => {
      let li = document.createElement("li");

      li.innerHTML = `${p.className} - <b>${p.probability}</b>`

      list.appendChild(li);
    })

  }, 300)



})