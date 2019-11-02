
const hasNewMessage = () => {
  // TODO: return true with a probability of 20%.
  return Math.random() < 0.2;
}

const getRandomIndex = (list) => {
  return Math.floor(Math.random()*list.length);
}

const newMessage = (callback) => {
  // TODO: return a random message as an object with two keys, subject and sender
  return fetch("https://fml.shanghaiwogeng.com/api/v1/stories")
  .then(response => response.json())
  .then((data) => {
  // .then(response => response.json())
  // .then((data) => {
  //   // Add your code to get `name` and `text` values from data and put into the `sender` and `subject` message object.
    let randomIndex = getRandomIndex(data);
    let newMail = data[randomIndex];
    //console.log(data[randomIndex].name);
    //console.log(data[randomIndex].text);
    callback(newMail);

  });

  //  let newEmail = {
  //     'sender': data[randomIndex].name,
  //     'subject': data[randomIndex].text
  //   };
  //   return newEmail; //give message object to next function
  //});

};

const appendMessageToDom = (message) => {
  // TODO: append the given message to the DOM (as a new row of `#inbox`)
  const newMessageLocation = document.getElementById("inbox");
  newMessageLocation.insertAdjacentHTML('afterbegin',
  `<div class="row message unread">
    <div class="col-3">${message.name}</div>
    <div class="col-9">${message.text}</div>
  </div>`);

  let count = document.getElementsByClassName("unread").length;
  //console.log(count);
  const countLocation = document.getElementById("count");
  countLocation.innerText = `(${count})`;
};

const refresh = () => {
  // TODO: Implement the global refresh logic. If there is a new message,
  //       append it to the DOM. Update the unread counter in title as well.
  if (hasNewMessage()) {
    //appendMessageToDom(newMessage());
    newMessage(appendMessageToDom);
    //alert("You have a new message.");
  }
};

// Do not remove these lines:
document.addEventListener("DOMContentLoaded", () => {
  //console.log("init refresh")
  setInterval(refresh, 1000); // Every 1 second, the `refresh` function is called.
});
