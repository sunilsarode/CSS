import data from "./comment.json" assert { type: "json" };

let mainData = data;

let post = document.getElementById("post");
let lastId;
let idArr = [];
let keyToStoreData = "myjson";

function addNewComment(obj, newComment, id) {
  for (var key in obj) {
    var values = obj[key];
    if (Array.isArray(values)) {
      values.forEach((val) => {
        addNewComment(val, newComment, id);
      });
    } else if (key === "id" && obj[key] === id) {
      idArr = idArr.sort((a, b) => a - b);
      let nextId = Number(idArr[idArr.length - 1]) + 1;
      console.log(idArr, nextId, id);
      obj["comment"].push({
        id: "" + nextId,
        text: newComment,
        comment: [],
      });
      break;
    }
  }
}

function createThread(obj, margin) {
  for (var key in obj) {
    var values = obj[key];
    if (Array.isArray(values)) {
      values.forEach((val) => {
        createThread(val, margin + 30);
      });
    } else {
      if (key === "text") {
        const div = document.createElement("div");
        const replyButton = document.createElement("p");
        replyButton.innerHTML = "Add a reply";

        replyButton.style.marginLeft = margin + "px";
        replyButton.setAttribute("class", "replyButton");
        replyButton.val = lastId;

        replyButton.addEventListener("click", () => {
          let element = document.getElementById(replyButton.val);
          element.style.display = "";
          replyButton.style.display = "none";
        });

        div.innerHTML = values;
        //div.style.color='white';
        div.style.marginLeft = margin + "px";
        post.appendChild(div);

        //inputDiv
        const inputDiv = document.createElement("div");
        inputDiv.setAttribute("class", "newCommentDiv");

        //input
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("class", "newComment");
        //input.id=lastId;

        //button
        const button = document.createElement("button");
        button.innerHTML = "Submit";
        button.setAttribute("class", "submitComment");

        button.addEventListener("click", () => {
          let newCommentVal = document
            .getElementById(replyButton.val)
            .getElementsByTagName("input")[0].value;
          console.log(newCommentVal);
          if (newCommentVal && newCommentVal !== "") {
            addNewComment(mainData, newCommentVal, replyButton.val);
            //console.log('testing',mainData);
            localStorage.setItem(keyToStoreData, JSON.stringify(mainData));
            location.reload();
          }
        });

        const inputAndButtonDiv = document.createElement("div");
        inputAndButtonDiv.setAttribute("class", "inputAndButtonDiv");
        inputAndButtonDiv.style.display = "none";
        inputAndButtonDiv.appendChild(input);
        inputAndButtonDiv.appendChild(button);
        inputAndButtonDiv.id = lastId;

        inputDiv.appendChild(replyButton);
        inputDiv.appendChild(inputAndButtonDiv);
        post.appendChild(inputDiv);
      } else {
        lastId = obj[key];
        idArr.push(+lastId);
      }
    }
  }
}

let localStorageData = localStorage.getItem(keyToStoreData);
//console.log(localStorageData);
if (localStorageData) {
  mainData = JSON.parse(localStorageData);
  createThread(mainData, 0);
} else {
  createThread(mainData, 0);
}
