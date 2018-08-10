import { ReactWrapperComponent, InputRendererOptions } from '@angular-react/core';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { IMessageBarProps } from 'office-ui-fabric-react/lib/MessageBar';
import { BaseButton, Button } from 'office-ui-fabric-react/lib/Button';

@Component({
  selector: 'fab-message-bar',
  exportAs: 'fabMessageBar',
  template: `
    <MessageBar
      #reactNode
      [componentRef]="componentRef"
      [messageBarType]="messageBarType"
      [ariaLabel]="ariaLabel"
      [isMultiline]="isMultiline"
      [dismissButtonAriaLabel]="dismissButtonAriaLabel"
      [truncated]="truncated"
      [overflowButtonAriaLabel]="overflowButtonAriaLabel"
      [className]="className"
      [theme]="theme"
      [styles]="styles"
      [Dismiss]="onDismissInternal"
      [actions]="actions">
      <ReactContent><ng-content></ng-content></ReactContent>
    </MessageBar>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabMessageBarComponent extends ReactWrapperComponent<IMessageBarProps> implements OnInit {
  @ViewChild('reactNode')
  protected reactNodeRef: ElementRef;

  @Input()
  componentRef?: IMessageBarProps['componentRef'];
  @Input()
  messageBarType?: IMessageBarProps['messageBarType'];
  @Input()
  ariaLabel?: IMessageBarProps['ariaLabel'];
  @Input()
  isMultiline?: IMessageBarProps['isMultiline'];
  @Input()
  dismissButtonAriaLabel?: IMessageBarProps['dismissButtonAriaLabel'];
  @Input()
  truncated?: IMessageBarProps['truncated'];
  @Input()
  overflowButtonAriaLabel?: IMessageBarProps['overflowButtonAriaLabel'];
  @Input()
  className?: IMessageBarProps['className'];
  @Input()
  theme?: IMessageBarProps['theme'];
  @Input()
  styles?: IMessageBarProps['styles'];

  @Input()
  renderActions?: InputRendererOptions<{}>;

  // Non-React prop, used together with onDismiss to allow it to be an Output EventEmitter.
  @Input()
  dismissable?: boolean = null;

  @Output()
  readonly onDismiss = new EventEmitter<MouseEvent>();

  actions: JSX.Element;

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef) {
    super(elementRef, changeDetectorRef);
  }

  ngOnInit() {
    const onRenderActions = this.createRenderPropHandler(this.renderActions);
    this.actions = onRenderActions();
  }

  get onDismissInternal(): null | IMessageBarProps['onDismiss'] {
    if (!this.dismissable) {
      return null;
    }

    return ev => {
      this.onDismiss.emit(ev && ev.nativeEvent);
    };
  }
}