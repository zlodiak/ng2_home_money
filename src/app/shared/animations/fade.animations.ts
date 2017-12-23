import { trigger, style, transition, animate } from '@angular/animations'

export const fadeTrigger = trigger('fade', [
	transition(':enter', [
		style({
			opacity: 0
		}),
		animate(500)
	]),
	transition(':leave', animate(500, style({
		opacity: 0
	})))
]);