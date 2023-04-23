import { NativeDateAdapter } from '@angular/material/core';

export class CustomeDateAdapter extends NativeDateAdapter {
  override getFirstDayOfWeek(): number {
    return 0;
  }

  override getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    return ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'So', 'Sa'];
  }
}
