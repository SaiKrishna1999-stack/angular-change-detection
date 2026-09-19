import { ChangeDetectionStrategy, Component, input, inject, OnInit, ChangeDetectorRef, DestroyRef } from '@angular/core';
import { MessagesService } from '../messages.service';
@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListComponent implements OnInit {
  messagesService = inject(MessagesService);
  messages: string[] = [];
  cdRef = inject(ChangeDetectorRef);
  destroyRef = inject(DestroyRef);

  ngOnInit() {
    const subscription = this.messagesService.messages$.subscribe((messages) => {
      this.messages = messages;
      this.cdRef.markForCheck();
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
