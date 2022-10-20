import { Component } from '@angular/core';
import { TodoEnum } from '@shared/enums/todo.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  color = '#FFFFFF';

  ngOnInit() {
    // Fetch the last selected color from storage.
    chrome.storage.sync.get('color', ({ color }) => {
      if (color) {
        this.color = color;
      }
    });
  }

  // Send a message to the Content script to change the background color.
  onColorChange(color: any) {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs: chrome.tabs.Tab[]) => {
      chrome.tabs.sendMessage(tabs[0].id!, { todo: TodoEnum.CHANGE_BG_COLOR, data: { color: color } }, () => {
        if (chrome.runtime.lastError) {
          console.log('Error: ', chrome.runtime.lastError.message);
          return;
        }
      });
    });
  }

  // Save the last selected color to the storage.
  onSliderDragEnd(event: { slider: string, color: string }) {
    chrome.storage.sync.set({ color: event.color });
  }
}
