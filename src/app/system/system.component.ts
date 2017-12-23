import { Component, HostBinding } from '@angular/core';
import { fadeTrigger } from '../shared/animations/fade.animations';

@Component({
	selector: 'wfm-system',
	templateUrl: './system.component.html',
	styleUrls: ['system.component.scss'],
	animations: [fadeTrigger]
})
export class SystemComponent {
	@HostBinding('@fade') a = true;
}