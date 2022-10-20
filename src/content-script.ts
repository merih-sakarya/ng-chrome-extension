import { TodoEnum } from "@shared/enums/todo.enum";

chrome.runtime.onMessage.addListener((request: any, sender: chrome.runtime.MessageSender, sendResponse: any) => {
  switch (request.todo) {
    case TodoEnum.PING: {
      sendResponse('pong');
      break;
    }
    case TodoEnum.CHANGE_BG_COLOR: {
      document.body.style.backgroundColor = request.data.color;
      sendResponse();
      break;
    }
  }
});
